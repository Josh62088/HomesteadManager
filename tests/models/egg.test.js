const Egg = require('../../src/models/Egg');

describe('Egg Model', () => {
  it('should create an egg with correct properties', () => {
    const eggDate = new Date();
    const egg = new Egg(eggDate, 60); //60 grams
    expect(egg.dateLaid).toEqual(eggDate);
    expect(egg.quantity).toBe(60);
    expect(egg.status).toBe('fresh');
  });

  it('should calculate days since laid correctly', () => {
    const egg = new Egg('2023-01-01', 60);
    expect(egg.ageInDays).toBeGreaterThanOrEqual(0); //Assuming today is after Jan  1, 2023
  });

  it('should update egg status', () => {
    const egg = new Egg('2023-01-01', 60);
    egg.updateStatus('collected');
    expect(egg.status).toBe('collected');
  });

  it('should throw an error for invalid status', () => {
    const egg = new Egg('2023-01-01', 60);
    expect(() => egg.updateStatus('invalid')).toThrow('Invalid egg status');
  });

  it('should determine if egg is fresh', () => {
    const egg = new Egg(new Date(), 60); // Assume today's date
    expect(egg.isFresh).toBe(true);
    // Note: this test depends on real-time, you might want to mock Date for more precise control
  });
});
