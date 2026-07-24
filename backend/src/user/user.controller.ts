import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Public } from '../auth/decorator/isPublic.gurd';
import { Roles } from '../auth/decorator/roles.decorator';
import { Role } from './enum/user-role.enum';
import { RolesGuard } from '../auth/roles.guard';
 
@Controller('user')
@UseGuards(AuthGuard,RolesGuard)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Roles(Role.SUPERADMIN)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

   @Get()
  @Roles(Role.SUPERADMIN) 
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number, 
    @Body() updateUserDto: UpdateUserDto
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(Role.SUPERADMIN) 
  async remove(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.remove(id);
  }
}
