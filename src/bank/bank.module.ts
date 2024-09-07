import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './entities/banck.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Bank])],
  controllers: [BankController],
  providers: [BankService],
  exports: [BankService], // Para que pueda ser inyectado en otros módulos.  //  En este caso, BankService es exportado para que pueda ser usado en otros módulos.  //  Este módulo tiene un controlador (BankController) y un proveedor (BankService).  //  El proveedor se exporta para que pueda ser usado en otros módulos.  //  Este módulo no tiene dependencias adicionales.  //  Las dependencias adicionales serían otros módulos que necesitan usar BankService.  //  Por lo tanto, este módulo es una caja negra que proporciona servicios para manejar las operaciones de la banca.  //  Este módulo es utilizado en otros módulos para interact
})
export class BankModule {}
