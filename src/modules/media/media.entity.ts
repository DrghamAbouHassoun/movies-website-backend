import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Media {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "text", nullable: false })
  name: string;

  @Column({ type: "text", enum: ["video", "image", "pdf", "audio"], default: "image" })
  fileType: string;

  @Column({ type: "text", nullable: true })
  alt: string;

  @CreateDateColumn({ type: "timestamp" })
  createdAt: Date;
  
  @UpdateDateColumn({ type: "timestamp" })
  updatedAt: Date;
}