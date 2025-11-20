import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  Column,
  Unique,
} from "typeorm";

import { User } from "./user";
import { Produto } from "./produto";

@Entity("favoritos")
@Unique(["user_id", "produto_id"])
export class Favorito {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => User, (user) => user.favoritos, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  user_id!: number;

  @ManyToOne(() => Produto, (produto) => produto.favoritos, {
    nullable: false,
  })
  @JoinColumn({ name: "produto_id" })
  produto!: Produto;

  @Column()
  produto_id!: number;
}
