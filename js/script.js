let evalDisplay = document.getElementById("evaluations");
let digits = document.querySelectorAll(".digit");
let evalDigits = document.querySelectorAll(".eval");

let evalValue1 = "";
let evalValue2 = "";

let offBlink = "";
let onBlink = "";
let isBlinking = true;

function blinkPointer() {
  offBlink = setInterval(() => {
    evalDisplay.innerHTML = "";
  },1000);
  
  onBlink = setInterval(() => {
    evalDisplay.innerHTML = "|";
  },2000);
}

function unblinkPointer() {
  clearInterval(offBlink);
  clearInterval(onBlink);
  evalDisplay.innerHTML = "";
  isBlinking = false;
}

blinkPointer(); 

console.log("Here");

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    if(isBlinking) {
      unblinkPointer();
      evalDisplay.textContent = digit.textContent;
    } else {
      evalDisplay.textContent += digit.textContent;
    }
  });
});

evalDigits.forEach((digit) => {
  digit.addEventListener("click", () => {
    evalValue1 = parseInt(evalDisplay.textContent);
    console.log(evalValue1);
  });
});