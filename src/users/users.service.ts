import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from 'src/auth/dto/updateUser.dto';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  private validateOwnerShip(userFound: User, user: ActiveUserInterface){
    if( userFound.id !== user.id){
      throw new UnauthorizedException('You do not have permissions')
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async FindOne(id: string, user: ActiveUserInterface) {
    const userFound = await this.userRepository.findOne({where: {id}})

    if(!userFound) throw new Error('User not found')

      this.validateOwnerShip(userFound, user)
  }

  async findByUsernameWithPassword(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      select: ['id', 'username', 'country', 'password', 'role', 'urlprofile', 'email'],
    });
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: RegisterDto) {
    return await this.userRepository.save(createUserDto);
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto, user: ActiveUserInterface){
    console.log(id, updateUserDto);
    
    await this.FindOne(id, user)

    return await this.userRepository.update(id,{
      ...updateUserDto
    })
  }
}
