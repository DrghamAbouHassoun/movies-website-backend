import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { Movie } from "../movies/movie.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true, default: "" })
  image: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
  
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  // constructor() {
  //   this.createdAt = new Date(Math.floor(1723551490300 / 1000) * 1000); // Convert to seconds
  //   this.updatedAt = new Date(Math.floor(1723551490300 / 1000) * 1000); // Convert to seconds
  // }

  @ManyToMany(() => Movie)
  @JoinTable()
  movies: Movie[]
}