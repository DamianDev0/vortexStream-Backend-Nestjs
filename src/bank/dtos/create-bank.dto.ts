import { IsString } from 'class-validator';

export class BankDto {
  @IsString()
  name: string;

  @IsString()
  country: string;

  @IsString()
  phoneNumber: string;
}
