import { z } from "zod";
import { Categoria } from "../entities/produto";

export const produtoSchema = z.object({
    nome: z.string().min(3),
    apresentacao: z.string().max(150),
    fabricante: z.string().min(1),
    tipo: z.enum([
        Categoria.MEDICAMENTO,
        Categoria.COSMETICO,
        Categoria.HIGIENE,
        Categoria.DIAGNOSTICO,
        Categoria.CONVENIENCIA,
        Categoria.OUTRO
    ], { message: "Tipo inválido" }),
    preco: z.number().positive(),
    quantidade: z.number().int().nonnegative(),
});

export const produtoUpdateSchema = produtoSchema.partial();
