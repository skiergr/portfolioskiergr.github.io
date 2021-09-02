class Calcultor {
  constructor(previousOperandTextElement, curretOperandTextElement) {
    this.pOTP = previousOperandTextElement;
    this.cOTP = curretOperandTextElement;
    this.allClear();
  }
  allClear() {
    this.currentOperand = '';
    this.previousOperand = '';
    this.operation = undefined;
  }
  clear() {
    this.currentOperand = '';
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }
  appendNumber(number) {
    if (number == '.' && this.currentOperand.includes('.')) return;
    if (number == 'π' && this.currentOperand !== '') return;
    if (number == 'π') {
      this.currentOperand =
        this.currentOperand.toString() + '3.14159'.toString();
      return;
    }
    this.currentOperand = this.currentOperand.toString() + number.toString();
  }
  chooseOperation(operation) {
    if (this.currentOperand === '') return;
    if (this.previousOperand !== '') {
      this.computer();
    }
    if (operation === 'x^2') {
      this.operation = '^';
      this.previousOperand = this.currentOperand.toString();
      this.currentOperand = '2'.toString();
      this.computer();
    } else if (operation === '√x') {
      this.operation = '√x';
      this.previousOperand = this.currentOperand.toString();
      this.currentOperand = '2'.toString();
      this.computer();
    } else {
      this.operation = operation;
      this.previousOperand = this.currentOperand.toString();
      this.currentOperand = '';
    }
  }
  negative() {
    if (this.currentOperand === '') return;
    this.currentOperand = this.currentOperand * -1;
  }
  computer() {
    let computation;
    const prev = parseFloat(this.previousOperand);
    const current = parseFloat(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case '+':
        computation = prev + current;
        break;
      case '-':
        computation = prev - current;
        break;
      case '÷':
        computation = prev / current;
        break;
      case '*':
        computation = prev * current;
        break;
      case '^':
        computation = Math.pow(prev, current);
        break;
      case 'x^2':
        computation = Math.pow(prev, '2');
        break;
      case '√x':
        computation = Math.sqrt(prev);
        break;
      default:
        return;
    }
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = '';
    this.updateDisplay();
  }
  getDisplayNumber(number) {
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);
    const decimanDigits = stringNumber.split('.')[1];
    let integerDisplay;
    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', {
        maximumFractionDigits: 0,
      });
    }
    if (decimanDigits != null) {
      return `${integerDisplay}.${decimanDigits}`;
    } else {
      return integerDisplay;
    }
  }
  updateDisplay() {
    this.cOTP.innerText = this.getDisplayNumber(this.currentOperand);
    if (this.operation != undefined) {
      this.pOTP.innerText = `${this.getDisplayNumber(this.previousOperand)} ${
        this.operation
      }`;
    } else {
      this.pOTP.innerText = this.previousOperand;
    }
  }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const clearButton = document.querySelector('[data-clear]');
const squareButton = document.querySelector('[data-square]');
const negativeButton = document.querySelector('[data-negative]');
const previousOperandTextElement = document.querySelector(
  '[data-previous-operand]'
);
const curretOperandTextElement = document.querySelector(
  '[data-current-operand]'
);

const calculator = new Calcultor(
  previousOperandTextElement,
  curretOperandTextElement
);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});
operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});
deleteButton.addEventListener('click', () => {
  calculator.delete();
  calculator.updateDisplay();
});

equalsButton.addEventListener('click', () => {
  calculator.computer();
  calculator.updateDisplay();
});
allClearButton.addEventListener('click', () => {
  calculator.allClear();
  calculator.updateDisplay();
});
if (clearButton !== null) {
  clearButton.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
  });
}
if (squareButton !== null) {
  squareButton.addEventListener('click', () => {
    calculator.chooseOperation('x^2');
    calculator.updateDisplay();
  });
}
if (negativeButton !== null) {
  negativeButton.addEventListener('click', () => {
    calculator.negative();
    calculator.updateDisplay();
  });
}
