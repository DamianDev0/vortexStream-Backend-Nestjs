import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { Subscription } from '../subcriptions/entities/subcription.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ConflictException } from '@nestjs/common';
import * as bcryptjs from 'bcryptjs';
import { User } from '../users/entities/user.entity';
import { Role } from '../common/enum/Roles.enum';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

describe('AuthService', () => {
  let authService: AuthService;
  let userService: UsersService;
  let subscriptionRepository: Repository<Subscription>;

  const mockUserService = {
    findByUsername: jest.fn(),
    findUserByEmail: jest.fn(),
    create: jest.fn(),
    findByUsernameWithPassword: jest.fn(),
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

  describe('login', () => {
    it('should log in a user and return a token and user data', async () => {
      const loginDto: LoginDto = {
        username: 'testUser',
        password: 'testPassword',
      };

      const userFound: User = {
        id: '1',
        username: 'testUser',
        password: await bcryptjs.hash('testPassword', 10),
        email: 'test@example.com',
        country: 'CountryName',
        role: Role.USER,
        urlprofile: 'profileUrl',
        payMethods: [],
        subcription: [],
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const mockSubscription: Subscription = {
        id: 'sub1',
        userId: userFound.id,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'findByUsernameWithPassword').mockResolvedValue(userFound);
      jest.spyOn(mockJwtService, 'signAsync').mockResolvedValue('token123');
      jest.spyOn(subscriptionRepository, 'findOne').mockResolvedValue(mockSubscription);

      const result = await authService.login(loginDto);

      expect(result).toEqual({
        token: 'token123',
        user: {
          id: userFound.id,
          username: userFound.username,
          email: userFound.email,
          country: userFound.country,
          role: userFound.role,
          urlprofile: userFound.urlprofile,
        },
        isPremium: true,
      });
    });

    it('should throw conflict exception if username is not found', async () => {
      const loginDto: LoginDto = {
        username: 'nonExistentUser',
        password: 'testPassword',
      };

      jest.spyOn(userService, 'findByUsernameWithPassword').mockResolvedValue(null);

      await expect(authService.login(loginDto)).rejects.toThrow(ConflictException);
    });

    it('should throw conflict exception if password is wrong', async () => {
      const loginDto: LoginDto = {
        username: 'testUser',
        password: 'wrongPassword',
      };

      const userFound: User = {
        id: '1',
        username: 'testUser',
        password: await bcryptjs.hash('testPassword', 10),
        email: 'test@example.com',
        country: 'CountryName',
        role: Role.USER,
        urlprofile: 'profileUrl',
        payMethods: [],
        subcription: [],
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'findByUsernameWithPassword').mockResolvedValue(userFound);
      jest.spyOn(bcryptjs, 'compare').mockImplementation(async (plaintext: string, hash: string) => false);

      await expect(authService.login(loginDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('register', () => {
    it('should successfully register a user', async () => {
      const registerDto: RegisterDto = {
        username: 'testUser',
        email: 'test@example.com',
        password: 'testPassword',
        status: false,
        country: 'testcountry',
        urlprofile: 'profileUrl',
      };

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(null);
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(null);
      
      const hashedPassword = await bcryptjs.hash(registerDto.password, 10);

      const userToCreate: User = {
        id: 'unique-id',
        username: registerDto.username,
        email: registerDto.email,
        password: hashedPassword,
        country: registerDto.country,
        role: Role.USER,
        urlprofile: registerDto.urlprofile,
        status: registerDto.status,
        payMethods: [],
        subcription: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'create').mockResolvedValue(userToCreate);

      const result = await authService.register(registerDto);

      expect(result).toEqual({
        email: registerDto.email,
        username: registerDto.username,
      });
      
      expect(userService.create).toHaveBeenCalledWith(expect.objectContaining({
        username: registerDto.username,
        email: registerDto.email,
        password: expect.any(String),
        country: registerDto.country,
        role: Role.USER,
        urlprofile: registerDto.urlprofile,
        status: registerDto.status,
        createdAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }));
    });

    it('should throw a conflict exception if the username already exists', async () => {
      const registerDto: RegisterDto = {
        username: 'testUser',
        email: 'test@example.com',
        password: 'testPassword',
        country: 'CountryName',
        status: true,
      };

      const existingUser: User = {
        id: 'unique-id',
        username: registerDto.username,
        email: registerDto.email,
        password: 'hashedPassword',
        country: '',
        role: Role.USER,
        urlprofile: 'profileUrl',
        payMethods: [],
        subcription: [],
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(existingUser);

      await expect(authService.register(registerDto)).rejects.toThrow(ConflictException);
    });

    it('should throw a conflict exception if the email already exists', async () => {
      const registerDto: RegisterDto = {
        username: 'testUser',
        email: 'existing@example.com',
        password: 'testPassword',
        country: '',
        status: false,
      };

      const existingUser: User = {
        id: 'unique-id',
        username: registerDto.username,
        email: registerDto.email,
        password: 'hashedPassword',
        country: '',
        role: Role.USER,
        urlprofile: 'profileUrl',
        payMethods: [],
        subcription: [],
        status: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      jest.spyOn(userService, 'findByUsername').mockResolvedValue(null);
      jest.spyOn(userService, 'findUserByEmail').mockResolvedValue(existingUser);

      await expect(authService.register(registerDto)).rejects.toThrow(ConflictException);
    });
  });
});
