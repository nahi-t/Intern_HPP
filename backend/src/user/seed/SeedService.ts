import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Role } from '../enum/user-role.enum';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async onModuleInit(){
    const adminEmail="admin@example.com"

    const existingAdmin= await  this.userRepository.findOne({
     where:{email:adminEmail}
    })
    if (existingAdmin){
      console.log("admin exist")
      return
    }

   const pass="admin123"
     const hashpass= await bcrypt.hash(pass, 10);

    const creatAdmin= await this.userRepository.create({
      firstName:"test",
      lastName:"test",
      email:adminEmail,
      password:hashpass,
      role:Role.SUPERADMIN,
    
    })
   await this.userRepository.save(creatAdmin)
   console.log("admin crated")
  }
}