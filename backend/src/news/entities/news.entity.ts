// src/news/news.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum NewsType {
  NEWS = 'news',
  PRESS_RELEASE = 'press-release',
  EVENT = 'event',
}

@Entity('news')
export class News {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  excerpt!: string;

  @Column({ type: 'date' })
  date!: string; // ISO date string

  @Column({ type: 'varchar', length: 500, nullable: true })
  image!: string | null;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category!: string | null;

  @Column({ type: 'boolean', default: false })
  featured!: boolean;

  @Column({
    type: 'enum',
    enum: NewsType,
    default: NewsType.NEWS,
  })
  type!: NewsType;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}