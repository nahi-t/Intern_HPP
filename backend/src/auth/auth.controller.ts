import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';

import { LoginDto } from '../user/dto/Login.dto';
import { AuthService } from './auth.service';
import { Public } from './decorator/isPublic.gurd';

@Controller('auth')
export class AuthController {

      constructor(
        private readonly  authservice:AuthService
    ){}
    @Public()
     @HttpCode(HttpStatus.OK)
  @Post('login')
  signin(@Body() logindto:LoginDto){
    return this.authservice.login(logindto)
  }

}
