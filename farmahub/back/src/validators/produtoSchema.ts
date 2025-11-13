import { z } from "zod";

export const produtoSchema = z.object({
    nome: z.string().min(3, "Nome de produto deve ter no mínimo 3 caracteres"),
    apresentacao: z.string().max(150, "Apresentação do produto não pode ter mais de 150 caracteres"),
    fabricante: z.string().min(1, "Nome de fabricante deve ter no mínimo 1 caractere"),
    preco: z.number().positive("Preço deve ser maior que zero"),
    quantidade: z.number().int().nonnegative("Quantidade não pode ser negativa"),
});

export const produtoUpdateSchema = produtoSchema.partial();
