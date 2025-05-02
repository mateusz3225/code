const timerElement = document.getElementById("timer");
const upgradeamount = document.getElementById("upgradeamount");
const upgrade2amount = document.getElementById("upgrade2amount");
let timerValue = parseInt(localStorage.getItem("gold")) || 0;
let increase = parseInt(localStorage.getItem("increaseInt")) || 1;
let textboxElement = document.getElementById("textbox");
let xp = parseInt(localStorage.getItem("xp")) || 0;
const xpElement = document.getElementById("exp");
// DEBUGGING
//setGold(10000000);


// Gold timer
function updateTimer() {
  timerValue += increase;
  if (timerValue === 1) {
    timerElement.textContent = "Gold: 1 nugget";
  } else {

  timerElement.textContent = `Gold: ${formatNumber(timerValue)} nuggets`;}
  localStorage.setItem("gold", timerValue);
}

updateTimer(); // Initial call to set the timer value immediately
setInterval(updateTimer, 1000);
//changes the display of the timer value to a more readable format
function formatNumber(timerValue) {
    if (timerValue >= 1e15) return timerValue.toExponential(2); // Scientific notation for very large timerValuebers
    if (timerValue >= 1e12) return (timerValue / 1e12).toFixed(2) + "T";
    if (timerValue >= 1e9) return (timerValue / 1e9).toFixed(2) + "B";
    if (timerValue >= 1e6) return (timerValue / 1e6).toFixed(2) + "M";
    if (timerValue >= 1e3) return (timerValue / 1e3).toFixed(2) + "K";
    return timerValue.toString();
  }
  

  
  // Upgrade button click event
  function handleUpgrade(upgrade,upgradeCost, increaseValue,counterElement,counterID) {
  upgrade.addEventListener("click", () => { 
    if (timerValue >= upgradeCost) {
      let counterValue = parseInt(localStorage.getItem(`${counterElement}`)) || 0; // Get the current counter value
      counterValue += 1; // Increment the counter value
      localStorage.setItem(`${counterElement}`, counterValue); // Save the updated counter value
      counterID2 = document.getElementById(`${counterID}`);
      counterID2.textContent = `${counterValue}`; 
      
      timerValue -= upgradeCost; // Deduct the cost
      localStorage.setItem("gold", timerValue); // Save the updated value
      textboxElement.style.color = "green"; // Change text color to red
      updateTimer(); // Update the display
      increase += increaseValue;
      localStorage.setItem("increaseInt", increase); // Save the updated increase value
      textboxElement.textContent = `Upgrade purchased!`; 
      
    upgrade.style.opacity = "0.5"; // Make the button semi-transparent
    setTimeout(() => {
      upgrade.style.opacity = '1';
  }, 100);}
      
      else {
        textboxElement.classList.remove("hidden"); // Show the textbox
        
        textboxElement.textContent = `Not enough gold!`;
        textboxElement.style.color = "red"; // Change text color to red
        
      }
  // Tring to make fade out effect for the textbox
  fadeout();
  });  
  
}
// Prevent dragging of elements with draggable="false"
document.querySelectorAll('[draggable="false"]').forEach(element => {
  element.addEventListener('dragstart', event => {
    event.preventDefault();

  });
});
// simple upgrades
const upgrade = document.getElementById("upgrade");
const upgrade2 = document.getElementById("upgrade2");
const upgrade3 = document.getElementById("upgrade3");
const upgrade4 = document.getElementById("upgrade4");
counter1 = document.getElementById("upgradeamount");
counter2 = document.getElementById("upgrade2amount");
counter3 = document.getElementById("upgrade3amount");
counter4 = document.getElementById("upgrade4amount");
let counterAmount1 = parseInt(localStorage.getItem("Amount1")) || 0;
let counterAmount2 = parseInt(localStorage.getItem("Amount2")) || 0;
let counterAmount3 = parseInt(localStorage.getItem("Amount3")) || 0;
let counterAmount4 = parseInt(localStorage.getItem("Amount4")) || 0;
handleUpgrade(upgrade, 1000, 1, "Amount1","upgradeamount");
handleUpgrade(upgrade2, 10000, 10, "Amount2","upgrade2amount"); 
handleUpgrade(upgrade3, 100000, 100, "Amount3","upgrade3amount");
handleUpgrade(upgrade4, 1000000, 1000, "Amount4","upgrade4amount");
counter1.textContent = `${counterAmount1}`; 
counter2.textContent = `${counterAmount2}`;
counter3.textContent = `${counterAmount3}`;
counter4.textContent = `${counterAmount4}`;


// fades the textbox
function fadeout() {
  if (textboxElement.style.opacity === "1") {
    setTimeout(() => {
      textboxElement.style.opacity = "0";
    }, 1000);} else {
   textboxElement.style.transition = "none";
    wow = setTimeout(() => {
      textboxElement.style.opacity = "1";
      
    }, 1);  textboxElement.style.transition = "opacity 2s ease";
    setTimeout(() => {
      textboxElement.style.opacity = "0";
    }, 1000);}
    };  
