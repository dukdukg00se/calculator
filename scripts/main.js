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
function setFirstDigit(char) {
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
  btn.addEventListener("click", writeNum);
});

function writeNum(e) {
  let character = e.key
  ? e.key === 'Enter'
    ? '='
    : e.key
  : e.target.textContent;

  if (!firstNum) {
    firstNum += setFirstDigit(character);
  } else { // firstNum true
    if (firstNum === '0') {
      firstNum = '';
      firstNum += setFirstDigit(character);
    } else { // num not 0, can be .1-9
      if (character === '.') {
        if (decimalInUse === false) {
          firstNum += character;
          decimalInUse = true;
        } else { // decimalInUse
          return;
        }
      } else { //num equal 1-9
        firstNum += character;
      }
    }
  }
  mainDisplay.textContent = firstNum;
}




oprtrBtns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!operationSelected) { 
      if (!firstNum) { 
        if (!secondNum) {
          return;
        } else { // secondNum true
          topDisplay.textContent = `${secondNum} ${operationSelected} ${firstNum} ${btn.textContent}`; // top display shows secondNum and button content/new operator
          operationSelected = btn.textContent;
        }
      } else { // firstNum true
        if (btn.textContent === '=') {
          return;
        } else { // btn is x-+÷         
          secondNum = firstNum;
          firstNum = '';
          operationSelected = btn.textContent;
          decimalInUse = false;
          topDisplay.textContent = `${secondNum} ${operationSelected}`;
        }
      }
    } else { // operationSelected true, secondNum also true
      if (!firstNum) { // if firstNum false/undefined
        if (btn.textContent === '=') {
          return;
        } else { // btn is x-+÷
          operationSelected = btn.textContent;
          topDisplay.textContent = `${secondNum} ${operationSelected}`;
        }
      } else { // firstNum true
        result = doMath(operationSelected, +secondNum, +firstNum);
        mainDisplay.textContent = result;
        if (btn.textContent === '=') {
          topDisplay.textContent = `${secondNum} ${operationSelected} ${firstNum} ${btn.textContent}`;
          operationSelected = '';
        } else { // btn is x-+÷
          operationSelected = btn.textContent;
          topDisplay.textContent = `${result} ${operationSelected}`;
        }
        decimalInUse = false;
        secondNum = result;
        firstNum = '';
      }
    }
  });
});




window.addEventListener('keydown', writeNum);

// window.addEventListener('keydown', function(e) {
//   let character = e.key
//   ? e.key === 'Enter'
//     ? '='
//     : e.key
//   : e.target.textContent;

//   console.log('character: ' + character);
//   console.log(e.key == 'Enter');
// });