import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('hero_content')
export class Hero {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ default: 'Welcome to the Harari Regional' })
  titleLine1!: string;

  @Column({ default: 'State Corrections Service' })
  titleLine2!: string;

  @Column({ default: 'Fostering Security, Justice, and Rehabilitation' })
  subtitle!: string;

  @Column({ type: 'simple-array', nullable: true })
  backgroundImages!: string[];
}
