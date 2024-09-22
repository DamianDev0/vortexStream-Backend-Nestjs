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
import { AuthDecorator } from '../auth/decorators/auth.decorator';
import { Role } from '../common/enum/Roles.enum';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Banks')
@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  // POST /bank - Create a new bank
  @AuthDecorator(Role.ADMIN)
  @Post()
  async create(@Body() bankDto: BankDto) {
    const createdBank = await this.bankService.create(bankDto);
    return { id: createdBank.id, ...bankDto }; // Asegúrate de incluir el ID
  }

  // GET /bank - Get all banks
  @Get()
  async findAll() {
    return await this.bankService.findAll();
  }

  // GET /bank/:id - Get a single bank by ID
  @AuthDecorator(Role.ADMIN)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.bankService.findOne(id);
  }

  // PATCH /bank/:id - Update a bank by ID
  @AuthDecorator(Role.ADMIN)
  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateBankDto: UpdateBankDto) {
    return await this.bankService.update(id, updateBankDto);
  }

  // DELETE /bank/:id - Delete a bank by ID
  @AuthDecorator(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.bankService.remove(id);
  }

  // GET /bank/country/:country - Search banks by country
  @AuthDecorator(Role.ADMIN)
  @Get('/:country')
  async searchByCountry(@Param('country') country: string) {
    return await this.bankService.searchByCountry(country);
  }

  // GET /bank/name/:name - Search banks by name
  @AuthDecorator(Role.ADMIN)
  @Get('/:name')
  async searchByName(@Param('name') name: string) {
    return await this.bankService.searchByName(name);
  }
}
