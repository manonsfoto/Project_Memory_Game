import "./style.css";

import { cardsArray } from "./arrays/cardsArray";
import { ICard } from "./contracts/ICards";

const cardContainer = document.getElementById("container") as HTMLDivElement;
const startBtn = document.querySelector("#game-btn") as HTMLButtonElement;
const outputClicked = document.querySelector(
  "#pairs-clicked"
) as HTMLSpanElement;
const outputGuessed = document.querySelector(
  "#pairs-guessed"
) as HTMLSpanElement;

let arrayForMatching: ICard[] = [];
let clickCounter: number = 0;
let guessedCounter: number = 0;
let lockBoard: boolean = false;

const renderCards = () => {
  const totalCards: ICard[] = shuffle(cardsArray);

  totalCards.forEach((element: ICard) => {
    const card = document.createElement("div");
    card.classList.add("cards");

    const paragraph = document.createElement("p") as HTMLParagraphElement;
    paragraph.textContent = element.emoji;
    card.appendChild(paragraph);
    paragraph.classList.add("unvisible");
    cardContainer.appendChild(card);

    card.addEventListener("click", () => {
      if (lockBoard || card.classList.contains("uncovered")) return;

      card.classList.add("uncovered", element.name);
      paragraph.classList.remove("unvisible");
      paragraph.classList.add("visible");

      arrayForMatching.push(element);
      checkMatchingCards();
      countClick();
      // countGuessed();
      winGame();
    });
  });
};

renderCards();

function shuffle(array: ICard[]) {
  return array.sort(() => Math.random() - 0.5);
}

function flipCardsBack(card1: HTMLDivElement, card2: HTMLDivElement) {
  [card1, card2].forEach((card) => {
    card?.classList.remove("uncovered");

    const paragraph = card?.querySelector("p");
    paragraph?.classList.add("unvisible");
    paragraph?.classList.remove("visible");
  });
}

function checkMatchingCards() {
  if (arrayForMatching.length === 2) {
    lockBoard = true;
    if (arrayForMatching[0].id === arrayForMatching[1].id) {
      console.log("Hurray! these two Cards are matched!");
      const matchedCard1 = document.querySelector(
        `.${arrayForMatching[0].name}`
      ) as HTMLDivElement;
      const matchedCard2 = document.querySelector(
        `.${arrayForMatching[1].name}`
      ) as HTMLDivElement;

      matchedCard1.classList.add("matched");
      matchedCard2.classList.add("matched");

      console.log("matched", matchedCard1, matchedCard2);

      guessedCounter++;
      arrayForMatching = [];
      lockBoard = false;
      // *=============================================================
    } else if (arrayForMatching[0].id !== arrayForMatching[1].id) {
      console.log("Sorry, these two Cards are NOT matched");

      const unmatchedCard1 = document.querySelector(
        `.${arrayForMatching[0].name}`
      ) as HTMLDivElement;
      const unmatchedCard2 = document.querySelector(
        `.${arrayForMatching[1].name}`
      ) as HTMLDivElement;

      if (unmatchedCard1 && unmatchedCard2) {
        setTimeout(() => {
          console.log("unmatched", unmatchedCard1, unmatchedCard2);

          flipCardsBack(unmatchedCard1, unmatchedCard2);
          lockBoard = false;
        }, 1000);
      }
      arrayForMatching = [];
    }
  }
}

startBtn?.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  clickCounter = 0;
  guessedCounter = 0;
  outputClicked.textContent = "";
  outputGuessed.textContent = "";
  clearInterval(interval);
  startCount(3);
  renderCards();
});

function countClick() {
  clickCounter++;
  console.log(clickCounter);
  outputClicked.textContent = Math.floor(clickCounter / 2).toString();
}

// function countGuessed() {
//   outputGuessed.textContent = guessedCounter.toString();
// }

function winGame() {
  const allMatchedCards = document.querySelectorAll(".matched");
  console.log("allmatchedcards length:", allMatchedCards.length);
  outputGuessed.textContent = Math.floor(allMatchedCards.length / 2).toString();
  if (allMatchedCards?.length === 24) {
    clearInterval(interval);
    console.log("Congrats!! You win!");
  }
}

// =========timer function
const time = document.querySelector("#time") as HTMLDivElement;
let counter: number = 0;
let interval: number;
const displayTime = () => {
  let counterMinutes: number = Math.floor(counter / 60);
  let counterSeconds: number = counter - 60 * counterMinutes;

  time.textContent = `${counterMinutes
    .toString()
    .padStart(2, "0")}:${counterSeconds.toString().padStart(2, "0")}`;
};

const startCount = (minutesValue: number) => {
  if (minutesValue) {
    counter = minutesValue * 60;

    interval = setInterval(() => {
      counter--;
      displayTime();

      if (counter === 0) {
        clearInterval(interval);
        console.log("Time is Out!");
        // game soll deaktiviert werden
      }
    }, 1000);
  }
};
startCount(3);
// ========================
