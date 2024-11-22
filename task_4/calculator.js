let currentInput = '';
let operator = null;

function appendToDisplay(value) {
    currentInput += value;
    document.getElementById('display').value = currentInput;
}

function setOperation(op) {
    if (currentInput === '') return;

    if (operator !== null) {
        calculateResult();
    }

    operator = op;
    currentInput += op;
    document.getElementById('display').value = currentInput;
}

function calculateResult() {
    try {
        let result = eval(currentInput); // Keep in mind eval can be unsafe
        currentInput = result.toString();
        document.getElementById('display').value = currentInput;
        operator = null;
    } catch (error) {
        document.getElementById('display').value = 'Error';
    }
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    document.getElementById('display').value = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    document.getElementById('display').value = currentInput;
}
