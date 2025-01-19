const EggCollectionService = require("../src/services/EggCollectionService");
const service = new EggCollectionService();

//Example usage
async function main() {
  //Collect an egg
  await service.collectEgg("2023-10-01", 55);

  //Get all eggs
  const allEggs = await service.getAllEggs();
  console.log(allEggs);

  //Update an egg's status
  if (allEggs.length > 0) {
    await service.updateEggStatus(1, "collected");
    console.log("Updated egg status");
  }
}

main().catch(console.error);
