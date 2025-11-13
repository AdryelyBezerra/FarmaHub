import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Pedido } from "../entities/pedido";
import { PedidoItem } from "../entities/pedidoItem";
import { Produto } from "../entities/produto";
import { MetodoPagamento } from "../entities/pedido";
import { Carrinho } from "../entities/carrinho";

export const criarPedido = async (req: Request, res: Response) => {
  try {
    const { endereco, metodo_pag } = req.body;
    let itens: { produto_id: number; quantidade: number }[] = req.body.itens;
    const user_id = (req.user as any)?.id;

    if (!user_id) {
      return res.status(401).json({ erro: "Usuário não autenticado" });
    }

    if (!endereco || !metodo_pag) {
      return res.status(400).json({ erro: "Endereco e metodo_pag são obrigatórios" });
    }

    if (!Object.values(MetodoPagamento).includes(metodo_pag)) {
      return res.status(400).json({ erro: "Método de pagamento inválido" });
    }

    await AppDataSource.manager.transaction(async (manager) => {
      const produtoRepo = manager.getRepository(Produto);
      const carrinhoRepo = manager.getRepository(Carrinho);
      const pedidoRepo = manager.getRepository(Pedido);
      const pedidoItemRepo = manager.getRepository(PedidoItem);

      // Se não vier itens no body, pegar do carrinho do usuário
      if (!itens || !Array.isArray(itens) || itens.length === 0) {
        const carrinho = await carrinhoRepo.find({
          where: { user_id },
        });

        if (!carrinho || carrinho.length === 0) {
          throw { status: 400, message: "Carrinho vazio. Adicione produtos ou informe itens no body." };
        }

        itens = carrinho.map((c) => ({
          produto_id: c.produto_id,
          quantidade: (c as any).qnt_car ?? 1,
        }));
      }

      // Validar itens e calcular total
      let total = 0;
      const itensCriados: PedidoItem[] = [];

      for (const item of itens) {
        if (!item.produto_id || !item.quantidade || item.quantidade <= 0) {
          throw { status: 400, message: "Itens inválidos no pedido" };
        }

        const produto = await produtoRepo.findOne({
          where: { id: item.produto_id },
        });

        if (!produto) {
          throw { status: 404, message: `Produto ID ${item.produto_id} não encontrado` };
        }

        if (produto.quantidade < item.quantidade) {
          throw { status: 400, message: `Estoque insuficiente para produto ID ${item.produto_id}` };
        }

        const precoUnit = Number(produto.preco);
        const subtotal = precoUnit * item.quantidade;
        total += subtotal;

        const pedidoItem = pedidoItemRepo.create({
          produto_id: produto.id,
          quantidade: item.quantidade,
          preco_unit: precoUnit,
        });

        itensCriados.push(pedidoItem);
      }

      // Criar pedido com itens
      const novoPedido = pedidoRepo.create({
        user_id,
        endereco,
        metodo_pag,
        total,
        data_pedido: new Date(),
        itens: itensCriados,
      });

      const pedidoSalvo = await pedidoRepo.save(novoPedido);

      // Decrementar estoque e limpar carrinho (se usou o carrinho)
      for (const item of itens) {
        await produtoRepo.decrement({ id: item.produto_id }, "quantidade", item.quantidade);
      }

      // Se o pedido foi criado a partir do carrinho, remover os itens do carrinho do usuário
      if (!req.body.itens || req.body.itens.length === 0) {
        const carrinhoParaRemover = await carrinhoRepo.find({ where: { user_id } });
        if (carrinhoParaRemover.length > 0) {
          await carrinhoRepo.remove(carrinhoParaRemover);
        }
      }

      // Retornar o pedido criado
      res.status(201).json({
        mensagem: "Pedido criado com sucesso",
        pedido: pedidoSalvo,
      });
    });
  } catch (error: any) {
    console.error(error);
    if (error && error.status && error.message) {
      return res.status(error.status).json({ erro: error.message });
    }
    return res.status(500).json({ erro: "Erro ao criar pedido" });
  }
};
