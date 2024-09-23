import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SubcriptionsModule } from '../subcriptions/subcriptions.module';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';


@Module({
  imports: [SubcriptionsModule, TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UsersService, CloudinaryService],
  exports: [UsersService],
})
export class UsersModule {}
