import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants/jwt.secretKey';
import { SubcriptionsModule } from '../subcriptions/subcriptions.module';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Module({
  imports: [
    SubcriptionsModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret_key,
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, CloudinaryService],
})
export class AuthModule {}
