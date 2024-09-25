import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdateUserDto } from '../auth/dto/updateUser.dto';
import { ActiveUserInterface } from '../common/interface/activeUser.interface';
import { ChangeEmailAndPassword } from '../auth/dto/updatePassword&Login.dto';
import { SubcriptionsService } from '../subcriptions/subcriptions.service';
import { CloudinaryService } from 'src/common/cloudinary/cloudinary.service';

@Injectable()
export class UsersService {
  createActiveUser(createActiveUserDto: { id: string; username: string; role: string; }) {
    throw new Error('Method not implemented.');

  }
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly subscriptionServices: SubcriptionsService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

  private validateOwnerShip(userFound: User, user: ActiveUserInterface) {
    if (userFound.id !== user.id) {
      throw new UnauthorizedException('You do not have permissions');
    }

    return userFound;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async FindOne(id: string, user: ActiveUserInterface) {
    const userFound = await this.userRepository.findOne({ where: { id } });

    if (!userFound) throw new Error('User not found');

    return this.validateOwnerShip(userFound, user);
  }

  async findOneWithPasswordAndEmail(id: string, user: ActiveUserInterface) {
    const userFound = await this.userRepository.findOne({
      where: { id },
      select: ['id', 'password', 'email'],
    });

    if (!userFound) throw new Error('User not found hp');

    return this.validateOwnerShip(userFound, user);
  }

  async findByUsernameWithPassword(username: string) {
    return await this.userRepository.findOne({
      where: { username },
      select: [
        'id',
        'username',
        'country',
        'password',
        'role',
        'prefixCountry',
        'urlprofile',
        'email',
      ],
    });
  }

  async findUserByEmail(email: string) {
    return await this.userRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string) {
    return await this.userRepository.findOne({ where: { username } })
  }

  async create(createUserDto: RegisterDto) {
    const userCreated = this.userRepository.create(createUserDto);

    await this.userRepository.save(userCreated);
    await this.subscriptionServices.create(userCreated.id);

    return userCreated
  }


  async updateUser(
    id: string,
    updateUserDto: UpdateUserDto,
    user: ActiveUserInterface,
    file?: Express.Multer.File,
  ) {
    if (!user) {
      throw new UnauthorizedException('User not authenticated');
    }

    const res = await this.userRepository.findOne({ where: { id } });
    if (!res) {
      throw new UnauthorizedException('User not found');
    }

    if (file) {
      const uploadResult = await this.cloudinaryService.uploadFile(file);
      updateUserDto.urlprofile = uploadResult.secure_url;
    }

    const updateResult = await this.userRepository.update(id, {
      ...updateUserDto,
    });

    return updateResult;
  }

  async changePassword(
    id: string,
    changeEmailAndPasswordDto: ChangeEmailAndPassword,
  ) {
    if (!changeEmailAndPasswordDto.password) {
      throw new BadRequestException('Password is required');
    }

    return await this.userRepository.update(id, {
      ...changeEmailAndPasswordDto,
      password: changeEmailAndPasswordDto.password,
    });
  }

  async changeEmail(
    id: string,
    changeEmailAndPasswordDto: ChangeEmailAndPassword,
  ) {
    if (!changeEmailAndPasswordDto.email) {
      throw new BadRequestException('Email is required');
    }

    return await this.userRepository.update(id, {
      ...changeEmailAndPasswordDto,
      email: changeEmailAndPasswordDto.email,
    });
  }  
}
