// history-user.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Repository } from 'typeorm';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
    let service: UsersService;
    let userRepository: Repository<User>;

    const mockUserRepository = {
        findOne: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockReturnValue({}),
        save: jest.fn().mockResolvedValue({ id: '1', username: 'testUser', role: 'USER' }),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: getRepositoryToken(User),
                    useValue: mockUserRepository,
                },
            ],
        }).compile();

        service = module.get<UsersService>(UsersService);
        userRepository = module.get<Repository<User>>(getRepositoryToken(User));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a new active user', async () => {
        const createActiveUserDto = { id: '1', username: 'testUser', role: 'USER' };

        const result = await service.createActiveUser(createActiveUserDto);
        expect(result).toEqual({ id: '1', username: 'testUser', role: 'USER' });
        expect(userRepository.save).toHaveBeenCalled();
    });

    it('should throw an error if user already exists', async () => {
        mockUserRepository.findOne.mockResolvedValueOnce({ id: '1' }); // Simular que el usuario ya existe

        await expect(service.createActiveUser({ id: '1', username: 'testUser', role: 'USER' })).rejects.toThrow(BadRequestException);
    });
});
