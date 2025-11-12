import { Request, Response, NextFunction } from "express";
import { User, UserRole } from "../entities/user";

export const verificarRole = (rolePermitido: UserRole) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as User;

        if (!user) {
            return res.status(401).json({ erro: "Usuário não autenticado" });
        }

        if (user.role !== rolePermitido) {
            return res.status(403).json({
                erro: "Você não tem permissão para realizar esta operação",
            });
        }

        next();
    };
};
