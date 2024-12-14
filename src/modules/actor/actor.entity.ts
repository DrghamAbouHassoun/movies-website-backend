import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToMany, OneToOne, JoinColumn } from "typeorm";
import { Movie } from "../movies/movie.entity";
import { Media } from "../media/media.entity";

@Entity()
export class Actor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  // @Column({ nullable: true, default: "" })
  // image?: string;

  @OneToOne(() => Media)
  @JoinColumn()
  image?: Media;

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