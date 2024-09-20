import { Injectable } from '@nestjs/common';
import { CreateHistoryUserDto } from './dto/create-history-user.dto';
import { UpdateHistoryUserDto } from './dto/update-history-user.dto';

@Injectable()
export class HistoryUserService {
  create(createHistoryUserDto: CreateHistoryUserDto) {
    return 'This action adds a new historyUser';
  }

  findAll() {
    return `This action returns all historyUser`;
  }

  findOne(id: number) {
    return `This action returns a #${id} historyUser`;
  }

  update(id: number, updateHistoryUserDto: UpdateHistoryUserDto) {
    return `This action updates a #${id} historyUser`;
  }

  remove(id: number) {
    return `This action removes a #${id} historyUser`;
  }
}
