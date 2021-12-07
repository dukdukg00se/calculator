let firstNum = ''; // this becomes num2
let secondNum = ''; // this becomes num1
let operationSelected = '';
let result = '';
let decimalInUse = false;

function add(num1, num2) {
	return num1 + num2;
};
function subtract(num1, num2) {
	return num1 - num2;
};
function multiply(num1, num2) {
 return num1 * num2;
};
function divide(num1, num2) {
  return (num2 === 0) ? 'LOL' : num1 / num2;
}
function doMath(oper, first, second) {
  let answer = '';
  switch (oper) {
    case '+':
      answer = add(first, second);
      break;
    case '-':
      answer = subtract(first, second);
      break;
    case 'x':
      answer = multiply(first, second);
      break;
    case '÷':
      answer = divide(first, second);
  }
  return answer;
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
function setOperand(char) {
  if (char === '.') {
    decimalInUse = true;
    return 0 + char;
  } else {
    return char;
  }
}

function backspace() {
  if (!firstNum) {
    if (!result) {
      return;
    } else if (result) {
      firstNum = result.toString().slice(0, -1);
    }
  } else {
    firstNum = firstNum.slice(0, -1);
  }
  mainDisplay.textContent = firstNum;
}


let mainDisplay = document.querySelector('#main-display');
let topDisplay = document.querySelector('#top-display');

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', reset);

let deleteBtn = document.querySelector('.delete');
deleteBtn.addEventListener('click', backspace);




let nmbrBtns = document.querySelectorAll(".number");
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

let oprtrBtns = document.querySelectorAll('.operator');
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

// Worked on this function to clean up code but at this point I just want to get the calculator working correctly
// *************************
// function showResult(oper, first, second) {
//   result = doMath(oper, first, second);
//   mainDisplay.textContent = result;
//   decimalInUse = false;
//   secondNum = result;
//   firstNum = '';
// }

