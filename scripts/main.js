let firstNum = ''; 
let secondNum = ''; 
let operationSelected = '';
let result = '';
let decimalInUse = false;

const mainDisplay = document.querySelector('#main-display');
const topDisplay = document.querySelector('#top-display');
const clearBtn = document.querySelector('.clear');
const deleteBtn = document.querySelector('.backspace');
const nmbrBtns = document.querySelectorAll(".number");
const oprtrBtns = document.querySelectorAll('.operator');

function add(num2, num1) {
	return num2 + num1;
};
function subtract(num2, num1) {
	return num2 - num1;
};
function multiply(num2, num1) {
 return num2 * num1;
};
function divide(num2, num1) {
  return (num1 === 0) ? 'LOL' : num2 / num1;
}
function doMath(operation, num2, num1) {
  let answer;
  switch (operation) {
    case '+':
      answer = add(num2, num1);
      break;
    case '-':
      answer = subtract(num2, num1);
      break;
    case 'x':
      answer = multiply(num2, num1);
      break;
    case '÷':
      answer = divide(num2, num1);
  }

  if (answer === 'LOL') {
    return answer
  } else {
  // note the plus sign drops any "extra" zeroes at the end
  // it changes the result (which is a string) into a number again (think "0 +
  // foo"), which means that it uses only as many digits as necessary
    return +answer.toFixed(4);
  }
}
function setOperand(char) {
  if (char === '.') {
    decimalInUse = true;
    return 0 + char;
  } else {
    return char;
  }
}
function reset() {
  firstNum = ''; 
  secondNum = ''; 
  operationSelected = '';
  result ='';
  decimalInUse = false;
  mainDisplay.textContent = 0;
  topDisplay.textContent = '';
}
function backspace() {
  if (!firstNum) {
    if (!result) {
      return;
    } else { // result true
      if ((/\./).test(result)) { // result contains '.'
        decimalInUse = true;
        if (result[result.length - 1] === '.') { // last char is '.'
          decimalInUse = false;
        }
      } 
      firstNum = result.toString().slice(0, -1);
      result = '';
    }
  } else { // firstNum true
    if ((/\./).test(firstNum)) { // firstNum contains '.'
      decimalInUse = true;
      if (firstNum[firstNum.length - 1] === '.') {
        decimalInUse = false;
      } 
    }  
    firstNum = firstNum.slice(0, -1);
  }
  mainDisplay.textContent = firstNum;
}


clearBtn.addEventListener('click', reset);

deleteBtn.addEventListener('click', backspace);

nmbrBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (!firstNum) {
      firstNum += setOperand(btn.textContent);
    } else {
      if (firstNum === "0") {
        firstNum = "";
        firstNum += setOperand(btn.textContent);
      } else {
        if (btn.textContent === ".") {
          if (decimalInUse === false) {
            firstNum += btn.textContent;
            decimalInUse = true;
          } else {
            return;
          }
        } else { 
          firstNum += btn.textContent;
        }
      }
    }
    mainDisplay.textContent = firstNum;
  });
});


oprtrBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!operationSelected) { 
      if (!firstNum) { 
        if (!secondNum) {
          return;
        } else if (secondNum) {
          topDisplay.textContent = `${secondNum} ${operationSelected} ${firstNum} ${btn.textContent}`; // the top display will just show secondNum and the button content/new operator
          operationSelected = btn.textContent;
        }
      } else { // firstNum true
        if (btn.textContent === '=') {
          return;
        } else { // btn === x|-|+|÷          
          secondNum = firstNum;
          firstNum = '';
          operationSelected = btn.textContent;
          decimalInUse = false;
          topDisplay.textContent = `${secondNum} ${operationSelected}`;
        }
      }
    } else { // if operationSelected true, secondNum HAS to be true
      if (!firstNum) { // if firstNum false/undefined
        if (btn.textContent === '=') {
          return;
        } else { // btn === x|-|+|÷
          operationSelected = btn.textContent;
          topDisplay.textContent = `${secondNum} ${operationSelected}`;
        }
      } else { // if firstNum true
        if (btn.textContent === '=') {
          topDisplay.textContent = `${secondNum} ${operationSelected} ${firstNum} ${btn.textContent}`;
          result = doMath(operationSelected, +secondNum, +firstNum);
          mainDisplay.textContent = result;
          decimalInUse = false;
          operationSelected = '';
          secondNum = result;
          firstNum = '';
        } else {
          result = doMath(operationSelected, +secondNum, +firstNum);
          mainDisplay.textContent = result;
          operationSelected = btn.textContent;
          decimalInUse = false;
          secondNum = result;
          firstNum = '';
          topDisplay.textContent = `${result} ${operationSelected}`;
        }
      }
    }
  });
});


