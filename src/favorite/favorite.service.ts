import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { UpdateFavoriteDto } from './dto/update-favorite.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Favorite } from './entities/favorite.entity';
import { Repository } from 'typeorm';
import { BadGatewayException, Injectable, UnauthorizedException } from '@nestjs/common';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class FavoriteService {
  constructor(@InjectRepository(Favorite) private readonly favoriteRepository: Repository<Favorite>,
  @InjectRepository(User) private readonly userRepository: Repository<User>){}
  
  private validateOwnerShip(userId: string, user: ActiveUserInterface){
    if(userId !== user.id ){
      throw new UnauthorizedException('You do not have permissions')
    }
  }

  async create(createFavoriteDto: CreateFavoriteDto, user: ActiveUserInterface) {
    const userFound = await this.userRepository.findOne({where : {id: createFavoriteDto.userId}})

    if(!userFound) throw new BadGatewayException('User not found')

    this.validateOwnerShip(userFound.id, user)
    
    return await this.favoriteRepository.save(createFavoriteDto);
  }

  async findOne(mediaId: string, user: ActiveUserInterface){
    const favoriteFound = await this.favoriteRepository.findOne({where: {mediaId: mediaId, userId: user.id}})

    if(!favoriteFound) throw new BadGatewayException('Favorite not found')

    this.validateOwnerShip(favoriteFound.userId, user)

    return favoriteFound
  }

  async findAll(user: ActiveUserInterface){
    return await this.favoriteRepository.find({where: {userId: user.id}});
  }

  async remove(id: string, user: ActiveUserInterface) {
    const favoriteFound = await this.favoriteRepository.findOne({where: {id}})
    
    this.validateOwnerShip(favoriteFound.userId, user)
  
    return await this.favoriteRepository.remove(favoriteFound);
  }
}
