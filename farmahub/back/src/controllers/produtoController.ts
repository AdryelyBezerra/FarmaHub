import { Request, Response } from "express";
import { AppDataSource } from "../config/database";
import { Produto } from "../entities/produto";
import { User, UserRole } from "../entities/user";
import { produtoSchema, produtoUpdateSchema } from "../validators/produtoSchema";

export const criarProduto = async (req: Request, res: Response) => {
    try {
        const dadosValidados = produtoSchema.parse(req.body);
        const user = req.user as User;

        const produtoRepository = AppDataSource.getRepository(Produto);
        const novoProduto = produtoRepository.create({
            ...dadosValidados,
            user_id: user.id,
            farmaceutico_id: user.id,
        });

        await produtoRepository.save(novoProduto);

        res.status(201).json({
            mensagem: "Produto criado com sucesso",
            produto: novoProduto,
        });

    } catch (error: any) {
        if (error.name === "ZodError") {
            return res.status(400).json({ erro: error.errors });
        }
        res.status(500).json({ erro: "Erro ao criar produto" });
    }
};

export const listarProdutos = async (req: Request, res: Response) => {
    try {
        const user = req.user as User;
        const produtoRepository = AppDataSource.getRepository(Produto);
        const produtos = await produtoRepository.find({
            where: { user_id: user.id },
        });
    
        res.json(produtos);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao listar produtos" });
    }
};

export const pesquisarProduto = async (req: Request, res: Response) => {
    try {   
        const { id } = req.params;
        const produtoRepository = AppDataSource.getRepository(Produto);
        const produto = await produtoRepository.findOne({
            where: { id: parseInt(id) },
                relations: ["user"],
                select: {
                    user: {
                        id: true,
                        nome: true,
                        email: true,
                    },
                },
        });

        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }

        res.json(produto);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar produto" });
    }
};

export const atualizarProduto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const dadosValidados = produtoUpdateSchema.parse(req.body);
        const user = req.user as User;

        const produtoRepository = AppDataSource.getRepository(Produto);
        const produto = await produtoRepository.findOne({
            where: { id: parseInt(id) },
        });

        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }

        // Verificar se o produto pertence ao usuário
        if (produto.user_id !== user.id) {
            return res.status(403).json({
                erro: "Você não tem permissão para atualizar este produto",
            });
        }

        produtoRepository.merge(produto, dadosValidados);
        await produtoRepository.save(produto);

        res.json({
            mensagem: "Produto atualizado com sucesso",
            produto,
        });
    } catch (error: any) {
        if (error.name === "ZodError") {
            return res.status(400).json({ erro: error.errors });
        }
        res.status(500).json({ erro: "Erro ao atualizar produto" });
    }
};

export const deletarProduto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const user = req.user as User;

        const produtoRepository = AppDataSource.getRepository(Produto);
        const produto = await produtoRepository.findOne({
            where: { id: parseInt(id) },
        });

        if (!produto) {
            return res.status(404).json({ erro: "Produto não encontrado" });
        }

        // Verificar se o produto pertence ao usuário
        if (produto.user_id !== user.id) {
            return res.status(403).json({
                erro: "Você não tem permissão para deletar este produto",
            });
        }

        await produtoRepository.remove(produto);

        res.json({ mensagem: "Produto deletado com sucesso" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao deletar produto" });
    }
};
