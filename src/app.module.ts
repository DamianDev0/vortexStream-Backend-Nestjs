import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [
    // Configuración de ConfigModule para cargar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // Configuración de TypeOrmModule para conectar a la base de datos PostgreSQL

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, //quitar en produccion
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UsersController, AuthController],
  providers: [UsersService, AuthService],
})
export class AppModule {}
