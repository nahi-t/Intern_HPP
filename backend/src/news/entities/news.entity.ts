// src/news/news.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  excerpt!: string;

  @Column({ type: 'date' })
  date!: string; // or Date, depending on your preference

  @Column({ type: 'varchar', length: 500, nullable: true })
  image!: string | null; // URL or file path

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
