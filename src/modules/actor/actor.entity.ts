import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany } from "typeorm";
import { Movie } from "../movies/movie.entity";

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true, default: "" })
  image?: string;

  @Column({ type: "timestamp", default: new Date() })
  birthdate: Date;

  @Column()
  bio?: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
  
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToMany(() => Movie, (movie) => movie.actors)
  movies: Movie[]
}