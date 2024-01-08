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
let isContinue = true;
let isComplete = false;
let whatOperation = "";
let result = "";

// Function to start/restart calculator
function blinkPointer() {
  isContinue = true;
  isComplete = false;
  evalValue1 = "";
  evalValue2 = "";
  whatOperation = "";
  result = "";

  firstDisplay.innerHTML = "|";

  offBlink = setInterval(() => {
    firstDisplay.innerHTML = "";
    secondDisplay.innerHTML = "";
    operationDisplay.innerHTML = "";
  },500);
  
  onBlink = setInterval(() => {
    firstDisplay.innerHTML = "|";
  },1500);

  isBlinking = true;
}

// Function to preceed start of calculator (Stop blinking)
function unblinkPointer() {
  clearInterval(offBlink);
  clearInterval(onBlink);
  firstDisplay.innerHTML = "";
  isBlinking = false;
}

blinkPointer();

// Digits
// Function to register digits on screen
function registerDigits(digit) {
  digit = digit.textContent;
  if (isBlinking) {
    unblinkPointer();
    firstDisplay.textContent = digit;
  } else if (!isBlinking && isComplete) {
      firstDisplay.textContent = digit;
  } else {
    firstDisplay.textContent += digit;
  }
}

// Digits button
digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    registerDigits(digit);
  });
});

// Operators
// Function to check and display operator
function setOperator(digit) {
  whatOperation = digit.textContent;
  operationDisplay.textContent = whatOperation;
  secondDisplay.textContent = firstDisplay.textContent;
  firstDisplay.textContent = "";
  isComplete = false;
  isContinue = true;
}

// Function to process operation
function registerOperation(digit) {
  if (!isBlinking && secondDisplay.textContent === "") {
    setOperator(digit);
  } 
  else if (isComplete) {
    setOperator(digit);
    console.log("Here");
  } 
  else if (firstDisplay.textContent !== "" && secondDisplay.textContent !== "") {
    toCalculate();
    setOperator(digit);
  }  else {
      whatOperation = digit.textContent;
      operationDisplay.textContent = whatOperation;
  }
}

// Function to calculate values
function toCalculate() {
  evalValue1 = secondDisplay.textContent;
  evalValue2 = firstDisplay.textContent;
  if(whatOperation && evalValue2 !== "" && evalValue1 !== "") {
    result = "";   
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
    isComplete = true;

    console.log(`${evalValue1} ${whatOperation} ${evalValue2} = ${result}`); 
  }
}

// Operator buttons
operators.forEach((digit) => {
  digit.addEventListener("click", () => {
    registerOperation(digit);    
  });
});

// Equal button
equalBtn.addEventListener("click",() => {
  if (isContinue) {
    toCalculate();
    isContinue = false;
  }  
  
});

// B (Backspace button)
function backSpace() {
  let display1 = firstDisplay.textContent;
  let lastChar = (string) => {
    return string.charAt(string.length - 1);
  }

  if (secondDisplay.textContent !== "" ) {
    firstDisplay.textContent = display1.replace(lastChar(display1),"");
    if (firstDisplay.textContent.length == 0) {
      firstDisplay.textContent = secondDisplay.textContent;
      secondDisplay.textContent = "";
      operationDisplay.textContent = "";
    }
  } else if (display1.length == 1) {
      blinkPointer();
  } else {
    firstDisplay.textContent = display1.replace(lastChar(display1),"");
  }
}

backBtn.addEventListener("click", backSpace);

// C (Clear button)
resetBtn.addEventListener("click", () => {
  unblinkPointer();
  blinkPointer();
});