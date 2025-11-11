import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
} from "typeorm";

import { Produto } from "./produto";
import { Favorito } from "./favorito";
import { Carrinho } from "./carrinho";

export enum UserRole {
    FARMACEUTICO = "farmaceutico",
    COMPRADOR = "comprador",
}

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    nome!: string;

    @Column({unique: true})
    email!: string;

    @Column()
    senha!: string;

    @Column({
        type: "text",
        default: UserRole.COMPRADOR,
    })
    role!: UserRole;

    @OneToMany(() => Produto, (produto) => produto.user)
    produtos!: Produto[];

    @OneToMany(() => Favorito, (favorito) => favorito.user)
    favoritos!: Favorito;

    @OneToMany(() => Carrinho, (carrinho) => carrinho.user)
    carrinho!: Carrinho[];
}