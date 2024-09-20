import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoryUserService } from './history-user.service';
import { CreateHistoryUserDto } from './dto/create-history-user.dto';
import { UpdateHistoryUserDto } from './dto/update-history-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enum/Roles.enum';

@ApiTags('HistoryUser')
@AuthDecorator(Role.USER)
@Controller('history-user')
export class HistoryUserController {
  constructor(private readonly historyUserService: HistoryUserService) {}

  @Post()
  async create(
    @Body() createHistoryUserDto: CreateHistoryUserDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return await this.historyUserService.create(createHistoryUserDto, user);
  }

  @Get('getAll/:id')
  async findAll(
    @Param('id') userId: string,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return await this.historyUserService.findAll(userId, user);
  }

  @Get('findOne/:id')
  async findOne(
    @Param('id') mediaId: string,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return await this.historyUserService.findOne(mediaId, user);
  }

  @Patch(':id')
  async update(
    @Param('id') mediaId: string,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return await this.historyUserService.update(mediaId, user);
  }

  @Delete(':id')
  async remove(
    @Param('id') mediaId: string,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return await this.historyUserService.remove(mediaId, user);
  }
}
