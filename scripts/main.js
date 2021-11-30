

let mainText = '0';
let btmDisplay = document.querySelector('#bottom-display');
btmDisplay.textContent = mainText;

let btns = document.querySelectorAll('button');
btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    if (btn.textContent === '0' && mainText === '0') {
      btmDisplay.textContent = mainText;
    } else if (btn.className === 'number') {
      mainText += btn.textContent;
      btmDisplay.textContent = mainText.slice(1);
    }
  });
});

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

let firstNum = '';
let secondNum = '';
let operation = '';