import { HttpException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, TableInheritance } from 'typeorm';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/Login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userrepo:Repository<User>
  ){}
  
   async create(createUserDto: CreateUserDto) {
    try {
      const email=createUserDto.email
      const exist= await this.userrepo.findOneBy({email})
      if(exist){
        return "user is exist in this email"
      }
      const pass=createUserDto.password
      const hashpass=await bcrypt.hash(pass,10)
      const newuser=await this.userrepo.create({
        ...createUserDto,
        password:hashpass,


      })
      return await this.userrepo.save(newuser)
    } catch (error:any) {
          if (error instanceof HttpException || error.status) {
      throw error;
    }
      
      throw new InternalServerErrorException('Something went wrong while creating the user');
     
      
    }
   
  }

 async findAll(){
    // Exclude passwords from being sent in lists for better security
    return await this.userrepo.find({
      select: {id:true, firstName:true, lastName:true, email:true, role:true},
    });
  }

 async findOne(id: number): Promise<User> {
    const user = await this.userrepo.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with ID #${id} not found`);
    }
    return user;
  }

 async update(id: number, updateUserDto: UpdateUserDto){
  try {

    const user = await this.userrepo.preload({
      id: id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID #${id} does not exist`);
    }

    return await this.userrepo.save(user);
    
  } catch (error) {

    
  }
  }

   async remove(id: number): Promise<{ message: string }> {
    const user = await this.findOne(id); 
    await this.userrepo.remove(user);
    return { message: `User with ID #${id} successfully removed` };
  }
}


