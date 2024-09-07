import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from '../users/users.service';
import * as bcryptjs from 'bcryptjs';
import { Role } from 'src/common/enum/Roles.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServices: JwtService,
    private readonly userServices: UsersService,
  ) {}

  async login(user: LoginDto) {
    const userFound = await this.userServices.findByEmailWithPassword(
      user.username,
    );

    if (!userFound) throw new UnauthorizedException('Username not found');

    const isValidPassword = await bcryptjs.compare(
      user.password,
      userFound.password,
    );

    if (!isValidPassword) throw new UnauthorizedException('Password is wrong');

    const payload = { username: user.username, role: userFound.role };

    const token = await this.jwtServices.signAsync(payload);

    return {
      token,
      userFound,
    };
  }

  async register(userDto: RegisterDto) {
    const user = await this.userServices.findUserByEmail(userDto.email);
    console.log(userDto);
    
    if (user) throw new Error('User already exists');

    const hashPassword = await bcryptjs.hash(userDto.password, 10);

    await this.userServices.create({
      ...userDto,
      password: hashPassword,
      role: Role.USER, // valor por defecto si no se pasa
      status: true,
    });

    return userDto.email, userDto.username;
  }
}
