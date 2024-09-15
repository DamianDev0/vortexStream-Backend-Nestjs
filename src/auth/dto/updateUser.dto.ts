import { IsDateString, IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateUserDto{
    
    @IsOptional()
    @IsString()
    username?: string;
  
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsString()
    secondName?: string;
  
    @IsOptional()
    @IsString()
    lastName?: string;
  
    @IsOptional()
    @IsDateString()
    bornDate?: string; 
  
    @IsOptional()
    @IsString()
    country?: string;
  
    @IsOptional()
    @IsNumber()
    phoneNumber?: number;
}