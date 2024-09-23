import { Controller, Post, Body, Get, Patch, Param, UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { UsersService } from '../users/users.service';
import { ActiveUser } from '../common/decorators/activeUser.decorator';
import { Role } from '../common/enum/Roles.enum';
import { AuthDecorator } from './decorators/auth.decorator';
import { UpdateUserDto } from './dto/updateUser.dto';
import { ActiveUserInterface } from '../common/interface/activeUser.interface';
import { ChangeEmailAndPassword } from './dto/updatePassword&Login.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userServices: UsersService,
    private readonly cloudinaryService: CloudinaryService
  ) { }

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
  findUsers() {
    return this.userServices.findAll();
  }

  @AuthDecorator(Role.USER)
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.userServices.updateUser(id, updateUserDto, user);
  }

  @AuthDecorator(Role.USER)
  @Get('findoneuser/:id')
  findOneUserById(
    @Param('id') id: string,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.userServices.FindOne(id, user);
  }

  @AuthDecorator(Role.USER)
  @Patch('changepassword/:id')
  updatePassword(
    @Param('id') id: string,
    @Body() changeEmailAndPasswordDto: ChangeEmailAndPassword,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.authService.changePassword(id, changeEmailAndPasswordDto, user);
  }

  @AuthDecorator(Role.USER)
  @Patch('changeemail/:id')
  updateEmail(
    @Param('id') id: string,
    @Body() changeEmailAndPasswordDto: ChangeEmailAndPassword,
    @ActiveUser() user: ActiveUserInterface,
  ) {
    return this.authService.changeEmail(id, changeEmailAndPasswordDto, user);
  }

  @AuthDecorator(Role.USER)
  @Patch('changeuserinfo/:id')
  @UseInterceptors(FileInterceptor('profileimage'))
  async UpdateUserWithImage(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @ActiveUser() user: ActiveUserInterface,
    @UploadedFile() file: Express.Multer.File,
  ) {

    return await this.userServices.updateUser(id, updateUserDto, user, file);
  }


}
