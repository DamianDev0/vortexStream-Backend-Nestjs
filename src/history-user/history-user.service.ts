import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateHistoryUserDto } from './dto/create-history-user.dto';
import { UpdateHistoryUserDto } from './dto/update-history-user.dto';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HistoryUser } from './entities/history-user.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class HistoryUserService {
  constructor(
    @InjectRepository(HistoryUser) private readonly historyUserRepository: Repository<HistoryUser>,
    @InjectRepository(User) private readonly userRepository: Repository<User>
  ){}

  private validateOwnerShip(userId: string, user: ActiveUserInterface){
    if(userId !== user.id ){
      throw new UnauthorizedException('You do not have permissions')
    }
  }
  
  async create(createHistoryUserDto: CreateHistoryUserDto, user: ActiveUserInterface) {
    const userFound = await this.userRepository.findOne({where: {id: createHistoryUserDto.userId}})

    if(!userFound) throw new BadRequestException('User not Found')

    this.validateOwnerShip(userFound.id, user) 

    return await this.historyUserRepository.save(createHistoryUserDto)
  }

  async findAll(user: ActiveUserInterface) {
    return this.historyUserRepository.find({where: {userId: user.id}});
  }

  async findOne(mediaId: string, user: ActiveUserInterface) {
    const historyUser = await this.historyUserRepository.findOne({where : {mediaId: mediaId, userId: user.id}})

    this.validateOwnerShip(historyUser.userId, user )
    return historyUser;
  }

  async update(mediaId: string, user: ActiveUserInterface) {
    const historyUserFound = await this.findOne(mediaId, user)
    
    if(!historyUserFound) throw new BadRequestException('History uswr Not found')

     historyUserFound.updatedAt = new Date() 
    return await this.historyUserRepository.update(historyUserFound.id, historyUserFound);
  }

  async remove(mediaId: string, user: ActiveUserInterface) {
    const hsitoryFound = await this.findOne(mediaId, user)

    this.validateOwnerShip(hsitoryFound.userId, user)
    
    return await this.historyUserRepository.remove(hsitoryFound);
  }
}
