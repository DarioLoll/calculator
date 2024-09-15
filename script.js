let firstNumber = null;
let secondNumber = null;
let currentNumberInput = "";
let operator = null;

let result = null;
let calculation = null;

let numberDisplay = document.querySelector(".result");
let calculationDisplay = document.querySelector(".calculation");

registerListeners();

function registerListeners() {
    let buttonRows = document.querySelectorAll(".button-row");
    for (const buttonRow of buttonRows) {
        for (const button of buttonRow.children) {
            if(button.classList.contains("invert")) {
                button.addEventListener("click", invert);
            } else if (button.classList.contains("equals")) {
                button.addEventListener("click", operate)
            } else if (button.classList.contains("number")) {
                button.addEventListener("click", () => onNumberEntered(button.textContent));
            } else if (button.classList.contains("operator")) {
                button.addEventListener("click", () => onOperatorEntered(button.textContent));
            } else if (button.classList.contains("clear")) {
                button.addEventListener("click", clear);
            } else if (button.classList.contains("decimal")) {
                button.addEventListener("click", onDecimalPointEntered);
            }
        }
    }
}

function operate() {
    console.log("Calculating...");
    switch (operator) {
        case "+":
            add();
            break;
        case "-":
            subtract();
            break;
        case "×":
            multiply();
            break;
        case "÷":
            divide();
            break;
        case "%":
            modulo();
            break;
        default:
            return;
    }
    result = Math.round(result * 10000) / 10000;
    updateDisplay();
    firstNumber = result;
    operator = null;
    secondNumber = null;
    result = null;
}

function onNumberEntered(numberString) {
    let number = parseInt(numberString);
    if (isNaN(number)) {
        console.log("Number conversion failed: " + numberString);
        return;
    }
    addInput(number.toString());
}

function onDecimalPointEntered() {
    if (currentNumberInput.includes(".")) return;
    addInput(".");
}

function addInput(input) {
    currentNumberInput += input;
    if (operator === null) {
        firstNumber = parseFloat(currentNumberInput);
    } else {
        secondNumber = parseFloat(currentNumberInput);
    }
    updateDisplay();
}

function onOperatorEntered(operatorString) {
    if (operatorString === null) return;
    if (operatorString.length !== 1) return;
    let validOperators = "+-×*/÷%";
    if (validOperators.indexOf(operatorString) === -1) return;
    console.log("Operator entered " + operatorString);
    if (secondNumber !== null) {
        operate();
    }
    operator = operatorString;
    currentNumberInput = "";
    updateDisplay();
}

function updateDisplay() {
    calculation = `${firstNumber ?? ""} ${operator ?? ""} ${secondNumber ?? ""}`;
    if (calculation.trim().length === 0) {
        calculation = "0"
    }
    numberDisplay.textContent = result ?? secondNumber ?? firstNumber ?? 0;
    calculationDisplay.textContent = calculation;
}

function clear() {
    currentNumberInput = "";
    firstNumber = null;
    secondNumber = null;
    calculation = null;
    operator = null;
    result = null;
    updateDisplay();
}

function add() {
    result = firstNumber + secondNumber;
}
function subtract() {
    result = firstNumber - secondNumber;
}
function multiply() {
    result = firstNumber * firstNumber;
}
function divide() {
    if (secondNumber === 0) {
        result = "Hell nah";
        return;
    }
    result = firstNumber / secondNumber;
}
function modulo() {
    result = firstNumber % secondNumber;
}
function invert() {
    if (secondNumber !== null) {
        secondNumber = -secondNumber;
        currentNumberInput = secondNumber.toString();
    } else if (firstNumber !== null) {
        firstNumber = -firstNumber;
        currentNumberInput = firstNumber.toString();
    }
    updateDisplay();
}
