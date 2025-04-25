const timerElement = document.getElementById("timer");
let timerValue = parseInt(localStorage.getItem("gold")) || 0;
let increase = parseInt(localStorage.getItem("increaseInt")) || 1;
let textboxElement = document.getElementById("textbox");
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
  function handleUpgrade(upgrade,upgradeCost, increaseValue) {
  upgrade.addEventListener("click", () => { 
    if (timerValue >= upgradeCost) {
      
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
handleUpgrade(upgrade, 1000, 1); // Upgrade 1: Cost 10 gold, increase by 1
handleUpgrade(upgrade2, 10000, 10); // Upgrade 1: Cost 10 gold, increase by 1

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
  fadeout(); 
  }
});


