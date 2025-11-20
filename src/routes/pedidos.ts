import express from "express";
import passport from "passport";
import { criarPedido } from "../controllers/pedidoController";
import { listarPedidos } from "../controllers/pedidoController";
import { autenticar } from "../middlewares/autenticar";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  autenticar,
  criarPedido
);

router.get(
  "/farmaceutico",
  passport.authenticate("jwt", { session: false }),
  autenticar,
  listarPedidos
)

export default router;
