import { IsString, IsOptional, IsArray } from 'class-validator';
import { PayMethod } from '../../pay_method/entities/pay_method.entity';

export class BankDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsArray()
  payMethods?: PayMethod[]; // Cambia a PayMethod[] si usas entidades
}
