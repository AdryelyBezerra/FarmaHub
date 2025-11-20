import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Favorito } from "../entities/favorito";
import { Produto } from "../entities/produto";
import { User } from "../entities/user";

export const favoritarProduto = async (req: Request, res: Response) => {
  try {
    const { produto_id } = req.body;
    const user = req.user as User;

    const produtoRepository = AppDataSource.getRepository(Produto);
    const produto = await produtoRepository.findOne({
      where: { id: produto_id },
    });

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado" });
    }

    // Verifica se tem estoque
    if (produto.quantidade <= 0) {
      return res
        .status(400)
        .json({ erro: "Produto está sem estoque e não pode ser favoritado" });
    }

    // Verificar se já está favoritado
    const favoritoRepository = AppDataSource.getRepository(Favorito);
    const favoritoExistente = await favoritoRepository.findOne({
      where: {
        user_id: user.id,
        produto_id: produto_id,
      },
    });

    if (favoritoExistente) {
      return res.status(400).json({
        erro: "Produto já está nos favoritos",
      });
    }

    // Criar favorito
    const novoFavorito = favoritoRepository.create({
      user_id: user.id,
      produto_id: produto_id,
    });

    await favoritoRepository.save(novoFavorito);

    res.status(201).json({
      mensagem: "Produto favoritado com sucesso",
      favorito: novoFavorito,
    });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao favoritar produto" });
  }
};

export const desfavoritarProduto = async (req: Request, res: Response) => {
  try {
    const { produto_id } = req.params;
    const user = req.user as User;

    const favoritoRepository = AppDataSource.getRepository(Favorito);
    const favorito = await favoritoRepository.findOne({
      where: {
        user_id: user.id,
        produto_id: parseInt(produto_id),
      },
    });

    if (!favorito) {
      return res.status(404).json({
        erro: "Favorito não encontrado",
      });
    }

    await favoritoRepository.remove(favorito);

    res.json({ mensagem: "Produto removido dos favoritos com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao desfavoritar produto" });
  }
};

export const listarFavoritos = async (req: Request, res: Response) => {
  try {
    const user = req.user as User;

    const favoritoRepository = AppDataSource.getRepository(Favorito);
    const favoritos = await favoritoRepository.find({
      where: { user_id: user.id },
      relations: ["produto", "produto.user"],
      select: {
        produto: {
          id: true,
          nome: true,
          apresentacao: true,
          fabricante: true,
          tipo: true,
          preco: true,
          user: {
            id: true,
            nome: true,
            email: true,
          },
        },
      },
    });

    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ erro: "Erro ao listar favoritos" });
  }
};
