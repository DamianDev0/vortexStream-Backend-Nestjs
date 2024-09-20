import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { HistoryUserService } from './history-user.service';
import { CreateHistoryUserDto } from './dto/create-history-user.dto';
import { UpdateHistoryUserDto } from './dto/update-history-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('HistoryUser')
@Controller('history-user')
export class HistoryUserController {
  constructor(private readonly historyUserService: HistoryUserService) {}

  @Post()
  create(@Body() createHistoryUserDto: CreateHistoryUserDto) {
    return this.historyUserService.create(createHistoryUserDto);
  }

  @Get()
  findAll() {
    return this.historyUserService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateHistoryUserDto: UpdateHistoryUserDto) {
    return this.historyUserService.update(+id, updateHistoryUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyUserService.remove(+id);
  }
}
