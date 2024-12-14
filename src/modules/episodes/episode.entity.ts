import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Media } from "../media/media.entity";
import { Season } from "../seasons/season.entity";
import { Show } from "../shows/show.entity";

@Entity()
export class Episode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  index: number;

  @Column({ type: "text", unique: true, nullable: true })
  title?: string

  @Column({ type: "text", nullable: true })
  description?: string;

  @OneToOne(() => Media)
  @JoinColumn()
  trailer?: Media;

  @OneToOne(() => Media)
  @JoinColumn()
  episodeVideo?: Media;

  @ManyToOne(() => Show, (show) => show.episodes)
  show: Show

  @ManyToOne(() => Season, (season) => season.episodes)
  season: Season;
}