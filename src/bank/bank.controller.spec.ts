import { Test, TestingModule } from '@nestjs/testing';
import { BankController } from './bank.controller';
import { BankService } from './bank.service';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '../auth/guard/auth.guard';
import { BankDto } from './dtos/create-bank.dto';

describe('BankController', () => {
  let controller: BankController;
  let service: BankService;

  beforeEach(async () => {
    const mockBankService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
      searchByCountry: jest.fn(),
      searchByName: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [BankController],
      providers: [
        {
          provide: BankService,
          useValue: mockBankService,
        },
        JwtService,
        {
          provide: AuthGuard,
          useValue: {
            canActivate: jest.fn(() => true),
          },
        },
      ],
    }).compile();

    controller = module.get<BankController>(BankController);
    service = module.get<BankService>(BankService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a bank and return the created bank', async () => {
      const bankDto: BankDto = { name: 'Test Bank', country: 'Test Country', phoneNumber: '1234567890' };
      const createdBank = { id: '1', ...bankDto };
      jest.spyOn(service, 'create').mockResolvedValue(createdBank);

      const result = await controller.create(bankDto);
      expect(result).toEqual({ id: '1', ...bankDto });
      expect(service.create).toHaveBeenCalledWith(bankDto);
    });
  });

  describe('findAll', () => {
    it('should return an array of banks', async () => {
      const result = [{ id: '1', name: 'Test Bank', country: 'Test Country', phoneNumber: '1234567890' }];
      jest.spyOn(service, 'findAll').mockResolvedValue(result);

      expect(await controller.findAll()).toBe(result);
    });
  });

  describe('findOne', () => {
    it('should return a bank by id', async () => {
      const result = { id: '1', name: 'Test Bank', country: 'Test Country', phoneNumber: '1234567890' };
      jest.spyOn(service, 'findOne').mockResolvedValue(result);

      expect(await controller.findOne('1')).toBe(result);
    });
  });

  describe('remove', () => {
    it('should remove a bank and return a confirmation', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(undefined);

      expect(await controller.remove('1')).toBeUndefined();
      expect(service.remove).toHaveBeenCalledWith('1');
    });
  });

  describe('searchByCountry', () => {
    it('should return banks by country', async () => {
      const result = [{ id: '1', name: 'Test Bank', country: 'Test Country', phoneNumber: '1234567890' }];
      jest.spyOn(service, 'searchByCountry').mockResolvedValue(result);

      expect(await controller.searchByCountry('Test Country')).toBe(result);
      expect(service.searchByCountry).toHaveBeenCalledWith('Test Country');
    });
  });

  describe('searchByName', () => {
    it('should return banks by name', async () => {
      const result = [{ id: '1', name: 'Test Bank', country: 'Test Country', phoneNumber: '1234567890' }];
      jest.spyOn(service, 'searchByName').mockResolvedValue(result);

      expect(await controller.searchByName('Test Bank')).toBe(result);
      expect(service.searchByName).toHaveBeenCalledWith('Test Bank');
    });
  });
});
