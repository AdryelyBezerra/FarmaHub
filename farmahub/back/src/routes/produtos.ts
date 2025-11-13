import express from "express";
import passport from "passport";
import {
    criarProduto,
    listarProdutos,
    pesquisarProduto,
    atualizarProduto,
    deletarProduto,
} from "../controllers/produtoController";

import { verificarRole } from "../middlewares/verificarRole";
import { UserRole } from "../entities/user";
import { autenticar } from "../middlewares/autenticar";

const router = express.Router();

// Criar produto (farmaceutico)
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    autenticar,
    verificarRole(UserRole.FARMACEUTICO),
    criarProduto
);

// Listar todos os produtos (apenas autenticado)
router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    listarProdutos
);

// Obter produto específico (apenas autenticado)
router.get(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    pesquisarProduto
);

// Atualizar produto (apenas farmaceutico)
router.patch(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    verificarRole(UserRole.FARMACEUTICO),
    atualizarProduto
);
// Deletar produto (apenas farmaceutico)
router.delete(
    "/:id",
    passport.authenticate("jwt", { session: false }),
    verificarRole(UserRole.FARMACEUTICO),
    deletarProduto
);

export default router;
