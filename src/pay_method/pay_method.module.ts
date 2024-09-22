import { Module } from '@nestjs/common';
import { PayMethodService } from './pay_method.service';
import { PayMethodController } from './pay_method.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayMethod } from './entities/pay_method.entity';
import { Bank } from '../bank/entities/banck.entity';
import { BankService } from '../bank/bank.service';

@Module({
  imports: [TypeOrmModule.forFeature([PayMethod, Bank])],
  controllers: [PayMethodController],
  providers: [PayMethodService, BankService],
  exports: [PayMethodService], 
})
export class PayMethodModule {}
