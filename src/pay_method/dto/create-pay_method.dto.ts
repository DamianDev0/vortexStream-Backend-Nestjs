import { IsString } from 'class-validator';

export class PayMethodDto {
  @IsString()
  cardNumber: string;

  @IsString()
  cvv: string;

  @IsString()
  experationDate: string;
}
