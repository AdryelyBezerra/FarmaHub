import express from "express";
import passport from "passport";
import {
    favoritarProduto,
    desfavoritarProduto,
    listarFavoritos,
} from "../controllers/favoritoController";

const router = express.Router();

// Todas as rotas exigem autenticação
router.post(
    "/",
    passport.authenticate("jwt", { session: false }),
    favoritarProduto
);

router.delete(
    "/:produto_id",
    passport.authenticate("jwt", { session: false }),
    desfavoritarProduto
);

router.get(
    "/",
    passport.authenticate("jwt", { session: false }),
    listarFavoritos
);

export default router;