import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from '../user/dto/Login.dto';
import { UserService } from './../user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
      @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  private readonly jwtService: JwtService,){}
  
  async login(logindto:LoginDto){
    const {email,password}=logindto

    const user=await this.userRepository.findOneBy({email})



    const ismatch=await bcrypt.compare(password,user?.password||"")
    if (!ismatch){
        throw new UnauthorizedException('Invalid credentials');
    }

    //generate jwt
    const payload={sub:user?.id,email:user?.email,role:user?.role}
    return{
      message:"login seccsfull",
      access_token:await this.jwtService.signAsync(payload)
    }
  }

   
}