//make reset button
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {
  const confirmReset = confirm("Are you sure you want to reset your progress?");
  if (confirmReset) {
  localStorage.removeItem("gold"); // Remove the gold value from local storage
  localStorage.removeItem("increaseInt"); // Remove the increase value from local storage
  timerValue = 0; // Reset the timer value to 0
  increase = 1; // Reset the increase value to 1
  updateTimer(); // Update the display
  textboxElement.style.transition = "opacity 2s ease"; // Set the transition for opacity
  textboxElement.textContent = `Game reset!`;
  textboxElement.style.color = "white"; // Change text color to red
  localStorage.removeItem("Amount1"); // Remove the counter value from local storage
  localStorage.removeItem("Amount2"); // Remove the counter value from local storage
  localStorage.removeItem("Amount3"); // Remove the counter value from local storage
  localStorage.removeItem("Amount4"); // Remove the counter value from local storage
  localStorage.removeItem("xp"); // Remove the counter value from local storage
  counter1.textContent = "0"; 
  counter2.textContent ="0";
  counter3.textContent = "0";
  counter4.textContent = "0";
  xp = 0; // Reset the XP value to 0
  xpElement.textContent = `EXP: ${xp}`; // Update the XP display
  fadeout(); 
  }
});
//Making a player move
const player = document.getElementById("player");
let playerX = 50;
let playerY = 50;

let isFlipped = false; // Track if the image is flipped
function updatePlayerPosition() {
  
  player.style.left = `${playerX}%`;
  player.style.top = `${playerY}%`;
}
const keysPressed = {};
const step = 2;
document.addEventListener("keydown", (event) => {
  keysPressed[event.key] = true; // Mark the key as pressed
});

document.addEventListener("keyup", (event) => {
  keysPressed[event.key] = false; // Mark the key as released
});
    
// Handle movement based on key presses
    function handleMovement() {
      const playerWidth = player.offsetWidth; // Get the player's width
  const playerHeight = player.offsetHeight; // Get the player's height
  const viewportWidth = window.innerWidth; // Get the viewport width
  const viewportHeight = window.innerHeight; // Get the viewport height
  
      if (keysPressed["ArrowUp"]) {
        playerY = Math.max(0, playerY - step); // Move up
      }
      if (keysPressed["ArrowDown"]) {
        playerY = Math.min((viewportHeight - playerHeight) / viewportHeight * 100, playerY + step); // Move down
      }
      if (keysPressed["ArrowLeft"]) {
        playerX = Math.max(0, playerX - step); // Move left
        if (!isFlipped) {
          player.style.transform = "scaleX(-1)"; // Flip the image horizontally
          isFlipped = true;
        }
      }
      if (keysPressed["ArrowRight"]) {
        playerX = Math.min((viewportWidth - playerWidth) / viewportWidth * 100, playerX + step); // Move right
        if (isFlipped) {
          player.style.transform = "scaleX(1)"; // Reset the image to normal
          isFlipped = false;
        }
      }
      updatePlayerPosition();
      
      createPath(playerX, playerY);
    }

  
  
  updatePlayerPosition();
  setInterval(handleMovement, 16);
  
  
// SPAWNING GOLD
const spawn = {
  elements: [], // Array to store spawned elements
  spawnInterval: 2000, // Time interval for spawning (in milliseconds)
  maxElements: 10, // Maximum number of elements allowed on screen

  // Initialize the spawn system
  init() {
    setInterval(() => {
      this.spawnElement();
    }, this.spawnInterval);
    setInterval(() => {
      this.checkCollisions();
    }, 16);
  },

  // Spawn a new element
  spawnElement() {
    if (this.elements.length >= this.maxElements) return; // Limit the number of elements

    const newElement = document.createElement("div");
    newElement.classList.add("spawned-element");
    newElement.style.position = "absolute";
    newElement.style.left = `${Math.random() * 100}%`; // Random horizontal position
    newElement.style.top = `${Math.random() * 100}%`; // Random vertical position
    document.body.appendChild(newElement);
    
    this.elements.push(newElement);

    // Automatically remove the element after a certain time
    //setTimeout(() => {
      //this.removeElement(newElement);
    //}, 5000); // Remove after 5 seconds
  },
  checkCollisions() {
    this.elements.forEach((element) => {
      if (isColliding(player, element)) {
        this.removeElement(element); // Remove the element if there's a collision
      }
    });
  },
  // Remove an element
  removeElement(element) {
    element.remove();
    this.elements = this.elements.filter(el => el !== element);
    // Add 100 gold to the player's total
  timerValue += 100;
  localStorage.setItem("gold", timerValue); // Save the updated gold value
  updateTimer(); // Update the display
  xp += 1;
  updateXP();
  } 
};
// Update XP display
function updateXP() {
  xpElement.textContent = `EXP: ${xp}`; // Update the XP display
  localStorage.setItem("xp", xp); // Save XP to localStorage
}
updateXP(); // Initial call to set the XP display immediately
// Initialize the spawn system
spawn.init();

// COLLISION XD DETECTION
function isColliding(player, element) {
  const playerRect = player.getBoundingClientRect();
  const elementRect = element.getBoundingClientRect();

  return !(
    playerRect.top > elementRect.bottom ||
    playerRect.bottom < elementRect.top ||
    playerRect.left > elementRect.right ||
    playerRect.right < elementRect.left
  );
}
// debug funtion to set gold to any amount
function setGold(amount) {
  timerValue = amount;
  localStorage.setItem("gold", timerValue); // Save the updated gold value
  updateTimer(); // Update the display
  textboxElement.style.transition = "opacity 2s ease"; // Set the transition for opacity
  textboxElement.textContent = `Gold set to ${amount}`;
  textboxElement.style.color = "white"; // Change text color to red
  fadeout(); 
}

// path of player
let isMoving = false; 
function createPath(x, y) {
  
  
  const path = document.createElement("div");
  path.classList.add("path");
  path.style.position = "absolute";
  path.style.left = `${x+4}%`;
  path.style.top = `${y+5}%`;
  
  document.body.appendChild(path);
 
  
  setTimeout(() => {
    path.remove();
    
  }, 100);
  

}

//settings
