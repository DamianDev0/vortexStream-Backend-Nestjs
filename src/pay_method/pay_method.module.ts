import { Module } from '@nestjs/common';
import { PayMethodService } from './pay_method.service';
import { PayMethodController } from './pay_method.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayMethod } from './entities/pay_method.entity';
import { Bank } from 'src/bank/entities/banck.entity';
import { BankService } from 'src/bank/bank.service';

@Module({
  imports: [TypeOrmModule.forFeature([PayMethod, Bank])],
  controllers: [PayMethodController],
  providers: [PayMethodService, BankService],
  exports: [PayMethodService], // Para que pueda ser inyectado en otros módulos.  //  En este caso, PayMethodService es exportado para que pueda ser usado en otros módulos.  //  Este módulo tiene un controlador (PayMethodController) y un proveedor (PayMethodService).  //  El proveedor se exporta para que pueda ser usado en otros módulos.
})
export class PayMethodModule {}
