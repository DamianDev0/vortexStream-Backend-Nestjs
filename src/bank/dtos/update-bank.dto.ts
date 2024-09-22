// dtos/update-bank.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { PayMethod } from 'src/pay_method/entities/pay_method.entity';

export class UpdateBankDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  country?: string;

  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @IsOptional()
  payMethods?: PayMethod[];
}
