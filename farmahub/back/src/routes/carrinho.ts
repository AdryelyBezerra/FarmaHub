import express from "express";
import passport from "passport";
import {
    inserirCarrinho,
    removerCarrinho,
    listarCarrinho,
} from "../controllers/carrinhoController";

const router = express.Router();

// Todas as rotas exigem autenticação
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    inserirCarrinho
);

router.delete(
    "/:produto_id",
    passport.authenticate("jwt", { session: false }),
    removerCarrinho
);

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    listarCarrinho
);333

export default router;