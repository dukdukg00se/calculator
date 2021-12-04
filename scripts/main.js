let firstNum = ''; // this becomes num2
let secondNum = ''; // this becomes num1
let operationSelected = '';
let result ='';
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
  return num2 === 0 ? 'LOL' : num1 / num2;
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

let mainDisplay = document.querySelector('#main-display');
let topDisplay = document.querySelector('#top-display');

let nmbrBtns = document.querySelectorAll('.number');
nmbrBtns.forEach((btn) => {
  btn.addEventListener('click', () => { 
    if (!firstNum) {  
      if (+btn.textContent > 0) {  
        firstNum += btn.textContent; 
      } else if (btn.textContent === '.') { 
        firstNum = '0' + btn.textContent; 
        decimalInUse = true; 
      } else { // btn.textContent = '0'
        return /* mainDisplay.textContent; */
      }
    } else { // firstNum true
      if (btn.textContent !== '.') { // btn.textContent = 0-9
        firstNum += btn.textContent;
      } else { // btn.textContent = '.'
        if (!decimalInUse) { 
          firstNum += btn.textContent;
          decimalInUse = true;
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
        return;
      } else { // firstNum true
        if (btn.textContent === '=') {
          // console.log('test');
          // topDisplay.textContent = firstNum;
          return;
        } else { // btn === x|-|+|÷
          operationSelected = btn.textContent;
          secondNum = firstNum;
          firstNum = '';
          decimalInUse = false;
          topDisplay.textContent = `${secondNum} ${operationSelected}`;
          // mainDisplay.textContent still === firstNum
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

          // operationSelected = btn.textContent;
          // topDisplay.textContent = `${secondNum} ${operationSelected} ${firstNum} =`;
          // secondNum = operate(operationSelected, +secondNum, +firstNum) + '';
          // mainDisplay.textContent = secondNum;
          
        } else {
          secondNum = operate(operationSelected, +secondNum, +firstNum) + '';
          operationSelected = btn.textContent;
          topDisplay.textContent = `${secondNum} ${operationSelected}`;
          mainDisplay.textContent = `${secondNum}`;
          firstNum = '';
          decimalInUse = false;
        }
        
      }
    }
  });
});
