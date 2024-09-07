import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { Role } from 'src/common/enum/Roles.enum';

export class RegisterDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Role)  
  role: Role.USER;

  status: boolean;
}
