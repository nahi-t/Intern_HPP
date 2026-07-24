import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Role } from '../enum/user-role.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;
  
  @Column({ unique: true })
    email!: string;

  @Column()
  password!: string;
  @Column()
  role!:Role


}

