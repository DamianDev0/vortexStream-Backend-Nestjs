import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PayMethodDto } from './dto/create-pay_method.dto';
import { UpdatePayMethodDto } from './dto/update-pay_method.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PayMethod } from './entities/pay_method.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { BankService } from 'src/bank/bank.service';

@Injectable()
export class PayMethodService {
  constructor(
    @InjectRepository(PayMethod)
    private readonly PayMethodRepository: Repository<PayMethod>,
    private readonly bankServices: BankService
  ) {}

  private validateOwnerShip(payMethod: PayMethodDto, user: ActiveUserInterface){
    if( payMethod.userId !== user.id ){
      throw new UnauthorizedException('You do not have permissions')
    }

    return payMethod
  }

  // Service to create pay methods
  async create(payMethodDto: PayMethodDto, user: ActiveUserInterface) {
    console.log(payMethodDto);
    
    const bankFound = await this.bankServices.findOne(payMethodDto.bankId)

    if(!bankFound) throw new BadRequestException('Bank not found')
    
    this.validateOwnerShip(payMethodDto, user)

    const payMethod = {
      ...payMethodDto,
      bankId: bankFound.id
    }
    return await this.PayMethodRepository.save(payMethod);
  }

  // Get all pay methods
  async findAll() {
    return await this.PayMethodRepository.find();
  }

  // Get a single pay method by id
  async findOne(id: string, user: ActiveUserInterface) {
    const payMethod = await this.PayMethodRepository.findOne({
      where: { id },
    });
    
    if(!payMethod) throw new BadRequestException('PayMethod not found')

    return this.validateOwnerShip(payMethod, user)
  }


    // Get a single pay method by id
    async findOneByUserId(userId: string, user: ActiveUserInterface) {
      const payMethod = await this.PayMethodRepository.findOne({
        where: { userId: userId },
      });
   
      
      if(!payMethod) throw new BadRequestException('PayMethod not found')
  
      return this.validateOwnerShip(payMethod, user)
    }

  // Update a pay method by id
  async update(userId: string, updatePayMethodDto: UpdatePayMethodDto, user: ActiveUserInterface) {
    const payMethod = await this.findOneByUserId(userId, user);
    console.log(updatePayMethodDto);
    
    
    if (!payMethod) {
      throw new NotFoundException(`PayMethod with id ${userId} not found`);
    }

    return await this.PayMethodRepository.update(payMethod, {
      ...updatePayMethodDto
    });
  }

  // Delete a pay method by id
  async remove(id: string, user: ActiveUserInterface) {
    if(id !== user.id) throw new UnauthorizedException("You don't have permissions")
    return await this.PayMethodRepository.delete(id);
  }

  // async searchByUserId(user: string) {
  //   return await this.PayMethodRepository.findOne({
  //     where: { user },
  //     relations: ['bank'],
  //   })
  // }
}
