import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";

import { User } from "./user";
import { Produto } from "./produto";

@Entity("carrinhos")
@Unique(["user_id", "produto_id"])
export class Carrinho {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.carrinho, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  user_id!: number;

  @ManyToOne(() => Produto, { nullable: false })
  @JoinColumn({ name: "produto_id" })
  produto!: Produto;

  @Column()
  produto_id!: number;

  @Column({ type: "int", default: 1 })
  qnt_car!: number;
}
