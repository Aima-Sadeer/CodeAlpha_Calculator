const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");

const numberButtons = document.querySelectorAll("[data-number]");
const operatorButtons = document.querySelectorAll("[data-operator]");

const clearButton = document.querySelector('[data-action="clear"]');
const deleteButton = document.querySelector('[data-action="delete"]');
const calculateButton = document.querySelector('[data-action="calculate"]');


let currentNumber = "";
let previousNumber = "";
let operator = "";


/* Update Display */

function updateDisplay() {

    currentDisplay.textContent = currentNumber || "0";

    previousDisplay.textContent =
        previousNumber && operator
            ? `${previousNumber} ${getOperatorSymbol(operator)}`
            : "";

}


/* Operator Symbols */

function getOperatorSymbol(operator) {

    if (operator === "*") return "×";

    if (operator === "/") return "÷";

    if (operator === "-") return "−";

    if (operator === "+") return "+";

    if (operator === "%") return "%";

    return operator;
}


/* Number Buttons */

numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        if (number === "." && currentNumber.includes(".")) {
            return;
        }

        currentNumber += number;

        updateDisplay();

    });

});


/* Operator Buttons */

operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        if (currentNumber === "") {
            return;
        }

        if (previousNumber !== "") {
            calculate();
        }

        operator = button.dataset.operator;

        previousNumber = currentNumber;

        currentNumber = "";

        updateDisplay();

    });

});


/* Calculate */

function calculate() {

    if (
        previousNumber === "" ||
        currentNumber === "" ||
        operator === ""
    ) {
        return;
    }

    const previous = parseFloat(previousNumber);
    const current = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = previous + current;
            break;

        case "-":
            result = previous - current;
            break;

        case "*":
            result = previous * current;
            break;

        case "/":

            if (current === 0) {

                currentNumber = "Error";

                previousNumber = "";

                operator = "";

                updateDisplay();

                return;
            }

            result = previous / current;

            break;

        case "%":
            result = previous % current;
            break;

    }

    currentNumber = String(
        Number(result.toFixed(10))
    );

    previousNumber = "";

    operator = "";

    updateDisplay();

}


/* Equal Button */

calculateButton.addEventListener("click", () => {

    calculate();

});


/* Clear Button */

clearButton.addEventListener("click", () => {

    currentNumber = "";

    previousNumber = "";

    operator = "";

    updateDisplay();

});


/* Delete Button */

deleteButton.addEventListener("click", () => {

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();

});


/* Keyboard Support */

document.addEventListener("keydown", event => {

    const key = event.key;

    if (
        (key >= "0" && key <= "9") ||
        key === "."
    ) {

        const button = document.querySelector(
            `[data-number="${key}"]`
        );

        if (button) {
            button.click();
        }

    }


    if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/"
    ) {

        const button = document.querySelector(
            `[data-operator="${key}"]`
        );

        if (button) {
            button.click();
        }

    }


    if (key === "Enter" || key === "=") {

        calculateButton.click();

    }


    if (key === "Escape") {

        clearButton.click();

    }


    if (key === "Backspace") {

        deleteButton.click();

    }

});