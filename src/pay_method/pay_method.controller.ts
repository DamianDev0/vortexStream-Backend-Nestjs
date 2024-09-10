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

@Controller('pay-method')
export class PayMethodController {
  constructor(private readonly payMethodService: PayMethodService) {}

  // POST /pay-method - Create a new pay method
  @Post()
  async create(@Body() payMethodDto: PayMethodDto) {
    return await this.payMethodService.create(payMethodDto);
  }

  // GET /pay-method - Get all pay method
  @Get()
  async findAll() {
    return await this.payMethodService.findAll();
  }

  // GET /pay-method/:id - Get a single pay method by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.payMethodService.findOne(id);
  }

  // PATCH /pay-method/:id - Update a pay method by ID
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePayMethodDto: UpdatePayMethodDto,
  ) {
    return await this.payMethodService.update(id, updatePayMethodDto);
  }

  // DELETE /pay-method/:id - Delete a pay method by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.payMethodService.remove(id);
  }

  //   @Get('/:user')
  //   async searchByUserId(@Param('user') user: string) {
  //     return await this.payMethodService.searchByUserId(user);
  //   }
}
