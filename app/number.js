const maxValue = 100;
const minValue = 0;
const secretNumber = drawNumber();

const minValueEl = document.querySelector('#min-value');
const maxValueEl = document.querySelector('#max-value');

maxValueEl.innerText = maxValue;
minValueEl.innerText = minValue;

function drawNumber() {
  const random = Math.floor(Math.random() * maxValue + 1);
  return random < minValue ? random + minValue : random;
}

export { maxValue, minValue, secretNumber };
