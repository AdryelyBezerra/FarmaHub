import express from "express";
import passport from "passport";
import { criarCupom, aplicarCupom } from "../controllers/cupomController";
import { verificarRole } from "../middlewares/verificarRole";
import { UserRole } from "../entities/user";
import { autenticar } from "../middlewares/autenticar";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  autenticar,
  verificarRole(UserRole.FARMACEUTICO),
  criarCupom
);

router.post(
  "/aplicar",
  passport.authenticate("jwt", { session: false }),
  aplicarCupom
);

export default router;