import { BadGatewayException, BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';
import { ChangeEmailAndPassword } from './dto/updatePassword&Login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subscription } from 'src/subcriptions/entities/subcription.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Subscription) private readonly subscriptionRepository: Repository<Subscription>,
    private readonly jwtServices: JwtService,
    private readonly userServices: UsersService,
  ) {}

  private async encryptPassword(password: string){
    const hashPassword = await bcryptjs.hash(password, 10)

    return hashPassword
  }

  private comparePasswords(password: string, newPassword: string):  Promise<boolean>{
    const isValidPassword =  bcryptjs.compare(
      newPassword,
      password
    );   

    return isValidPassword
  }

  private async isPremium(userId: string){
    const res = await this.subscriptionRepository.findOne({where: {userId}})
    
    if(!res)throw new BadRequestException('Subscription not found')

    return res.status
  }

  
  async login({ username, password }: LoginDto) {
    const userFound = await this.userServices.findByUsernameWithPassword(
      username,
    );

    if (!userFound) throw new UnauthorizedException('Username not found');

    const isValidPassword = await bcryptjs.compare(password, userFound.password)
    console.log(isValidPassword);
    

    if (!isValidPassword) throw new UnauthorizedException('Password is wrong');

    const payload = { username: username, role: userFound.role, id: userFound.id };

    const token = await this.jwtServices.signAsync(payload);
    const statusSubscription = await this.isPremium(userFound.id)
    
    return {
      token,
      user: {
        id: userFound.id,
        username: userFound.username,
        email: userFound.email,
        country: userFound.country,
        role: userFound.role,
        urlprofile: userFound.urlprofile
      },
      isPremium: statusSubscription
    };
  }

  async register(userDto: RegisterDto) {
    const user = await this.userServices.findUserByEmail(userDto.email);
    console.log(userDto);

    if (user) throw new Error('User already exists');

    const profileImageUrl ='https://res.cloudinary.com/dpqbn1gqb/image/upload/v1726014285/avatar_a8uzxz.jpg'

    const hashPassword = await this.encryptPassword(userDto.password)

    await this.userServices.create({
      ...userDto,
      password: hashPassword,
      urlprofile: profileImageUrl
    });

    return {
      email: userDto.email,
      username: userDto.username,
    };
  }

  async changePassword(id: string, changeEmailAndPasswordDto: ChangeEmailAndPassword , user: ActiveUserInterface){
    const userFound = await this.userServices.findOneWithPasswordAndEmail(id, user)

    const validatePassword = await this.comparePasswords(userFound.password, changeEmailAndPasswordDto.password)

    if(validatePassword === true) throw new BadRequestException('The new password has not be same a old password')

    if (changeEmailAndPasswordDto.password) {
      const hashedPassword = await this.encryptPassword(changeEmailAndPasswordDto.password);
      // Reemplazar la contraseña en el DTO por la versión encriptada
      changeEmailAndPasswordDto.password = hashedPassword;
    }
    
    if(!userFound) throw new BadRequestException('User not found')

    return await this.userServices.changePassword(id, changeEmailAndPasswordDto)
  }

  async changeEmail(id: string, changeEmailAndPasswordDto: ChangeEmailAndPassword , user: ActiveUserInterface){
    const userFound = await this.userServices.findOneWithPasswordAndEmail(id, user)
    
    if(!userFound) throw new BadRequestException('User not found')

    return await this.userServices.changeEmail(id, changeEmailAndPasswordDto)
  }
}
