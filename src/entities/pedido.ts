import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { User } from "./user";
import { PedidoItem } from "./pedidoItem";

export enum MetodoPagamento {
  PIX = "pix",
  CARTAO = "cartao",
}

@Entity("pedidos")
export class Pedido {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  user_id!: number;

  @Column()
  endereco!: string;

  @Column({
    type: "text",
    enum: MetodoPagamento,
  })
  metodo_pag!: MetodoPagamento;

  @Column("decimal", { precision: 10, scale: 2 })
  total!: number;

  @Column({ type: "datetime" })
  data_pedido!: Date;

  @OneToMany(() => PedidoItem, (item) => item.pedido, { cascade: true })
  itens!: PedidoItem[];
}
