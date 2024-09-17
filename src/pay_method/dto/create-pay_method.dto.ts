import { IsDate, IsString, MaxLength, MinLength } from 'class-validator';

export class PayMethodDto {
  @IsString()
  userId: string;

  @IsString()
  nameCardHolder: string;

  @IsString()
  bankId: string
  
  @MinLength(10)
  @IsString()
  cardNumber: number;

  @MaxLength(3)
  @IsString()
  cvv: number;

  @IsString()
  expirationDate: string;
}
