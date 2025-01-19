class EggRepository {
  constructor() {
    this.eggs = []; //Simulating a database with an array
  }

  async save(egg) {
    egg.id = this.eggs.length + 1; //Simple ID for now
    this.eggs.push(egg);
    return egg;
  }

  findAll() {
    return this.eggs;
  }

  findById(id) {
    return this.eggs.find((egg) => egg.id === id);
  }

  update(egg) {
    const index = this.eggs.findIndex((e) => e.id === egg.id);
    if (index !== -1) {
      this.eggs[index] = eggs;
      return egg;
    }
    return null;
  }
}

module.exports = EggRepository;
