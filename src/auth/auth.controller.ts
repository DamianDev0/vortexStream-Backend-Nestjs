import { Controller, Post, Body, Get, Patch, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { ActiveUser } from 'src/common/decorators/activeUser.decorator';
import { Role } from 'src/common/enum/Roles.enum';
import { AuthDecorator } from './decorators/auth.decorator';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ActiveUserInterface } from 'src/common/interface/activeUser.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly userServices: UsersService
  ) {}

  @Post('register')
  register(
    @Body()
    registerDto: RegisterDto,
  ) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(
    @Body()
    loginDto: LoginDto,
  ) {
    return this.authService.login(loginDto);
  }

  @AuthDecorator(Role.ADMIN)
  @Get('allUser')
  findUsers(){
    return this.userServices.findAll()
  }

  @AuthDecorator(Role.USER)
  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto, @ActiveUser() user: ActiveUserInterface ){
    console.log(updateUserDto, id);
    
    return this.userServices.updateUser(id, updateUserDto, user )
  }
}
