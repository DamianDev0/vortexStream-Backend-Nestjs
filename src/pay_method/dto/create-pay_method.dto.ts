import { IsDate, IsString } from 'class-validator';

export class PayMethodDto {
  @IsString()
  userId: string;

  @IsString()
  nameCardHolder: string;

  @IsString()
  bankId: string
  
  @IsString()
  cardNumber: number;

  @IsString()
  cvv: number;

  @IsDate()
  experationDate: Date;
}
