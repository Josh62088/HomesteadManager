const Egg = require("../models/Egg");
const EggRepository = require("../repositories/EggRepository");

class EggCollectionService {
  constructor() {
    this.EggRepository = new EggRepository();
  }

  collectEgg(dateLaid, weight) {
    const egg = new Egg(dateLaid, weight);
    return this.EggRepository.save(egg);
  }

  getAllEggs() {
    return this.EggRepository.findAll();
  }

  updateEggStatus() {
    const egg = this.EggRepository.findById(eggId);
    if (egg) {
      egg.updateStatus(newStatus);
      return this.EggRepository.update(egg);
    }
    return null;
  }

  // Maybe add methods for getting fresh eggs, spoiled eggs, etc.
}

module.exports = EggCollectionService;
