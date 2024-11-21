import "./style.css";

import { cardsArray } from "./arrays/cardsArray";
import { ICard } from "./contracts/ICards";

const cardContainer = document.getElementById("container") as HTMLDivElement;

let arrayForMatching: number[] = [];

// Kartenanzeige

const renderCards = (shuffle1: ICard[], shuffle2: ICard[]) => {
  const totalCards: ICard[] = [...shuffle1, ...shuffle2];

  totalCards.forEach((element: ICard) => {
    const card = document.createElement("div");
    card.classList.add("cards");
    card.textContent = element.emoji;

    cardContainer.appendChild(card);

    card.addEventListener("click", () => {
      card.classList.add("uncovered");

      arrayForMatching.push(element.id);
      checkMatchingCards();
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

      return (arrayForMatching = []);
    } else {
      console.log("Sorry, these two Cards are NOT matched");
      return (arrayForMatching = []);
    }
  }
}
