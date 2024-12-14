import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, CreateDateColumn, UpdateDateColumn, OneToOne, JoinColumn } from "typeorm";
import { Movie } from "../movies/movie.entity";
import { Media } from "../media/media.entity";

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToOne(() => Media)
  @JoinColumn()
  image?: Media;

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