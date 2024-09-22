import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities/banck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService], 
})
export class BankModule {}
