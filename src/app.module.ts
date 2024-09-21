import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module'; // Import UsersModule
import { BankModule } from './bank/bank.module';
import { AuthModule } from './auth/auth.module';
import { PayMethodModule } from './pay_method/pay_method.module';
import { CloudinaryModule } from './common/cloudinary/cloudinary.module';
import { SubcriptionsModule } from './subcriptions/subcriptions.module';
import { FavoriteModule } from './favorite/favorite.module';
import { HistoryUserModule } from './history-user/history-user.module';

@Module({
  imports: [
    // ConfigModule for environment variables
    ConfigModule.forRoot({
      isGlobal: true,
    }),

    // TypeOrmModule for Mysql connection
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USER'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Make sure this resolves correctly
        synchronize: false, // Disable this in production for safety
      }),
      inject: [ConfigService],
    }),

    // Importing UsersModule
    UsersModule,
    AuthModule,
    BankModule,
    PayMethodModule,
    CloudinaryModule,
    SubcriptionsModule,
    FavoriteModule,
    HistoryUserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
