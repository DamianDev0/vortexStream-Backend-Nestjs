import { Module } from '@nestjs/common';
import { HistoryUserService } from './history-user.service';
import { HistoryUserController } from './history-user.controller';

@Module({
  controllers: [HistoryUserController],
  providers: [HistoryUserService],
})
export class HistoryUserModule {}
