import { Test, TestingModule } from '@nestjs/testing';
import { BankService } from './bank.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Bank } from './entities/banck.entity'; 
import { Repository } from 'typeorm';

describe('BankService', () => {
  let service: BankService; // Declara la variable para el servicio
  let repository: Repository<Bank>; 

  // Mock del repositorio con métodos simulados
  const mockBankRepository = {
    find: jest.fn().mockResolvedValue([]), 
    findOne: jest.fn().mockResolvedValue(null), // Devuelve null
    save: jest.fn().mockResolvedValue({}), // Devuelve un objeto vacío
    update: jest.fn().mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] }), // Simula la actualización
    remove: jest.fn().mockResolvedValue({}), // Devuelve un objeto vacío al eliminar
    delete: jest.fn().mockResolvedValue({ affected: 1, raw: {} }), // Simula la eliminación
  };

  beforeEach(async () => {
    // Configura el módulo de pruebas
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BankService,
        {
          provide: getRepositoryToken(Bank), // Proporciona el repositorio simulado
          useValue: mockBankRepository,
        },
      ],
    }).compile();

    service = module.get<BankService>(BankService); // Obtiene la instancia del servicio
    repository = module.get<Repository<Bank>>(getRepositoryToken(Bank)); // Obtiene la instancia del repositorio
  });

  it('should be defined', () => {
    expect(service).toBeDefined(); // Verifica que el servicio esté definido
  });

  it('should find all banks', async () => {
    const result = await service.findAll(); 
    expect(result).toEqual([]); // Verifica que el resultado sea un array vacío
    expect(repository.find).toHaveBeenCalled(); // Verifica que se haya llamado a find
  });

  it('should find a bank by id', async () => {
    const bank = { id: '1', name: 'Bank A', country: 'Country A', phoneNumber: '123456', payMethods: [] };
    jest.spyOn(repository, 'findOne').mockResolvedValue(bank);

    const result = await service.findOne('1'); 
    expect(result).toEqual(bank); // Verifica que el resultado sea el banco simulado
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } }); // Verifica los parámetros
  });

  it('should update a bank', async () => {
    const id = '1';
    const updatedBankDto = { name: 'Updated Bank', country: 'Updated Country', phoneNumber: '987654', payMethods: [] };
    const existingBank = { id, name: 'Bank A', country: 'Country A', phoneNumber: '123456', payMethods: [] };

    jest.spyOn(repository, 'findOne').mockResolvedValue(existingBank); // Simula el banco existente
    jest.spyOn(repository, 'update').mockResolvedValue({ affected: 1, raw: {}, generatedMaps: [] }); // Simula la actualización

    const result = await service.update(id, updatedBankDto); // Llama a update
    expect(result).toEqual({ affected: 1, raw: {}, generatedMaps: [] }); // Verifica el resultado
    expect(repository.update).toHaveBeenCalledWith(id, updatedBankDto); // Verifica los parámetros
  });

  it('should create a new bank', async () => {
    const newBank = { name: 'Bank B', country: 'Country B', phoneNumber: '654321', payMethods: [] };
    const createdBank = { id: '2', ...newBank };
    jest.spyOn(repository, 'save').mockResolvedValue(createdBank); // Simula la creación de un nuevo banco

    const result = await service.create(newBank); // Llama a create
    expect(result).toEqual(createdBank); // Verifica el resultado
    expect(repository.save).toHaveBeenCalledWith(newBank);
  });

  it('should remove a bank', async () => {
    const id = '1';
    const bank = { id, name: 'Bank A', country: 'Country A', phoneNumber: '123456', payMethods: [] };

    jest.spyOn(repository, 'findOne').mockResolvedValue(bank); 
    jest.spyOn(repository, 'remove').mockResolvedValue(bank); 

    const result = await service.remove(id);

    expect(result).toEqual(bank); 
    expect(repository.findOne).toHaveBeenCalledWith({ where: { id } }); 
    expect(repository.remove).toHaveBeenCalledWith(bank); 
  });
});
