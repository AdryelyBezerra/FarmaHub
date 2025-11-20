import {
    Entity,
    PrimaryGeneratedColumn,
    ManyToOne, 
    Column,
    JoinColumn,
} from "typeorm";

import { Produto } from "./produto";
import { Pedido } from "./pedido";

@Entity("pedido_itens")
export class PedidoItem {
    @PrimaryGeneratedColumn()
    id!: number;

    @ManyToOne(() => Pedido, (pedido) => pedido.itens, { nullable: false })
    @JoinColumn({ name: "pedido_id"})
    pedido!: Pedido;

    @Column()
    pedido_id!: number;

    @ManyToOne(() => Produto, { nullable: false })
    @JoinColumn({ name: "produto_id" })
    produto!: Produto;

    @Column()
    produto_id!: number;

    @Column({ type: "int" })
    quantidade!: number;

    @Column("decimal", { precision: 10, scale: 2 })
    preco_unit!: number;
}