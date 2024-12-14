import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Category } from "../category/category.entity";
import { Actor } from "../actor/actor.entity";
import { Episode } from "../episodes/episode.entity";
import { Season } from "../seasons/season.entity";

@Entity({ })
export class Show {
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

  @OneToMany(() => Season, (season) => season.show)
  seasons: Season[]

  @OneToMany(() => Episode, (episode) => episode.show)
  episodes: Episode[]
}