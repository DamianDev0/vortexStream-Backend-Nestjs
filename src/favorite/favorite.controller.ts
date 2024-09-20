import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FavoriteService } from './favorite.service';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/Roles.enum';
import { ActiveUser } from '../common/decorators/activeUser.decorator';
import { ActiveUserInterface } from '../common/interface/activeUser.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Favorite')
@Controller('favorite')
export class FavoriteController {
  constructor(private readonly favoriteService: FavoriteService) {}

  @AuthDecorator(Role.USER)
  @Post()
  async create(@Body() createFavoriteDto: CreateFavoriteDto, @ActiveUser() user: ActiveUserInterface) {
    
    return await this.favoriteService.create(createFavoriteDto, user);
  }

  @AuthDecorator(Role.USER)
  @Get()
  async findAll(@ActiveUser() user: ActiveUserInterface) {
    return await this.favoriteService.findAll(user);
  }

  @AuthDecorator(Role.USER)
  @Get(':id')
  async findOne(@Param('id') mediaId: string, @ActiveUser() user: ActiveUserInterface){
    return await this.favoriteService.findOne(mediaId, user)
  }

  @AuthDecorator(Role.USER)
  @Delete(':id')
  async remove(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return await this.favoriteService.remove(id, user);
  }
}
