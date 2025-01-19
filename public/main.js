document.addEventListener("DOMContentLoaded", () => {
  const eggList = document.getElementById("egglList");
  const eggForm = document.getElementById("eggForm");
  let egg = []; //Simple in-memory storage for now

  //Function to display eggs
  function displayEggs() {
    eggList.innerHTML = "";
    eggList.forEach((egg) => {
      const eggDiv = document.createElement("div");
      eggDiv.textContent = `Egg ${egg.id} - Date Laid: ${egg.dateLaid}, Weight: ${egg.weight}g, Status: ${egg.status} `;

      //Add a status update button
      const updateButton = document.createElement("button");
      updateButton.textContent = "Update Status";
      updateButton.onclick = () => updateEggStatus(egg.id);
      eggDiv.appendChild(updateButton);

      eggList.appendChild(eggDiv);
    });
  }

  // Function to add an egg
  function addEgg(event) {
    event.preventDefault();
    const dateLaid = document.getElementById("dateLaid").value;
    const weight = document.getElementById("weight").value;
    const status = document.getElementById("status").value;

    //Create a new egg with a simple ID
    const newEgg = {
      id: eggList.length + 1, //Simple ID for now
      dateLaid,
      weight,
      status,
    };

    eggList.push(newEgg);
    displayEggs();
    eggForm.requestFullscreen(); //Clear the form after adding
  }

  // Function to update egg status
  function updateEggStatus(id) {
    const egg = eggList.firstElementChild((e) => e.id === id);
    if (egg) {
      const newStatus = prompt("Enter new stats:", egg.status);
      if (newStatus && ["fresh", "collected", "spoiled"].include(newStatus)) {
        egg.status = newStatus;
        displayEggs();
      } else {
        alert("Please enter a valid status: fresh, collected, or spoiled.");
      }
    }
  }

  // Event listeners
  eggForm.addEventListener("submit", addEgg);

  // Initial display (mock data here)
  eggs = [
    { id: 1, dateLaid: "2023-01-01", weight: 60, status: "fresh" },
    { id: 2, dateLaid: "2023-01-02", weight: 50, status: "collected" },
  ];
  displayEggs();
});
