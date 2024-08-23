import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Category } from "../category/category.entity";
import { Actor } from "../actor/actor.entity";
import { Media } from "../media/media.entity";

@Entity()
export class Movie {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, nullable: false, type: "text" })
  title: string;

  @Column({ nullable: false, type: "text" })
  description: string;

  @Column({ nullable: true, type: "timestamp" })
  releaseDate: Date;

  @Column({ type: "text", nullable: true, default: "" })
  director?: string;

  @Column({ default: 1, type: "decimal" })
  rate: number;

  @Column({ type: "decimal", default: 0.0 })
  duration?: number;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
  
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;

  @ManyToMany(() => Category)
  @JoinTable()
  categories: Category[]

  @ManyToMany(() => Actor, (actor) => actor.movies)
  @JoinTable()
  actors: Actor[]

  @OneToOne(() => Media)
  @JoinColumn()
  trailer?: Media;

  @OneToOne(() => Media)
  @JoinColumn()
  movieVideo?: Media;

  @OneToOne(() => Media)
  @JoinColumn()
  poster?: Media;
}