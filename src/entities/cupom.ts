import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("cupons")
export class Cupom {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  codigo!: string;

  @Column({ type: "int" })
  desconto!: number;

  @Column({ type: "datetime" })
  validade!: Date;
}