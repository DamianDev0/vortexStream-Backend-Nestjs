import { Module } from '@nestjs/common';
import { SubcriptionsService } from './subcriptions.service';
import { SubcriptionsController } from './subcriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subscription } from './entities/subcription.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscription, User])],
  controllers: [SubcriptionsController],
  providers: [SubcriptionsService],
  exports: [SubcriptionsService, TypeOrmModule]
})
export class SubcriptionsModule {}
