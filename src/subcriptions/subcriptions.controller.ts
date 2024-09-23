import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubcriptionsService } from './subcriptions.service';
import { UpdateSubcriptionDto } from './dto/update-subcription.dto';
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/Roles.enum';
import { ActiveUser } from '../common/decorators/activeUser.decorator';
import { ActiveUserInterface } from '../common/interface/activeUser.interface';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Subcriptions')
@Controller('subcriptions')
export class SubcriptionsController {
  constructor(private readonly subcriptionsService: SubcriptionsService) {}

  @Post()
  create(@Body() id: string) {
    return this.subcriptionsService.create(id);
  }

  @AuthDecorator(Role.ADMIN)
  @Get()
  findAll(@ActiveUser() user: ActiveUserInterface) {
    return this.subcriptionsService.findAll(user);
  }

  @AuthDecorator(Role.USER)
  @Get(':id')
  findOne(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return this.subcriptionsService.findOne(id, user);
  }

  @AuthDecorator(Role.USER)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSubcriptionDto: UpdateSubcriptionDto,
    @ActiveUser() user: ActiveUserInterface,
  ) { 
    return this.subcriptionsService.update(id, updateSubcriptionDto, user);
  }

  @Delete(':id')
  remove(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return this.subcriptionsService.remove(id, user);
  }
}
