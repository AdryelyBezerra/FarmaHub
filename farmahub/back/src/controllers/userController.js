import { UserModel } from "../models/user.js";

export const UserController = {
    listar: (req, res) => {
        const usuarios = UserModel.findAll();
        res.json(usuarios);
    },

    criar: (req, res) => {
        const novo = UserModel.create(req.body);
        res.status(201).json({mensagem: 'Usuário criado com sucesso', usuario: novo});
    }
};