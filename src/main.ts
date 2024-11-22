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
// let isMatched: boolean = false;

const renderCards = () => {
  const shuffleArr1: ICard[] = shuffle(cardsArray);
  const shuffleArr2: ICard[] = shuffle([...cardsArray]);
  const totalCards: ICard[] = [...shuffleArr1, ...shuffleArr2];

  totalCards.forEach((element: ICard) => {
    const card = document.createElement("div");
    card.classList.add("cards");

    const paragraph = document.createElement("p") as HTMLParagraphElement;
    paragraph.textContent = element.emoji;
    card.appendChild(paragraph);
    paragraph.classList.add("unvisible");
    cardContainer.appendChild(card);

    card.addEventListener("click", () => {
      card.classList.add("uncovered", element.emoji);
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

// Flipback

function flipCardsBack(card1: HTMLDivElement, card2: HTMLDivElement) {
  [card1, card2].forEach((card) => {
    card?.classList.remove("uncovered");

    const paragraph = card?.querySelector("p");

    paragraph?.classList.remove("visible");
    paragraph?.classList.add("unvisible");
  });

  // const uncoveredCards = document.querySelectorAll(".uncovered");
  // uncoveredCards.forEach((card) => {
  //   card.classList.remove("uncovered");
  //   const paragraph = card.querySelector("p");
  //   if (paragraph) {
  //     paragraph.classList.remove("visible");
  //     paragraph.classList.add("unvisible");
  //   }
  // });
}

function checkMatchingCards(): boolean {
  if (arrayForMatching.length === 2) {
    if (arrayForMatching[0].id === arrayForMatching[1].id) {
      console.log("Hurray! these two Cards are matched!");
      const matchedCard1 = document.querySelector(
        `.${arrayForMatching[0].emoji}`
      ) as HTMLDivElement;
      const matchedCard2 = document.querySelector(
        `.${arrayForMatching[1].emoji}`
      ) as HTMLDivElement;

      matchedCard1.classList.add("matched");
      matchedCard2.classList.add("matched");

      console.log("matched", matchedCard1, matchedCard2);

      guessedCounter++;
      arrayForMatching = [];

      return true;
    } else if (arrayForMatching[0].id !== arrayForMatching[1].id) {
      console.log("Sorry, these two Cards are NOT matched");

      const unmatchedCard1 = document.querySelector(
        `.${arrayForMatching[0].emoji}`
      ) as HTMLDivElement;
      const unmatchedCard2 = document.querySelector(
        `.${arrayForMatching[1].emoji}`
      ) as HTMLDivElement;

      if (unmatchedCard1 && unmatchedCard2) {
        setTimeout(() => {
          console.log("unmatched", unmatchedCard1, unmatchedCard2);

          flipCardsBack(unmatchedCard1, unmatchedCard2);
        }, 1000);
      }
      arrayForMatching = [];

      return false;
    }
  }
  return false;
}

startBtn?.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  clickCounter = 0;
  guessedCounter = 0;
  outputClicked.textContent = "";
  outputGuessed.textContent = "";

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
  outputGuessed.textContent = allMatchedCards.length.toString();
  if (allMatchedCards?.length === 12) {
    console.log("Congrats!! You win!");
  }
}
