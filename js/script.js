let firstDisplay = document.getElementById("firstDisplay");
let secondDisplay = document.getElementById("secondDisplay");
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let equalBtn = document.getElementById("equalBtn");
let resetBtn = document.getElementById("resetBtn");
let backBtn = document.getElementById("backBtn");
let operationDisplay = document.getElementById("operation");

let offBlink = "";
let onBlink = "";
let isBlinking = true;

let evalValue1 = "";
let evalValue2 = "";
let isContinue = false;
let isComplete = false;
let whatOperation = "";
let result = "";

// Function to start/restart calculator
function blinkPointer() {
  isContinue = false;
  evalValue1 = "";
  evalValue2 = "";
  whatOperation = "";
  result = "";

  offBlink = setInterval(() => {
    firstDisplay.innerHTML = "";
    secondDisplay.innerHTML = "";
    operationDisplay.innerHTML = "";
  },500);
  
  onBlink = setInterval(() => {
    firstDisplay.innerHTML = "|";
  },1000);

  isBlinking = true;
}

// Function to stop the pointer when calculator digits is clicked
function unblinkPointer() {
  clearInterval(offBlink);
  clearInterval(onBlink);
  firstDisplay.innerHTML = "";
  isBlinking = false;
}

blinkPointer();

// C button
resetBtn.addEventListener("click", blinkPointer);

// Digits
// Function to register digits on screen
function registerDigits(digit) {
  digit = digit.textContent;
  // If the pointer is blinking
  if (isBlinking) {
    unblinkPointer();
    firstDisplay.textContent = digit;
  } else if (!isBlinking && isComplete) {
      firstDisplay.textContent = digit;
  } else {
    firstDisplay.textContent += digit;
  }
}

digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    registerDigits(digit);
  });
});

// Function to collect value and indicate operation type

function registerOperation(digit) {
  whatOperation = digit.textContent;
  operationDisplay.textContent = whatOperation;
  if (!isBlinking && secondDisplay.textContent === "") {
    secondDisplay.textContent = firstDisplay.textContent;
    firstDisplay.textContent = "";
  } if (!isBlinking && isContinue) {
      secondDisplay.textContent = firstDisplay.textContent;
      firstDisplay.textContent = "";
      isContinue = false;
  }
  evalValue1 = secondDisplay.textContent;
  isComplete = false;
}

operators.forEach((digit) => {
  digit.addEventListener("click", () => {
    registerOperation(digit);
  });
});

equalBtn.addEventListener("click",() => {
  if(whatOperation && !isContinue) {
    result = "";
    evalValue2 = firstDisplay.textContent;
    evalValue1 = parseFloat(evalValue1);
    evalValue2 = parseFloat(evalValue2);
    switch (whatOperation) {
      case "+":
        result = ((evalValue1*10) + (evalValue2*10)) / 10;
        break;
      case "-":
        result = evalValue1 - evalValue2;
        break;
      case "X":
        result = evalValue1 * evalValue2;
        break;
      case "/":
        result = evalValue1 / evalValue2;
        break;
      default:
        result = "Err";
        break;
    }
    firstDisplay.textContent = result;
    isContinue = true;
    isComplete = true;

    console.log(`${evalValue1} ${whatOperation} ${evalValue2} = ${result}`);    
  } 
})