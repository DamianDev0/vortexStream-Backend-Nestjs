import { Module } from '@nestjs/common';
import { HistoryUserService } from './history-user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryUser } from './entities/history-user.entity';
import { User } from '../users/entities/user.entity';
import { HistoryUserController } from './history-user.controller';

@Module({
  imports:[ TypeOrmModule.forFeature([HistoryUser, User])],
  controllers: [HistoryUserController],
  providers: [HistoryUserService],
})
export class HistoryUserModule {}
