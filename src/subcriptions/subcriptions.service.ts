import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateSubcriptionDto } from './dto/create-subcription.dto';
import { UpdateSubcriptionDto } from './dto/update-subcription.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Subscription } from './entities/subcription.entity';
import { Repository } from 'typeorm';
import { ActiveUserInterface } from '../common/interface/activeUser.interface';
import { Role } from '../common/enum/Roles.enum';
import { User } from '../users/entities/user.entity';

@Injectable()
export class SubcriptionsService {
  constructor(
    @InjectRepository(Subscription) private readonly suscriptionRepository: Repository<Subscription>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}

  private validateOwnerShip(subscription: Subscription, user: ActiveUserInterface){
    if( subscription.userId !== user.id ){
      throw new UnauthorizedException('You do not have permissions')
    }

    return subscription
  }

  private adminGuard(user: ActiveUserInterface){
    if(user.role !== Role.ADMIN){
      return false 
    }

    return true
  }

  async create(userId: string) {
    const user = await this.userRepository.findOne({ where: { id: userId } });
    
    if (!user) {
      throw new BadRequestException('User not found');
    }

    const newSubscription = this.suscriptionRepository.create({
      user: user,  
    });

    return await this.suscriptionRepository.save(newSubscription);
  }

  async findAll(user: ActiveUserInterface) {
    const guard = this.adminGuard(user)

    if(!guard) throw new UnauthorizedException("You don't have permissions")

    return await this.suscriptionRepository.find();
  }

  async findOne(id: string, user: ActiveUserInterface) {
    const subscription = await this.suscriptionRepository.findOne({where: {userId: id}}) 

    if(!subscription) throw new BadRequestException('Subscription not found')

    return this.validateOwnerShip(subscription, user);
  }

  async update(id: string, updateSubcriptionDto: UpdateSubcriptionDto, user: ActiveUserInterface) {
    const subcriptionFound = await this.findOne(id, user)
    
    return await this.suscriptionRepository.update(subcriptionFound.id,{
      ...updateSubcriptionDto
    });
  }

  remove(id: string, user: ActiveUserInterface) {
    if(id !== user.id) throw new UnauthorizedException("You dont have permissions")

    return this.suscriptionRepository.delete(id);
  }
}
