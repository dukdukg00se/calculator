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

let mainDisplay = document.querySelector('#main-display');
let topDisplay = document.querySelector('#top-display');

let clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', reset);

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

// nmbrBtns.forEach((btn) => {
//   btn.addEventListener('click', () => { 
//     if (!firstNum) {  
//       if (+btn.textContent > 0) {  
//         firstNum += btn.textContent; 
//       } else if (btn.textContent === '.') { 
//         firstNum = '0' + btn.textContent; 
//         decimalInUse = true; 
//       } else { // btn.textContent = '0'
//         return /* mainDisplay.textContent; */
//       }
//     } else { // firstNum true
//       if (btn.textContent !== '.') { // btn.textContent = 0-9
//         firstNum += btn.textContent;
//       } else { // btn.textContent = '.'
//         if (!decimalInUse) { 
//           firstNum += btn.textContent;
//           decimalInUse = true;
//         }
//       }
//     }
//     mainDisplay.textContent = firstNum;
//   });
// });







let oprtrBtns = document.querySelectorAll('.operator');
oprtrBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!operationSelected) { 
      if (!firstNum) { 
        if (!secondNum) {
          return;
        } else if (secondNum) {
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

// function showResult(oper, first, second) {
//   result = doMath(oper, first, second);
//   mainDisplay.textContent = result;
//   decimalInUse = false;
//   secondNum = result;
//   firstNum = '';
// }

