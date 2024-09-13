let firstNumber = 0;
let secondNumber = 0;
let operator;

let result = 0;
let calculation;

let resultDisplay = document.querySelector(".result");
let calculationDisplay = document.querySelector(".calculation");

function operate() {
    calculation = `${firstNumber} ${operator} ${secondNumber}`;
    switch (operator) {
        case "+":
            add();
            break;
        case "-":
            subtract();
            break;
        case "*":
            multiply();
            break;
        case "/":
            divide();
            break;
        case "%":
            modulo();
            break;
        default:
            result = "?"
            break;
    }
    updateDisplay();
    clear();
    firstNumber = result;
}

function updateDisplay() {
    resultDisplay.textContent = result;
    calculationDisplay.textContent = calculation;
}

function clear() {
    firstNumber = NaN;
    secondNumber = NaN;
    operator = "";
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
    if (!isNaN(secondNumber)) {
        secondNumber = -secondNumber;
    } else {
        firstNumber = -firstNumber;
    }
}
