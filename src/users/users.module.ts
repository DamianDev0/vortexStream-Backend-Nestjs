import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { SubcriptionsModule } from 'src/subcriptions/subcriptions.module';
import { SubcriptionsService } from 'src/subcriptions/subcriptions.service';

@Module({
  imports: [SubcriptionsModule, TypeOrmModule.forFeature([User])],
  controllers: [],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
