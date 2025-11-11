import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "../entities/user";
import { Produto } from "../entities/produto";
import { Pedido } from "../entities/pedido";
import { PedidoItem } from "../entities/pedidoItem";
import { Favorito } from "../entities/favorito";
import { Carrinho } from "../entities/carrinho";
import { TokenBlacklist } from "../entities/TokenBlacklist";

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "database.sqlite",
    synchronize: true,
    logging: false,
    entities: [User, Produto, Pedido, PedidoItem, Favorito, Carrinho, TokenBlacklist],
});

export const initializeDatabase = async () => {
    try {
        await AppDataSource.initialize();
        console.log("Banco de dados conectado com sucesso!!");
    } catch (error) {
        console.error("Erro ao conectar ao banco de dados:", error);
        process.exit(1);
    }
};