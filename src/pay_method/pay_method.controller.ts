import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PayMethodService } from './pay_method.service';
import { PayMethodDto } from './dto/create-pay_method.dto';
import { UpdatePayMethodDto } from './dto/update-pay_method.dto';
import { AuthDecorator } from 'src/auth/decorators/auth.decorator';
import { Role } from 'src/common/enum/Roles.enum';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';

@Controller('paymethod')
export class PayMethodController {
  constructor(private readonly payMethodService: PayMethodService) {}

  @AuthDecorator(Role.USER)
  @Post()
  async create(@Body() payMethodDto: PayMethodDto, @ActiveUser() user: ActiveUserInterface) {
    return await this.payMethodService.create(payMethodDto, user);
  }

  // GET /pay-method - Get all pay method
  @AuthDecorator(Role.ADMIN)
  @Get()
  async findAll() {
    return await this.payMethodService.findAll();
  }

  // GET /pay-method/:id - Get a single pay method by ID
  @AuthDecorator(Role.USER)
  @Get(':id')
  async findOne(@Param('id') userId: string, @ActiveUser() user: ActiveUserInterface) {
    console.log(userId);
    
    return await this.payMethodService.findOneByUserId(userId, user);
  }

  // PATCH /pay-method/:id - Update a pay method by ID
  @AuthDecorator(Role.USER)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePayMethodDto: UpdatePayMethodDto,
    @ActiveUser() user: ActiveUserInterface
  ) {
    return await this.payMethodService.update(id, updatePayMethodDto, user);
  }

  // DELETE /pay-method/:id - Delete a pay method by ID
  @Delete(':id')
  async remove(@Param('id') id: string, @ActiveUser() user: ActiveUserInterface) {
    return this.payMethodService.remove(id, user);
  }

  //   @Get('/:user')
  //   async searchByUserId(@Param('user') user: string) {
  //     return await this.payMethodService.searchByUserId(user);
  //   }
}
