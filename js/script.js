// DOM
let mainDisplay = document.getElementById("mainDisplay");
let secondDisplay = document.getElementById("secondDisplay");
let digits = document.querySelectorAll(".digit");
let operators = document.querySelectorAll(".operator");
let equalBtn = document.getElementById("equalBtn");
let resetBtn = document.getElementById("resetBtn");
let backBtn = document.getElementById("backBtn");
let operationDisplay = document.getElementById("operation");
let posNegBtn = document.querySelector(".pos-neg");

// Switches
let isBlinking = true;
let isContinue = true;
let isComplete = false;
let isPositive = true;

let offBlink = "";
let onBlink = "";
let evalValue1 = "";
let evalValue2 = "";
let whatOperation = "";
let result = "";

// Function to start/restart calculator
function blinkPointer() {
  isContinue = true;
  isComplete = false;
  isPositive = true;
  evalValue1 = "";
  evalValue2 = "";
  whatOperation = "";
  result = "";
  mainDisplay.innerHTML = "|";
  offBlink = setInterval(() => {
    mainDisplay.innerHTML = "";
    secondDisplay.innerHTML = "";
    operationDisplay.innerHTML = "";
  },500);  
  onBlink = setInterval(() => {
    mainDisplay.innerHTML = "|";
  },1500);
  isBlinking = true;
}

// Function to preceed start of calculator (Stop blinking)
function unblinkPointer() {
  clearInterval(offBlink);
  clearInterval(onBlink);
  mainDisplay.innerHTML = "";
  isBlinking = false;
}
blinkPointer();

// Digits
// Function to register digits on screen
function registerDigits(digit) {
  digit = digit.textContent;
  let displayedDig = mainDisplay.textContent;
  if (isBlinking) {
    unblinkPointer();
    mainDisplay.textContent = digit;
    console.log("Start");
  } else if (!isBlinking && isComplete && !isContinue) {
      mainDisplay.textContent = digit;
      isContinue = true;
  } else {
    if (displayedDig === "0" && digit === "0") {
      mainDisplay.textContent = digit;
    } else if (displayedDig === "0" && digit !== "0") {
      mainDisplay.textContent = digit;
    }else if(displayedDig.length <= 10) {
      mainDisplay.textContent += digit;
    }
  }
}

// Digits button
digits.forEach((digit) => {
  digit.addEventListener("click", () => {
    registerDigits(digit);
  });
});

// Positive Negative Button
function addPosNeg() {
  let mainValue = mainDisplay.textContent;
  let mainValueFC = mainValue.charAt(0);
  if (!isBlinking && mainValue !== "") {
    if (isPositive && mainValueFC !== "-") {
      mainDisplay.textContent = `-${mainValue}`;
      isPositive = false;
    } else {
      mainDisplay.textContent = Math.abs(mainValue);
      isPositive = true;
    }
  }  
}
posNegBtn.addEventListener("click",() => {
  addPosNeg();
});

// Operators
// Function to check and display operator
function setOperator(digit) {
  whatOperation = digit.textContent;
  operationDisplay.textContent = whatOperation;
  secondDisplay.textContent = mainDisplay.textContent;
  mainDisplay.textContent = "";
  isComplete = false;
  isContinue = true;
  isPositive = true;
}

// Function to process operation
function registerOperation(digit) {
  if (!isBlinking && secondDisplay.textContent === "") {
    setOperator(digit);
  } 
  else if (isComplete) {
    setOperator(digit);
  } 
  else if (mainDisplay.textContent !== "" && secondDisplay.textContent !== "") {
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
  evalValue2 = mainDisplay.textContent;
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
    let stringResult = result.toString();
    if (stringResult.length <= 10) {
      mainDisplay.textContent = result;
    } else {
      alert(`Result too long to compute: \nResult: ${result}`);
      blinkPointer();
    }    
    isComplete = true;
    isContinue = false;
    isPositive = true;
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
    secondDisplay.textContent = "";
    operationDisplay.textContent = "";
    isContinue = false;
  }    
});

// Function to undo last process
function backSpace() {
  let display1 = mainDisplay.textContent;
  let lastChar = (string) => {
    return string.charAt(string.length - 1);
  }
  if (secondDisplay.textContent !== "" ) {
    mainDisplay.textContent = display1.replace(lastChar(display1),"");
    if (mainDisplay.textContent.length == 0) {
      mainDisplay.textContent = secondDisplay.textContent;
      secondDisplay.textContent = "";
      operationDisplay.textContent = "";
    }
  } else if (display1.length == 1) {
      blinkPointer();
  } else {
    mainDisplay.textContent = display1.replace(lastChar(display1),"");
  }
}

// B (Backspace button)
backBtn.addEventListener("click", backSpace);

// C (Clear button)
resetBtn.addEventListener("click", () => {
  unblinkPointer();
  blinkPointer();
});