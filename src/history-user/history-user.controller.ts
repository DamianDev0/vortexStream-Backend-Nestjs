import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
} from '@nestjs/common';
import { HistoryUserService } from './history-user.service';
import { CreateHistoryUserDto } from './dto/create-history-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enum/Roles.enum';

@ApiTags('HistoryUser')
@AuthDecorator(Role.USER)
@Controller('historyuser')
export class HistoryUserController {
  constructor(private readonly historyUserService: HistoryUserService) {}

  @Post()
  async create(
    @Body() createHistoryUserDto: CreateHistoryUserDto,
    @ActiveUser() user: ActiveUserInterface,
  ) { 
    return await this.historyUserService.createOrUpdate(createHistoryUserDto, user);
  }

  @Get()
  async findAll(
    @ActiveUser() user: ActiveUserInterface,
  ) {
    console.log(user);
    
    return await this.historyUserService.findAll(user);
  }

  @Get('findOne/:id')
  async findOne(
    @Param('id') mediaId: string,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return await this.historyUserService.findOne(mediaId, user);
  }

  @Delete(':id')
  async remove(
    @Param('id') mediaId: string,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return await this.historyUserService.remove(mediaId, user);
  }
}
