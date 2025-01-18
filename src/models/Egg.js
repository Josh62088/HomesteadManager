class Egg {
  constructor(dateLaid, weight, status = "fresh") {
    this.dateLaid = new Date(dateLaid); //Assuming date is passed as string or Date object
    this.weight = weight; // in grams
    this.status = status; // 'collected', 'Assigned', spoiled
  }

  get ageInDays() {
    const today = new Date();
    const days = Math.floor((today - this.dateLaid) / (1000 * 60 * 60 * 24));
    return days;
  }

  updateStatus(newStatus) {
    if (["fresh", "collected", "spoiled"].includes(newStatus)) {
      this.status = newStatus;
    } else {
      throw new Error("Invalid egg status");
    }
  }

  get isFresh() {
    return this.ageInDays < 7 && this.status === "fresh"; // Assumes eggs stay fresh for up to 7 days
  }
}

module.exports = Egg;
