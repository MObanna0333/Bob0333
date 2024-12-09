document.addEventListener('DOMContentLoaded', () => {
    const display = document.getElementById('display');
    let memory = 0;
    let currentInput = '';
    let operation = null;
    let previousInput = '';
    let resetDisplay = false;

    // Event listeners for buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            const action = button.innerText;

            if (!isNaN(action) || action === '.') {
                if (resetDisplay) {
                    currentInput = '';
                    resetDisplay = false;
                }
                // Handle number and decimal point input
                currentInput += action;
                display.innerText = currentInput;
            } else if (action === 'C') {
                // Handle clear
                currentInput = '';
                operation = null;
                previousInput = '';
                display.innerText = '';
            } else if (action === '←') {
                // Handle backspace
                currentInput = currentInput.slice(0, -1);
                display.innerText = currentInput;
            } else if (action === 'MC') {
                memory = 0;
            } else if (action === 'MR') {
                display.innerText = memory;
                currentInput = memory.toString();
            } else if (action === 'MS') {
                memory = parseFloat(display.innerText);
            } else if (action === 'M+') {
                memory += parseFloat(display.innerText);
            } else if (action === 'M-') {
                memory -= parseFloat(display.innerText);
            } else if (action === '=') {
                // Handle equals
                if (operation && previousInput !== '') {
                    currentInput = evaluate(previousInput, currentInput, operation).toString();
                    display.innerText = currentInput;
                    operation = null;
                    previousInput = '';
                    resetDisplay = true;
                }
            } else {
                // Handle operations
                if (currentInput !== '') {
                    if (previousInput !== '') {
                        currentInput = evaluate(previousInput, currentInput, operation).toString();
                        display.innerText = currentInput;
                    }
                    previousInput = currentInput;
                    currentInput = '';
                    operation = action;

                    // Handle scientific operations immediately
                    if (['√', 'sin', 'cos', 'tan', 'log', 'ln'].includes(operation)) {
                        currentInput = evaluate(previousInput, '', operation).toString();
                        display.innerText = currentInput;
                        operation = null;
                        previousInput = '';
                        resetDisplay = true;
                    }
                }
            }
        });
    });

    function evaluate(firstInput, secondInput, operator) {
        const x = parseFloat(firstInput);
        const y = parseFloat(secondInput);
        switch (operator) {
            case '+':
                return x + y;
            case '-':
                return x - y;
            case '*':
                return x * y;
            case '/':
                return y !== 0 ? x / y : 'Error';
            case '√':
                return Math.sqrt(x);
            case '^':
                return Math.pow(x, y);
            case 'sin':
                return Math.sin(Math.PI / 180 * x);
            case 'cos':
                return Math.cos(Math.PI / 180 * x);
            case 'tan':
                return Math.tan(Math.PI / 180 * x);
            case 'log':
                return Math.log10(x);
            case 'ln':
                return Math.log(x);
            default:
                return 'Error';
        }
    }
});
