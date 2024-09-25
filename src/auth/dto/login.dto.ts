import { IsOptional, IsString, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  @MinLength(8)
  password?: string;
}
