import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  JoinColumn,
} from "typeorm";

import { User } from "./user";
import { Favorito } from "./favorito";

export enum Categoria {
  MEDICAMENTO = "medicamento",
  COSMETICO = "cosmetico",
  HIGIENE = "higiene",
  DIAGNOSTICO = "diagnostico",
  CONVENIENCIA = "conveniencia",
  OUTRO = "outro",
}

@Entity("produtos")
export class Produto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nome!: string;

  @Column()
  apresentacao!: string;

  @Column()
  fabricante!: string;

  @Column({
    type: "text",
    enum: Categoria,
  })
  tipo!: Categoria;

  @Column("decimal", { precision: 10, scale: 2 })
  preco!: number;

  @Column()
  quantidade!: number;

  @ManyToOne(() => User, (user) => user.produtos, { nullable: false })
  @JoinColumn({ name: "user_id" })
  user!: User;

  @Column()
  user_id!: number;

  @OneToMany(() => Favorito, (favorito) => favorito.produto)
  favoritos!: Favorito[];

  @ManyToOne(() => User)
  @JoinColumn({ name: "farmaceutico_id" })
  farmaceutico!: User;

  @Column()
  farmaceutico_id!: number;
}
