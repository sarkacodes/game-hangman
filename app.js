"use strict";

const containerEl = document.querySelector(".game-container");
const lettersEl = document.querySelector(".game-container__letters");
const guessedWordEl = document.querySelector(".game-container__guessed-word");
const hangmanPathsEl = document.querySelectorAll(".hangman__path");
const popUpEl = document.querySelector(".popup");
const popUpMessageEl = document.querySelector(".popup__message");
const popUpButtonEl = document.querySelector(".popup__button");

let currentRandomWord = "";
let randomIndex = 0;
let currentPickedLetter;
let currentGuessedWord;
let numberOfAttempts = 10;

function getRandomWord() {
    randomIndex = Math.floor(Math.random() * wordList.length); // choose random index
    currentRandomWord = wordList[randomIndex]; // choose word based on random index
    wordList.splice(randomIndex, 1); // delete that word from the wordlist so it won't appear again
    return currentRandomWord;
}

function renderGuessedWord() {
    currentGuessedWord = getRandomWord().split("");
    currentGuessedWord.forEach((el, index) => guessedWordEl.appendChild(document.createElement("div")).classList.add("game-container__guessed-word__letter" + index));
}

function showGuessedLetters() {
    currentGuessedWord.forEach((el, index) => {
        if (currentPickedLetter === currentGuessedWord[index]) {
            guessedWordEl.querySelector(".game-container__guessed-word__letter" + index).textContent = currentPickedLetter;
        }
    });
}

function showPopUp(message) {
    containerEl.style.opacity = ".3";
    popUpEl.style.visibility = "visible";
    popUpEl.classList.toggle("show");
    popUpMessageEl.textContent = message;
}

function checkGameState() {
    let numberOfGuessedLetters = 0;

    if (numberOfAttempts === 0) {
        showPopUp(`You lost. The guessed word was ${currentGuessedWord.join('')}.`);
        lettersEl.querySelectorAll("div").forEach((el) => el.classList.add("disabled"));
    }

    guessedWordEl.querySelectorAll("[class^='game-container__guessed-word__letter']").forEach((el) => {
        if (el.innerHTML.trim().length > 0) {
            numberOfGuessedLetters++;
        }

        if (numberOfGuessedLetters === currentGuessedWord.length) {
            showPopUp("You won!");
            lettersEl.querySelectorAll("div").forEach((el) => el.classList.add("disabled"));
        }
    });
}

const guessLetters = (e) => {
    let target = e.target;
    currentPickedLetter = target.innerText;

    if (target.classList.contains("disabled")) {
        return;
    } else {
        target.classList.add("disabled");
    }

    if (currentGuessedWord.includes(currentPickedLetter)) {
        showGuessedLetters();
    } else {
        document.querySelector(".hangman__path" + numberOfAttempts).style.visibility = "visible";
        numberOfAttempts--;
    }

    checkGameState();
};

function restartGame() {
    currentRandomWord = "";
    randomIndex = 0;
    currentPickedLetter;
    currentGuessedWord = [];
    numberOfAttempts = 10;

    containerEl.style.opacity = "1";

    guessedWordEl.textContent = "";

    popUpEl.style.visibility = "hidden";
    popUpEl.classList.toggle('show');

    lettersEl.querySelectorAll("div").forEach((el) => {
        if (el.classList.contains("disabled")) {
            el.classList.remove("disabled");
        }
    });

    hangmanPathsEl.forEach((el) => (el.style.visibility = "hidden"));

    getRandomWord();
    renderGuessedWord();
}

function startUp() {
    lettersEl.querySelectorAll("div").forEach((el) => {
        el.addEventListener("click", guessLetters), false;
    });

    popUpButtonEl.addEventListener("click", restartGame), false;
    getRandomWord();
    renderGuessedWord();
}

startUp();
