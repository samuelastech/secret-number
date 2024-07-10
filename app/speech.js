import { maxValue, minValue, secretNumber } from "./number.js";

const guessElement = document.querySelector('#guess');

window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
recognition.lang = 'pt-Br';
recognition.start();
let ended = false;

recognition.addEventListener('result', onSpeak);

function onSpeak(event) {
  const transcript = event.results[0][0].transcript.slice(0, -1);
  show(transcript);
  validInput(transcript);
}

function show(attempt) {
  guessElement.innerHTML = `
    <div>Você disse:</div>
    <span class="box">${attempt}</span>
  `;
}

function validInput(transcript) {
  const number = parseInt(transcript);
  if (Number.isNaN(number)) {
    guessElement.innerHTML += "<div>Você precisa dizer um número!</div>";
  } else if (!isBetweenRange(number)) {
    guessElement.innerHTML += `<div>Tente de novo um número entre ${minValue} e ${maxValue}</div>`;
  } else if (number > secretNumber) {
    guessElement.innerHTML += `<div>O número secreto é menor <i class="fa-solid fa-arrow-down"></i></div>`;
  } else if (number < secretNumber) {
    guessElement.innerHTML += `<div>O número secreto é maior <i class="fa-solid fa-arrow-up"></i></div>`;
  } else {
    ended = true;
    document.body.innerHTML = `
      <h2>Você acertou!</h2>
      <h3>O número secreto era ${secretNumber}</h3>
      <button id='play-again' class='app-button'>Jogar Novamente</button>
    `;
    const button = document.querySelector('#play-again');
    button.onclick = () => window.location.reload();
  }
}

function isBetweenRange(number) {
  return number >= minValue && number <= maxValue;
}

recognition.addEventListener('end', () => {
  ended ? null : recognition.start();
});
