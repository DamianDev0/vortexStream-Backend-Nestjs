import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServices: JwtService,
    private readonly userServices: UsersService,
  ) {}

  async login({ username, password }: LoginDto) {
    const userFound = await this.userServices.findByUsernameWithPassword(
      username,
    );

    if (!userFound) throw new UnauthorizedException('Username not found');

    const isValidPassword = await bcryptjs.compare(
      password,
      userFound.password,
    );

    if (!isValidPassword) throw new UnauthorizedException('Password is wrong');

    const payload = { username: username, role: userFound.role, id: userFound.id };

    const token = await this.jwtServices.signAsync(payload);
    console.log(token);
    
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
    };
  }

  async register(userDto: RegisterDto) {
    const user = await this.userServices.findUserByEmail(userDto.email);
    console.log(userDto);

    if (user) throw new Error('User already exists');

    const profileImageUrl ='https://res.cloudinary.com/dpqbn1gqb/image/upload/v1726014285/avatar_a8uzxz.jpg'

    const hashPassword = await bcryptjs.hash(userDto.password, 10);

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
}
