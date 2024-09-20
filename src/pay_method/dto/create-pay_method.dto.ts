import { IsString, MaxLength, MinLength } from 'class-validator';

export class PayMethodDto {
  @IsString()
  userId: string;
  
  @IsString()
  nameCardHolder: string;

  @IsString()
  bankId: string;

  @MinLength(10)
  @IsString()
  cardNumber: string;

  @MaxLength(3)
  @IsString()
  cvv: string;

  @IsString()
  expirationDate: string;
}
