import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Episode } from "../episodes/episode.entity";
import { Show } from "../shows/show.entity";

@Entity()
export class Season {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  index: number;

  @Column({ unique: true, nullable: false, type: "text" })
  title: string;

  @Column({ nullable: false, type: "text" })
  description: string;

  @Column({ nullable: true, type: "timestamp" })
  releaseDate: Date;

  @ManyToOne(() => Show, (show) => show.seasons)
  show: Show;

  @OneToMany(() => Episode, (episode) => episode.season)
  episodes: Episode[]
}