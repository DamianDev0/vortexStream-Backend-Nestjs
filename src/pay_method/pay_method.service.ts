import { Injectable, NotFoundException } from '@nestjs/common';
import { PayMethodDto } from './dto/create-pay_method.dto';
import { UpdatePayMethodDto } from './dto/update-pay_method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PayMethod } from './entities/pay_method.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PayMethodService {
  constructor(
    @InjectRepository(PayMethod)
    private readonly PayMethodRepository: Repository<PayMethod>,
  ) {}

  // Service to create pay methods
  async create(payMethodDto: PayMethodDto) {
    return await this.PayMethodRepository.save(payMethodDto);
  }

  // Get all pay methods
  async findAll() {
    return await this.PayMethodRepository.find();
  }

  // Get a single pay method by id
  async findOne(id: string) {
    return await this.PayMethodRepository.findOne({
      where: { id },
    });
  }

  // Update a pay method by id
  async update(id: string, updatePayMethodDto: UpdatePayMethodDto) {
    const payMethod = this.PayMethodRepository.findOne({
      where: { id },
    });
    if (!payMethod) {
      throw new NotFoundException(`PayMethod with id ${id} not found`);
    }
    return await this.PayMethodRepository.update(id, updatePayMethodDto);
  }

  // Delete a pay method by id
  async remove(id: string) {
    const payMethod = await this.PayMethodRepository.findOne({
      where: { id },
    });
    if (!payMethod) {
      throw new Error(`PayMethod with id ${id} not found`);
    }
    return await this.PayMethodRepository.remove(payMethod);
  }

  // async searchByUserId(user: string) {
  //   return await this.PayMethodRepository.findOne({
  //     where: { user },
  //     relations: ['bank'],
  //   })
  // }
}
