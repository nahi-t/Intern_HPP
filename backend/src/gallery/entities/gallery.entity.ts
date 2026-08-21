import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { GalleryCategory, GalleryMediaType } from '../enum';

@Entity('gallery_items')
export class GalleryItem {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ length: 255 })
  title!: string;

  @Column({ type: 'text', nullable: true })
  description!: string;

  @Column({ type: 'enum', enum: GalleryCategory })
  category!: GalleryCategory;

  @Column({ type: 'enum', enum: GalleryMediaType })
  type!: GalleryMediaType;

  @Column({ name: 'thumbnail_url' })
  thumbnailUrl!: string;

  @Column({ name: 'media_url' })
  mediaUrl!: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt!: Date;
}