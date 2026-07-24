// service.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('services') // table name, optional
export class Service {
  @PrimaryGeneratedColumn() // auto-incremented integer ID
  id!: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  image!: string | null; // could store a URL or file path

  @Column({ type: 'varchar', length: 100, nullable: false })
  title!: string;

  @Column({ type: 'text', nullable: true }) // longer text, can be optional
  description!: string;
}