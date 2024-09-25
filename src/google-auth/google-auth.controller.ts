import { Body, Controller, Post } from '@nestjs/common';
import { GoogleAuthService } from './google-auth.service';
import { RegisterDto } from '../auth/dto/register.dto';

@Controller('google-auth')
export class GoogleAuthController {
    constructor(private readonly googleAuthService: GoogleAuthService){}

    @Post('register')
    googleAuthCreated(
        @Body()
        registerDto: RegisterDto
    ){
        return this.googleAuthService.googleAuthCreated(registerDto)
    }
}
