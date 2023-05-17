const wordEl = document.querySelector(".word");
const competitiveWordEl = document.querySelector("#competitive-game .word");
const oldWordsEl = document.querySelector(".old-words");

const chooseGameEl = document.querySelector("#choose-game");
const normalGameEl = document.querySelector("#normal-game");
const competitiveGameEl = document.querySelector("#competitive-game");
const timeEl = document.querySelector(".time");
const gameEndEl = document.querySelector("#game-end");
const scoredPointsEl = document.querySelector(".scored-points");

const ROUND_TIME = 10; // 60s = 1min

// Wortliste
let words = [];
let currentWord = "";
let previousWords = [];

let points = 0;

fetch("words.txt")
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    words = text.split(",");
  });

// Starte ein normales Spiel
function startNormalGame() {
  // Verstecke Start Screen
  chooseGameEl.classList.add("hidden");
  // Zeige normales Spiel
  normalGameEl.classList.remove("hidden");
}

// Starte ein Wettkampf Spiel
function startCompetitiveGame() {
  // Verstecke Start Screen
  chooseGameEl.classList.add("hidden");
  // Zeige Wettkampf Spiel
  competitiveGameEl.classList.remove("hidden");
  // Generiere erstes Wort
  generateAndDisplayNewCompetitiveWord();
  // Startzeit anzeigen
  timeEl.innerHTML = ROUND_TIME;
  // Starte den Timer
  let remainingTime = ROUND_TIME;
  const intervalId = setInterval(function () {
    remainingTime -= 1;
    timeEl.innerHTML = remainingTime;

    if (remainingTime < 1) {
      // Intervall stoppen
      clearInterval(intervalId);
      // End screen anzeigen
      competitiveGameEl.classList.add("hidden");
      gameEndEl.classList.remove("hidden");
      // Punktzahl anzeigen
      scoredPointsEl.innerHTML = points;
    }
  }, 1000); // Jede Sekunde einmal ausführen
  // Zeit auf der Seite aktualisieren
}

function restartCompetitiveGame() {
  // Punktestand resetten
  points = 0;
  // Endscreen verstecken
  gameEndEl.classList.add("hidden");
  // Spiel starten
  startCompetitiveGame();
}

function competitiveButtonClick(buttonEl) {
  if (buttonEl.id === "button-correct") {
    points += 1;
  }

  generateAndDisplayNewCompetitiveWord();
  console.log(points);
}

function generateAndDisplayNewCompetitiveWord() {
  const newWord = getRandomWord();
  competitiveWordEl.innerHTML = newWord;
}

// Das hier passiert, wenn wir auf den button klicken
function onClick() {
  if (currentWord) {
    // Wenn wir gerade noch ein Wort anzeigen, so fügen wir dieses den vorherigen Wörtern hinzu
    previousWords.push(currentWord);
    // Danach aktualisieren wir noch unsere Website, um den neuen Wert anzuzeigen
    oldWordsEl.innerHTML = previousWords.join(", ");
  }
  // Neues Wort generieren und als aktuelles Wort speichern
  currentWord = getRandomWord();
  // Danach aktualisieren wir unsere Website, um das neue Wort anzuzeigen
  wordEl.innerHTML = currentWord;
}

function getRandomNumber(maxNumber) {
  return Math.floor(Math.random() * maxNumber);
}

function getRandomWord() {
  return words[getRandomNumber(words.length)];
}
