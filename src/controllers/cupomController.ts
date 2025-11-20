import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Cupom } from "../entities/cupom";
import { cupomSchema } from "../validators/cupomSchema";

export const criarCupom = async (req: Request, res: Response) => {
  try {
    const dados = cupomSchema.parse(req.body);
    const cupomRepo = AppDataSource.getRepository(Cupom);

    const jaExiste = await cupomRepo.findOne({ where: { codigo: dados.codigo } });
    if (jaExiste) {
      return res.status(400).json({ erro: "Já existe um cupom com este código" });
    }

    const novoCupom = cupomRepo.create({
      codigo: dados.codigo,
      desconto: dados.desconto,
      validade: new Date(dados.validade),
    });

    await cupomRepo.save(novoCupom);

    res.status(201).json({ mensagem: "Cupom criado com sucesso", cupom: novoCupom });
  } catch (error: any) {
    if (error.name === "ZodError") return res.status(400).json({ erro: error.errors });
    res.status(500).json({ erro: "Erro ao criar cupom" });
  }
};

export const aplicarCupom = async (req: Request, res: Response) => {
  try {
    const { codigo } = req.body;
    
    if (!codigo) return res.status(400).json({ erro: "Código do cupom é obrigatório" });

    const cupomRepo = AppDataSource.getRepository(Cupom);
    
    const cupom = await cupomRepo.findOne({ where: { codigo: codigo.toUpperCase() } });

    if (!cupom) {
      return res.status(404).json({ erro: "Cupom inválido ou inexistente" });
    }

    const hoje = new Date();
    if (new Date(cupom.validade) < hoje) {
      return res.status(400).json({ erro: "Este cupom já expirou" });
    }

    res.json({
      mensagem: "Cupom aplicado com sucesso!",
      desconto: cupom.desconto,
      codigo: cupom.codigo
    });

  } catch (error) {
    res.status(500).json({ erro: "Erro ao validar cupom" });
  }
};