const timerElement = document.getElementById("timer");
let timerValue = parseInt(localStorage.getItem("gold")) || 0;
let increase = parseInt(localStorage.getItem("increaseInt")) || 1;
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

function formatNumber(timerValue) {
    if (timerValue >= 1e15) return timerValue.toExponential(2); // Scientific notation for very large timerValuebers
    if (timerValue >= 1e12) return (timerValue / 1e12).toFixed(2) + "T";
    if (timerValue >= 1e9) return (timerValue / 1e9).toFixed(2) + "B";
    if (timerValue >= 1e6) return (timerValue / 1e6).toFixed(2) + "M";
    if (timerValue >= 1e3) return (timerValue / 1e3).toFixed(2) + "K";
    return timerValue.toString();
  }
  

  const upgrade = document.getElementById("upgrade");
  let upgradeCost = 1000;
  upgrade.addEventListener("click", () => {
    if (timerValue >= upgradeCost) {
      timerValue -= upgradeCost; // Deduct the cost
      localStorage.setItem("gold", timerValue); // Save the updated value
      alert("Upgrade purchased!");
      updateTimer(); // Update the display
      increase += 1;
      localStorage.setItem("increaseInt", increase); // Save the updated increase value
    } else {
      alert("Not enough gold for the upgrade!");
    }
  });