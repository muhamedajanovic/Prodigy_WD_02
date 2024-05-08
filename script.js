let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let lapCount = 0;

const display = document.getElementById('display');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapDisplayContainer = document.getElementById('lapDisplayContainer');

function formatTime(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  const millisecondsFormatted = (milliseconds % 1000).toString().slice(0, 1);
  return `${minutes}:${seconds}:${millisecondsFormatted}`;
}

function updateDisplay() {
  display.textContent = formatTime(elapsedTime);
}

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    startStopButton.textContent = 'Start';
  } else {
    startTime = Date.now() - elapsedTime;
    timer = setInterval(function () {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    startStopButton.textContent = 'Stop';
  }
  isRunning = !isRunning;
}

function reset() {
  clearInterval(timer);
  startStopButton.textContent = 'Start';
  elapsedTime = 0;
  updateDisplay();
  isRunning = false;
  lapDisplayContainer.innerHTML = '';
  lapCount = 0;
}

function lap() {
  lapCount++;
  const lapTime = formatTime(elapsedTime);
  const lapDisplay = document.createElement('div');
  lapDisplay.textContent = `Lap ${lapCount}: ${lapTime}`;
  lapDisplayContainer.appendChild(lapDisplay);
}

startStopButton.addEventListener('click', startStop);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', lap);
