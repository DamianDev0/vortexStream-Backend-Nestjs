import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findByEmailWithPassword(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      select: ['id', 'email', 'password', 'role'],
    });
  }

  async findUserByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  async create(createUserDto: RegisterDto) {
    console.log(createUserDto);
    
    return await this.userRepository.save(createUserDto);
  }
}
