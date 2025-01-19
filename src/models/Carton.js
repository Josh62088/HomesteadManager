const { isDate } = require('moment');

class Carton {
  constructor(startDate, endDate) {
    this.id = Carton.nexxtId++;
    this.startDate = new Date(startDate);
    this.endDate = new Date(endDate);
    this.capacity = 12; //Fixed carton capacity of 12 slots;
    this.currentQuantity = 0;
    this.eggs = []; //Array to hold egg IDs
    this.expirationDate = this.calculateExpirationDate();
  }

  static nextId = 1;

  calculateExpirationDate() {
    const expiration = new Date(this.endDate);
    expiration.setDate(expiration.getDate() + 21); // Expiration is 3 weeks after the last egg was collected
    return expiration;
  }

  addEgg(egg) {
    if (this.currentQuantity < this.capacity) {
      this.eggs.push(egg.id);
      this.currentQuantity++;
      egg.cartonId = this.id;
      return true;
    }
    return false;
  }

  // Method to check if an egg's status should be changed to 'collected'
  checkEggStatus() {
    const now = new Date();
    this.eggs.forEach((eggId) => {
      const egg = eggs.find((e) => e.id === eggId);
      if (
        egg &&
        eggs.status === 'fresh' &&
        now - egg.dateLaid >= 7 * 24 * 60 * 1000
      ) {
        egg.status = 'collected';
      }
    });
  }
}
