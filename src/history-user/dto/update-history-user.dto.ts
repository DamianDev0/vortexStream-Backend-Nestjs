import { PartialType } from '@nestjs/swagger';
import { CreateHistoryUserDto } from './create-history-user.dto';

export class UpdateHistoryUserDto extends PartialType(CreateHistoryUserDto) {}
