import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { BankService } from './bank.service';
import { BankDto } from './dtos/create-bank.dto';
import { UpdateBankDto } from './dtos/update-bank.dto';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  // POST /bank - Create a new bank
  @Post()
  async create(@Body() bankDto: BankDto) {
    return await this.bankService.create(bankDto);
  }

  // GET /bank - Get all banks
  @Get()
  async findAll() {
    return await this.bankService.findAll();
  }

  // GET /bank/:id - Get a single bank by ID
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bankService.findOne(id);
  }

  // PATCH /bank/:id - Update a bank by ID
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return await this.bankService.update(id, updateBankDto);
  }

  // DELETE /bank/:id - Delete a bank by ID
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bankService.remove(id);
  }

  // GET /bank/country/:country - Search banks by country
  @Get('/:country')
  async searchByCountry(@Param('country') country: string) {
    return await this.bankService.searchByCountry(country);
  }

  // GET /bank/name/:name - Search banks by name
  @Get('/:name')
  async searchByName(@Param('name') name: string) {
    return await this.bankService.searchByName(name);
  }
}
