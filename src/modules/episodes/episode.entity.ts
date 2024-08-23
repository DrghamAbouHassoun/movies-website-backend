import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "../media/media.entity";

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  index: number;

  @Column({ type: "text", unique: true, nullable: true })
  title?: string

  @Column({ type: "longtext", nullable: true })
  description?: string;

  @OneToOne(() => Media)
  @JoinColumn()
  trailer?: Media;

  @OneToOne(() => Media)
  @JoinColumn()
  episodeVideo?: Media;
}