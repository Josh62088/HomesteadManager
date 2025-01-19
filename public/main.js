console.log('main.js is running');
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded Event Listener Started');

  const eggList = document.getElementById('eggList');
  const eggForm = document.getElementById('eggForm');
  const dateLaid = document.getElementById('dateLaid');
  const quantity = document.getElementById('quantity');
  const status = document.getElementById('status');

  console.log('eggList:', eggList);
  console.log('eggForm:', eggForm);
  console.log('dateLaid:', dateLaid);
  console.log('quantity:', quantity);
  console.log('status:', status);

  if (!eggList || !eggForm || !dateLaid || !quantity || !status) {
    console.error('One or more elements not found in DOM');
    return;
  }

  let eggs = []; //Simple in-memory storage for now

  //Function to display eggs
  function displayEggs() {
    if (eggList) {
      console.log('Entering displayEggs function');
      eggList.innerHTML = '';
      console.log('eggList exists, setting innerHTML to empty');
      eggs.forEach((egg) => {
        console.log('Processing eggs array:', eggs);
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${egg.id}</td>
          <td>${egg.dateLaid}</td>
          <td>${egg.quantity}</td>
          <td>${egg.status}</td>
          <td><button onclick="updateEggStatus(${egg.id})">Update Status</button></td>
        `;
        eggList.appendChild(row);
      });
    } else {
      console.error('eggList is still null when trying to display eggs');
    }
  }
  // Function to add an egg
  function addEgg(event) {
    event.preventDefault();
    console.log('Add Egg function triggered');
    const dateLaid = document.getElementById('dateLaid').value;
    console.log('Date Laid:', dateLaid);
    const quantity = document.getElementById('quantity').value;
    console.log('Quantity:', quantity);
    const status = document.getElementById('status').value;
    console.log('Status:', status);

    //Create a new egg with a simple ID
    const newEgg = {
      id: eggs.length + 1, //Simple ID for now
      dateLaid,
      quantity,
      status,
    };

    eggs.push(newEgg);
    displayEggs();
    eggForm.reset(); //Clear the form after adding
  }

  // Function to update egg status
  window.updateEggStatus = function (id) {
    const egg = window.eggs.find((e) => e.id === id);
    if (egg) {
      const newStatus = prompt('Enter new status:', egg.status);
      if (newStatus && ['fresh', 'collected', 'spoiled'].includes(newStatus)) {
        egg.status = newStatus;
        displayEggs();
      } else {
        alert('Please enter a valid status: fresh, collected, or spoiled.');
      }
    }
  };

  // Event listeners
  eggForm.addEventListener('submit', addEgg);

  // Initial display (mock data here)
  eggs = [
    { id: 1, dateLaid: '2023-01-01', quantity: 60, status: 'fresh' },
    { id: 2, dateLaid: '2023-01-02', quantity: 50, status: 'collected' },
  ];
  window.eggs = eggs; // Make eggs accessible globally
  console.log('initial eggs array:', eggs);
  displayEggs();
});
