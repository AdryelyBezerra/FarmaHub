import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../entities/user";

const SECRET_KEY = process.env.JWT_SECRET || "sua-chave-secreta-super-segura";

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ erro: "Token de autenticação não fornecido" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, SECRET_KEY) as Partial<User>;
    req.user = decoded as User; // <--- adiciona o usuário decodificado no request
    next();
  } catch (error) {
    return res.status(401).json({ erro: "Token inválido ou expirado" });
  }
};
