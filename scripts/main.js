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
    case '*':
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
function writeNum(e) {
  let character;
  if (e.key) {
    switch (e.key) {
      case '.':
      case '0':
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
        character = e.key;   
        break;
      default:
        return;
    }
  } else { // e.key is false, keyboard event false
    character = e.target.textContent;
  }

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
function setOperation(e) {
  let operation;
  if (e.key) {
    switch (e.key) {
      case '/':
        operation = '÷';
        break;
      case 'Enter':
        operation = '=';
        break;
      case '*':
      case '-':
      case '+':
        operation = e.key;
        break;
      default:
        return;
    }
  } else {
    operation = e.target.textContent;
  }

  if (!operationSelected) { 
    if (!firstNum) { 
      if (!secondNum) {
        return;
      } else { // secondNum true
        topDisplay.textContent = `${secondNum} ${operationSelected} ${firstNum} ${operation}`; // top display shows secondNum and button content/new operator
        operationSelected = operation;
      }
    } else { // firstNum true
      if (operation === '=') {
        return;
      } else { // btn is *-+÷         
        secondNum = firstNum;
        firstNum = '';
        operationSelected = operation;
        decimalInUse = false;
        topDisplay.textContent = `${secondNum} ${operationSelected}`;
      }
    }
  } else { // operationSelected true, secondNum also true
    if (!firstNum) { // if firstNum false/undefined
      if (operation === '=') {
        return;
      } else { // btn is *-+÷
        operationSelected = operation;
        topDisplay.textContent = `${secondNum} ${operationSelected}`;
      }
    } else { // firstNum true
      result = doMath(operationSelected, +secondNum, +firstNum);
      mainDisplay.textContent = result;
      if (operation === '=') {
        topDisplay.textContent = `${secondNum} ${operationSelected} ${firstNum} ${operation}`;
        operationSelected = '';
      } else { // btn is *-+÷
        operationSelected = operation;
        topDisplay.textContent = `${result} ${operationSelected}`;
      }
      decimalInUse = false;
      secondNum = result;
      firstNum = '';
    }
  }
}

clearBtn.addEventListener('click', reset);
deleteBtn.addEventListener('click', backspace);
nmbrBtns.forEach((btn) => {
  btn.addEventListener("click", writeNum);
});


oprtrBtns.forEach((btn) => {
  btn.addEventListener('click', setOperation);
});


window.addEventListener('keydown', (e) => {
  writeNum(e);
  setOperation(e);
});






// window.addEventListener('keydown', (e) => {
//   console.log(e);
//   console.log(e.type === 'keydown');
// });


// window.addEventListener('keydown', function(e) {
//   let character = e.key
//   ? e.key === 'Enter'
//     ? '='
//     : e.key
//   : e.target.textContent;

//   let character;
//   if (e.key) {
//     switch (e.key) {
//       case '.':
//       case '0':
//       case '1':
//       case '2':
//       case '3':
//       case '4':
//       case '5':
//       case '6':
//       case '7':
//       case '8':
//       case '9':
//         character = e.key;
//         break;
//       default:
//         character = e.target.textContent
//     }
//   } 


// console.log(character);
//   // console.log(e.key == 'Enter');
// });







// oprtrBtns.forEach((btn) => {
//   btn.addEventListener('click', () => {
//     if (!operationSelected) { 
//       if (!firstNum) { 
//         if (!secondNum) {
//           return;
//         } else { // secondNum true
//           topDisplay.textContent = `${secondNum} ${operationSelected} ${firstNum} ${btn.textContent}`; // top display shows secondNum and button content/new operator
//           operationSelected = btn.textContent;
//         }
//       } else { // firstNum true
//         if (btn.textContent === '=') {
//           return;
//         } else { // btn is *-+÷         
//           secondNum = firstNum;
//           firstNum = '';
//           operationSelected = btn.textContent;
//           decimalInUse = false;
//           topDisplay.textContent = `${secondNum} ${operationSelected}`;
//         }
//       }
//     } else { // operationSelected true, secondNum also true
//       if (!firstNum) { // if firstNum false/undefined
//         if (btn.textContent === '=') {
//           return;
//         } else { // btn is *-+÷
//           operationSelected = btn.textContent;
//           topDisplay.textContent = `${secondNum} ${operationSelected}`;
//         }
//       } else { // firstNum true
//         result = doMath(operationSelected, +secondNum, +firstNum);
//         mainDisplay.textContent = result;
//         if (btn.textContent === '=') {
//           topDisplay.textContent = `${secondNum} ${operationSelected} ${firstNum} ${btn.textContent}`;
//           operationSelected = '';
//         } else { // btn is *-+÷
//           operationSelected = btn.textContent;
//           topDisplay.textContent = `${result} ${operationSelected}`;
//         }
//         decimalInUse = false;
//         secondNum = result;
//         firstNum = '';
//       }
//     }
//   });
// });