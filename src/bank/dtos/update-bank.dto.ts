import { PartialType } from '@nestjs/mapped-types';
import { BankDto } from './create-bank.dto';

export class UpdateBankDto extends PartialType(BankDto) {}
