const Egg = require('../models/Egg');
const EggRepository = require('../repositories/EggRepository');

class EggCollectionService {
  constructor() {
    this.eggRepository = new EggRepository();
  }

  async collectEgg(dateLaid, quantity) {
    const egg = new Egg(dateLaid, quantity);
    return await this.eggRepository.save(egg);
  }

  async getAllEggs() {
    return await this.eggRepository.findAll();
  }

  async updateEggStatus(eggId, newStatus) {
    const egg = await this.eggRepository.findById(eggId);
    if (egg) {
      egg.updateStatus(newStatus);
      return await this.eggRepository.update(egg);
    }
    return null;
  }

  // Maybe add methods for getting fresh eggs, spoiled eggs, etc.
}

module.exports = EggCollectionService;
