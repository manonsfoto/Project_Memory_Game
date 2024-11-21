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

let arrayForMatching: number[] = [];
let clickCounter: number = 0;
let guessedCounter: number = 0;
// Kartenanzeige

const renderCards = (shuffle1: ICard[], shuffle2: ICard[]) => {
  const totalCards: ICard[] = [...shuffle1, ...shuffle2];

  totalCards.forEach((element: ICard) => {
    const card = document.createElement("div");
    card.classList.add("cards");
    // card.textContent = element.emoji;
    // ====test
    const paragraph = document.createElement("p") as HTMLParagraphElement;
    paragraph.textContent = element.emoji;
    card.appendChild(paragraph);
    paragraph.classList.add("unvisible");
    // ====test

    cardContainer.appendChild(card);

    card.addEventListener("click", () => {
      card.classList.add("uncovered");
      // test
      paragraph.classList.remove("unvisible");
      paragraph.classList.add("visible");
      // test
      arrayForMatching.push(element.id);
      checkMatchingCards();
      countClick();
      countGuessed();
    });
  });
};

renderCards(shuffle(cardsArray), shuffle(cardsArray));

function shuffle(array: ICard[]) {
  return array.sort(() => Math.random() - 0.5);
}

function checkMatchingCards() {
  console.log(arrayForMatching);

  if (arrayForMatching.length === 2) {
    if (arrayForMatching[0] === arrayForMatching[1]) {
      console.log("Hurray! these two Cards are matched!");
      guessedCounter++;

      return (arrayForMatching = []);
    } else {
      console.log("Sorry, these two Cards are NOT matched");
      return (arrayForMatching = []);
    }
  }
}

startBtn?.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  clickCounter = 0;
  guessedCounter = 0;
  outputClicked.textContent = "";
  outputGuessed.textContent = "";

  renderCards(shuffle(cardsArray), shuffle(cardsArray));
});

function countClick() {
  clickCounter++;
  console.log(clickCounter);
  outputClicked.textContent = clickCounter.toString();
}

function countGuessed() {
  outputGuessed.textContent = guessedCounter.toString();
}
