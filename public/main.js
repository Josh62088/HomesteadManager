console.log("main.js is running");
document.addEventListener("DOMContentLoaded", () => {
  const eggList = document.getElementById("eggList");
  const eggForm = document.getElementById("eggForm");

  if (!eggList) {
    console.error("Element with ID 'eggList' not found");
  }
  if (!eggForm) {
    console.error("Element with ID 'eggForm' not found");
  }

  let eggs = []; //Simple in-memory storage for now

  //Function to display eggs
  function displayEggs() {
    if (eggList) {
      console.log("Entering displayEggs function");
      eggList.innerHTML = ``;
      console.log("eggList exists, setting innerHTML to empty");
      eggs.forEach((egg) => {
        console.log("Processing eggs array:", eggs);
        const row = document.createElement("tr");
        row.innerHTML = `;
          <td>${egg.id}</td>
          <td>${egg.dateLaid}</td>
          <td>${egg.weight}</td>
          <td>${egg.status}</td>
          <td><button onclick="updateEggStatus(${egg.id})">Update Status</button></td>
        `;
        eggList.appendChild(row);
      });
    } else {
      console.error("eggList is still null when trying to display eggs");
    }
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
    eggForm.reset(); //Clear the form after adding
  }

  // Function to update egg status
  function updateEggStatus(id) {
    const egg = eggs.find((e) => e.id === id);
    if (egg) {
      const newStatus = prompt("Enter new status:", egg.status);
      if (newStatus && ["fresh", "collected", "spoiled"].includes(newStatus)) {
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
  console.log("initial eggs array:", eggs);
  displayEggs();
});
