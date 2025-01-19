const EggCollectionService = require('../../src/services/EggCollectionService');
const EggRepository = require('../../src/repositories/EggRepository');
const Egg = require('../../src/models/Egg');

jest.mock('../../src/repositories/EggRepository', () => {
  return jest.fn().mockImplementation(() => ({
    save: jest.fn(),
    findAll: jest.fn(),
    findById: jest.fn(),
    update: jest.fn(),
  }));
});

describe('EggCollectionService', () => {
  let service;

  beforeEach(() => {
    service = new EggCollectionService();

    // Clear all mocks from the EggRepository instance
    const eggRepository = service.eggRepository;
    eggRepository.save.mockClear();
    eggRepository.findAll.mockClear();
    eggRepository.findById.mockClear();
    eggRepository.update.mockClear();
  });

  it('should collect an egg', async () => {
    service.eggRepository.save.mockResolvedValue({
      id: 1,
      dateLaid: '2023-01-01',
      quantity: 60,
      status: 'fresh',
    });

    const egg = await service.collectEgg('2023-01-01', 60);
    expect(egg.id).toBe(1);
    expect(service.eggRepository.save).toHaveBeenCalledWith(expect.any(Egg));
  });

  it('should return all eggs', async () => {
    const mockEggs = [
      { id: 1, quantity: 60 },
      { id: 2, quantity: 55 },
    ];
    service.eggRepository.findAll.mockResolvedValue(mockEggs);

    const eggs = await service.getAllEggs();
    expect(eggs).toEqual(mockEggs);
  });

  it("should update an egg's status", async () => {
    const mockEgg = new Egg('2023-01-01', 60, 'fresh');
    service.eggRepository.findById.mockResolvedValue(mockEgg);
    service.eggRepository.update.mockResolvedValue({
      ...mockEgg,
      status: 'collected',
    });

    const updatedEgg = await service.updateEggStatus(1, 'collected');
    expect(service.eggRepository.update).toHaveBeenCalledWith(
      expect.objectContaining({ status: 'collected' })
    );
    expect(updatedEgg.status).toBe('collected');
  });

  it('should return null if egg not found during update', async () => {
    EggRepository.prototype.findById = jest.fn().mockResolvedValue(null);

    const updatedEgg = await service.updateEggStatus(999, 'collected');
    expect(updatedEgg).toBeNull();
  });
});
