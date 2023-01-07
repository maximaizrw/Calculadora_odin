const button = document.getElementById('dark-mode-button');
const element = document.getElementById('html');

button.addEventListener('click', () => {
    if (button.textContent === "Activar modo claro") {
        button.textContent = "Activar modo oscuro";
    } else {
        button.textContent = "Activar modo claro";
    }
    if (element.classList.contains('dark')) {
        element.classList.remove('dark');
    } else {
        element.classList.add('dark');
    }
});

const operations = {
    '+': sumar,
    '-': restar,
    'x': multiplicar,
    '/': dividir
};
let displayValue = '';
let firstNumber = '';
let operator = '';
let secondNumber = '';
let lastResult = '';

function sumar(num1, num2) {
    return num1 + num2;
}

function restar(num1, num2) {
    return num1 - num2;
}

function multiplicar(num1, num2) {
    return num1 * num2;
}

function dividir(num1, num2) {
    if (num2 === 0) {
        console.log("No se puede dividir por cero, eso es una tontería.");
        return;
    }
    return num1 / num2;
}

function operar(operador, num1, num2) {
    if (!operations[operador]) {
        console.log("Operador inválido");
        return;
    }

    return operations[operador](num1, num2);
}

function updateDisplay(newContent) {
    const display = document.querySelector('.display');
    if (lastResult) {
        display.textContent = `${lastResult} ${operator} ${newContent}`;
    } else {
        display.textContent = `${firstNumber} ${operator} ${newContent}`;
    }
    displayValue = newContent;
}



function handleNumberClick(event) {
    const button = event.target;
    const value = button.textContent;
    displayValue += value;
    updateDisplay(displayValue);
}

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', handleNumberClick);
});




function handleOperatorClick(event) {
    const button = event.target;
    handleEqualClick();
    operator = button.textContent;

    if (lastResult) {
        firstNumber = lastResult;
    } else {
        firstNumber = displayValue;
    }
    displayValue = '';
    updateDisplay('');
}


function handleEqualClick() {
    if (!firstNumber || !operator || !displayValue) {
        // Mostrar mensaje de error o hacer algo para indicar al usuario que faltan datos
        return;
    }
    secondNumber = displayValue;
    const result = operar(
        operator,
        parseFloat(firstNumber),
        parseFloat(secondNumber)
    );
    lastResult = result;
    firstNumber = '';
    operator = '';
    secondNumber = '';

    // Mostrar resultado en pantalla
    const resultElement = document.querySelector('.result');
    if (result % 1 !== 0) {
        resultElement.textContent = result.toFixed(2);
    } else {
        resultElement.textContent = result;
    }

}


const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', handleOperatorClick);
});

const equalButton = document.querySelector('.equal');
equalButton.addEventListener('click', handleEqualClick);

const clearButton = document.querySelector('.clear');
clearButton.addEventListener('click', () => {
    displayValue = '';
    firstNumber = '';
    operator = '';
    secondNumber = '';
    lastResult = '';

    // Clear the display
    const display = document.querySelector('.display');
    display.textContent = '0';

    // Clear the result
    const resultElement = document.querySelector('.result');
    resultElement.textContent = '0';
});



