import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from './entities/banck.entity';
import { Repository } from 'typeorm';
import { BankDto } from './dtos/create-bank.dto';
import { UpdateBankDto } from './dtos/update-bank.dto';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>,
  ) {}

  // Service to create a new bank entry using the provided DTO (Data Transfer Object)
  async create(bankDto: BankDto) {
    return await this.bankRepository.save(bankDto);
  }

  // Retrieves all bank entries from the repository
  async findAll() {
    return await this.bankRepository.find();
  }

  // Finds a single bank entry by its ID
  async findOne(id: string) {
    return await this.bankRepository.findOne({
      where: { id },
    });
  }

  // Updates a bank entry by ID using the provided updated data
  async update(id: string, updatedBankDto: UpdateBankDto) {
    const bank = await this.bankRepository.findOne({
      where: { id },
    });
    if (!bank) {
      throw new NotFoundException(`Bank with id ${id} not found`);
    }
    return await this.bankRepository.update(id, updatedBankDto);
  }

  // Removes a bank entry by ID if found
  async remove(id: string) {
    const bank = await this.bankRepository.findOne({
      where: { id },
    });

    if (!bank) {
      throw new Error(`Bank with id ${id} not found`);
    }
    return await this.bankRepository.remove(bank);
  }

  // Searches for banks based on the provided country name
  async searchByCountry(country: string) {
    return await this.bankRepository.find({
      where: { country },
    });
  }

  // Searches for banks based on the provided bank name
  async searchByName(name: string) {
    return await this.bankRepository.find({
      where: { name },
    });
  }
}
