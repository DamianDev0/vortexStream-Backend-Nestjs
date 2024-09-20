import { Module } from '@nestjs/common';
import { HistoryUserService } from './history-user.service';
import { HistoryUserController } from './history-user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryUser } from './entities/history-user.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
  imports:[ TypeOrmModule.forFeature([HistoryUser, User])],
  controllers: [HistoryUserController],
  providers: [HistoryUserService],
})
export class HistoryUserModule {}
