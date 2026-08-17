// src/announcements/announcement.entity.ts
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum AnnouncementType {
  PUBLIC_NOTICE = 'Public Notice',
  GOVERNMENT_DIRECTIVE = 'Government Directive',
  SERVICE_UPDATE = 'Service Update',
}

export enum AnnouncementPriority {
  HIGH = 'high',
  MEDIUM = 'medium',
  LOW = 'low',
}

@Entity('announcements')
export class Announcement {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'varchar', length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  excerpt!: string;

  @Column({ type: 'date' })
  date!: string;

  @Column({
    type: 'enum',
    enum: AnnouncementType,
    default: AnnouncementType.PUBLIC_NOTICE,
  })
  type!: AnnouncementType;

  @Column({
    type: 'enum',
    enum: AnnouncementPriority,
    default: AnnouncementPriority.MEDIUM,
  })
  priority!: AnnouncementPriority;

  @Column({ type: 'varchar', length: 500, nullable: true })
  image!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}