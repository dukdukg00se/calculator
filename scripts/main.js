let firstNum = ''; //this becomes num2
let secondNum = ''; //this becomes num1
let operation = '';
let decimal = false;



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
  return num1 / num2;
}
function operate(oper, first, second) {
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

// let btns = document.querySelectorAll('button');
// btns.forEach((btn) => {
//   btn.addEventListener('click', () => {
    
//     if (btmDisplay.textContent === '0') {
//      if (btn.className === 'number' && btn.textContent !== '0') {
//        firstNum += btn.textContent;
//      } else if (btn.className === 'decimal') {
//         if (!decimal) {
//           firstNum = '0' + btn.textContent;
//           decimal = true;
//         }       
//      } else {
//       return btmDisplay.textContent;
//      }
//     } else if (btmDisplay.textContent !== '0') {
//        if (btn.className === 'number') {
//         firstNum += btn.textContent;
//        } else if (btn.className === 'decimal') {
//         if (!decimal) {
//           firstNum += btn.textContent;
//           decimal = true;
//         }  
//        }
//       }
//     btmDisplay.textContent = firstNum;
//   });
// });
let btmDisplay = document.querySelector('#bottom-display');
let topDisplay = document.querySelector('#top-display');

let nmbrBtns = document.querySelectorAll('.number');
nmbrBtns.forEach((nmbr) => {
  nmbr.addEventListener('click', () => {
    if (btmDisplay.textContent === '0') { 
      if (nmbr.textContent !== '0' && nmbr.textContent !== '.') {  
        firstNum += nmbr.textContent; 
      } else if (nmbr.textContent === '.' && !decimal) { 
        firstNum = '0' + nmbr.textContent; 
        decimal = true; 
      } else { 
        return btmDisplay.textContent; 
      }

    } else {
      if (nmbr.textContent !== '.') {
        firstNum += nmbr.textContent;
      } else {
        if (!decimal) {
          firstNum += nmbr.textContent;
          decimal = true;
        }
      }
    }
    btmDisplay.textContent = firstNum;
  });
});

let oprtrBtns = document.querySelectorAll('.operator');
oprtrBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    console.log(btn.textContent);
    if (operation === '') {
      if (firstNum === '' && secondNum === '') {
        return topDisplay.textContent;
      } else { // if operation = '' and firstNum and secondNum = ''
        operation = btn.textContent;
        secondNum = firstNum;
        firstNum = '';
        decimal = false;
        topDisplay.textContent = `${secondNum} ${operation}`;
      }
    
    } else {
      if (firstNum === '') {
        operation = btn.textContent;
        topDisplay.textContent = `${secondNum} ${operation}`;
      } else { // if operation selected and firstNum is true
        secondNum = operate(operation, +secondNum, +firstNum);
        operation = btn.textContent;
        topDisplay.textContent = `${secondNum} ${operation}`;
        btmDisplay.textContent = `${secondNum}`;
        firstNum = '';
        decimal = false;
      }
    }

  });
});