const wordEl = document.querySelector(".word");
const oldWordsEl = document.querySelector(".old-words");

// Wortliste
let words = [];
let currentWord = "";
let previousWords = [];

fetch("words.txt")
  .then(function (response) {
    return response.text();
  })
  .then(function (text) {
    words = text.split(",");
  });

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
