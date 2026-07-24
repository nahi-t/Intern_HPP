import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { Role } from '../enum/user-role.enum';

export class CreateUserDto {
  @ApiProperty({
    description: 'The legal first name of the user',
    example: 'John',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'First name is required' })
  firstName!: string;

  @ApiProperty({
    description: 'The legal last name of the user',
    example: 'Doe',
    type: String,
  })
  @IsString()
  @IsNotEmpty({ message: 'Last name is required' })
  lastName!: string;

  @ApiProperty({
    description: 'The unique primary electronic mail address used for login and notifications',
    example: 'john.doe@example.com',
    type: String,
    uniqueItems: true,
  })
  @IsEmail({}, { message: 'Invalid email address format' })
  @IsNotEmpty({ message: 'Email is required' })
  email!: string;

  @ApiProperty({
    description: 'The plain-text registration password (will be automatically hashed before persistence)',
    example: 'P@ssw0rd123',
    type: String,
    minLength: 6,
    format: 'password',
  })
  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;

  @ApiProperty({
    description: 'The operational role assigned to determine system access permissions',
    enum: Role,
    example: Role.ADMIN, // Replace with an actual key/value from your Role enum if named differently
  })
  @IsEnum(Role, { message: 'Role must be a valid user role enum value' })
  @IsNotEmpty({ message: 'Role assignment is required' })
  role!: Role;
}
