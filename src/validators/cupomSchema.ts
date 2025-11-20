import { z } from "zod";

export const cupomSchema = z.object({
  codigo: z.string().min(3, "O código do cupom deve ter pelo menos 3 letras").toUpperCase(),
  desconto: z.number().min(1).max(100, "O desconto deve ser entre 1% e 100%"),
  validade: z.string().refine((data) => !isNaN(Date.parse(data)), {
    message: "Data de validade inválida",
  }),
});