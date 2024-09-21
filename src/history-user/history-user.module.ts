import { Module } from '@nestjs/common';
import { HistoryUserService } from './history-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryUser } from './entities/history-user.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([HistoryUser, User])],
  controllers: [],
  providers: [HistoryUserService],
})
export class HistoryUserModule {}
