import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The registered primary electronic mail address used for identity verification',
    example: 'john.doe@example.com',
    type: String,
    format: 'email',
  })
  @IsEmail({}, { message: 'Invalid email format' })
  email!: string;

  @ApiProperty({
    description: 'The account security password associated with the email address',
    example: 'P@ssw0rd123',
    type: String,
    minLength: 6,
    format: 'password',
  })
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password!: string;
}
