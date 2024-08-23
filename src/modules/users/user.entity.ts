import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "varchar" })
  name: string;

  @Column({ nullable: false, unique: true, type: "varchar" })
  email: string;

  @Column({ type: "varchar", nullable: false })
  password: string;

  @Column({ type: "varchar", nullable: false })
  phone: string;

  @Column({ type: "varchar", enum: ["admin", "user"], default: "user" })
  role: string;
}