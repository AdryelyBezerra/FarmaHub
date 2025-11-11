import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../config/database";
import { User, UserRole } from "../entities/user";
import { TokenBlacklist } from "../entities/TokenBlacklist";
import { registroSchema, loginSchema } from "../validators/userSchema";

const SECRET_KEY = process.env.JWT_SECRET || "sua-chave-secreta-super-segura";

export const registro = async (req: Request, res: Response) => {
  try {
    const dadosValidados = registroSchema.parse(req.body);

    const userRepository = AppDataSource.getRepository(User);

    // Verificar se email já existe
    const usuarioExistente = await userRepository.findOne({
      where: { email: dadosValidados.email },
    });

    if (usuarioExistente) {
      return res.status(400).json({ erro: "Email já cadastrado" });
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(dadosValidados.senha, 10);

    const role: UserRole = dadosValidados.role
    ? (dadosValidados.role as UserRole) // validar input antes de criar
    : UserRole.COMPRADOR;

    // Criar usuário
    const novoUsuario = userRepository.create({
      nome: dadosValidados.nome,
      email: dadosValidados.email,
      senha: hashedPassword,
      role,
    });

    await userRepository.save(novoUsuario);

    res.status(201).json({
      mensagem: "Usuário registrado com sucesso",
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        role: novoUsuario.role,
      },
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ erro: error.errors });
    }
    res.status(500).json({ erro: "Erro ao registrar usuário" });
  }
};
export const login = async (req: Request, res: Response) => {
  try {
    const dadosValidados = loginSchema.parse(req.body);

    const userRepository = AppDataSource.getRepository(User);
    const usuario = await userRepository.findOne({
      where: { email: dadosValidados.email },
    });

    if (!usuario) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    const senhaValida = await bcrypt.compare(
      dadosValidados.senha,
      usuario.senha
    );

    if (!senhaValida) {
      return res.status(401).json({ erro: "Credenciais inválidas" });
    }

    // Gerar token
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
        token: "", // Será preenchido após a criação
      },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    // Adicionar o próprio token ao payload (para blacklist)
    const tokenComPayload = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        role: usuario.role,
        token: token,
      },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.json({
      mensagem: "Login realizado com sucesso",
      token: tokenComPayload,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role,
      },
    });
  } catch (error: any) {
    if (error.name === "ZodError") {
      return res.status(400).json({ erro: error.errors });
    }
    res.status(500).json({ erro: "Erro ao fazer login" });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(400).json({ erro: "Token não fornecido" });
    }

    // Decodificar token para pegar a data de expiração
    const decoded: any = jwt.decode(token);
    const expiracao = new Date(decoded.exp * 1000);

    // Adicionar token à blacklist
    const blacklistRepository = AppDataSource.getRepository(TokenBlacklist);
    const blacklistedToken = blacklistRepository.create({
      token: token,
      expiracao: expiracao,
    });
    await blacklistRepository.save(blacklistedToken);

    res.json({ mensagem: "Logout realizado com sucesso" });
  } catch (error) {
    res.status(500).json({ erro: "Erro ao fazer logout" });
  }
};
