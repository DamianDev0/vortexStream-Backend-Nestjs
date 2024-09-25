import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginDto } from 'src/auth/dto/login.dto';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { Subscription } from 'src/subcriptions/entities/subcription.entity';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly userServices: UsersService,
    private readonly jwtServices: JwtService,
    @InjectRepository(Subscription)
    private readonly subscriptionRepository: Repository<Subscription>,
  ) {}

  private async isPremium(userId: string) {
    const res = await this.subscriptionRepository.findOne({
      where: { userId },
    });

    if (!res) throw new BadRequestException('Subscription not found');

    return res.status;
  }

  private async googleLogin(userFound: User ) {

    const payload = {
      username: userFound.username,
      role: userFound.role,
      id: userFound.id,
    };

    const token = await this.jwtServices.signAsync(payload);
    const statusSubscription = await this.isPremium(userFound.id);
 
      return {
        token,
        user: {
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
          role: userFound.role,
          country: userFound.country,
          status: statusSubscription,
          urlprofile: userFound.urlprofile,
        },
        isPremium: statusSubscription,
      };
    
  }

  async googleAuthCreated(googleAuth: RegisterDto) {
    const userFound = await this.userServices.findByUsername(googleAuth.username)

    if(userFound){
        return this.googleLogin(userFound)
    }

    const userFoundByEmail = await this.userServices.findUserByEmail(googleAuth.email)

    if(userFoundByEmail){
        return this.googleLogin(userFoundByEmail)
    }

    const profileImageUrl =
      'https://res.cloudinary.com/dpqbn1gqb/image/upload/v1726014285/avatar_a8uzxz.jpg';

    await this.userServices.create({
      ...googleAuth,
      urlprofile: profileImageUrl,
    });

    return this.googleLogin(userFound)
  }
}
