import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Subscription } from '../subcriptions/entities/subcription.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { Role } from '../common/enum/Roles.enum';
import { RegisterDto } from './dto/register.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let subscriptionRepository: Repository<Subscription>;

  const mockUserService = {
    findByUsernameWithPassword: jest.fn(),
    findUserByEmail: jest.fn(),
    create: jest.fn(),
    findOneWithPasswordAndEmail: jest.fn(),
    changePassword: jest.fn(),
    changeEmail: jest.fn(),
  };

  const mockJwtService = {
    signAsync: jest.fn(),
  };

  const mockSubscriptionRepository = {
    findOne: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: getRepositoryToken(Subscription),
          useValue: mockSubscriptionRepository,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
    userService = module.get<UsersService>(UsersService);
    subscriptionRepository = module.get<Repository<Subscription>>(getRepositoryToken(Subscription));
  });

  describe('register', () => {
    it('should register a new user and return user data', async () => {
      const userDto: RegisterDto = {
        email: 'test@example.com',
        username: 'testUser',
        password: 'testPassword',
        country: 'CountryName', 
        status: true, 
        urlprofile: 'profileUrl', 
      };

      // Simulando el retorno de la función findUserByEmail
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(null);
      
      const createdUser: User = {
        id: '1', // Agrega un ID simulado
        ...userDto, // Incluye las propiedades de userDto
        role: Role.USER, // Asegúrate de incluir el rol
        password: await bcryptjs.hash(userDto.password, 10), 
        createdAt: new Date(),
        updatedAt: new Date(),
        payMethods: [],
        subcription: [],
      };

      jest.spyOn(userService, 'create').mockResolvedValue(createdUser);

      const result = await authService.register(userDto);

      expect(result).toEqual({
        email: userDto.email,
        username: userDto.username,
      });
    });

  });


});
