import "./style.css";

import { cardsArray } from "./arrays/cardsArray";
import { ICard } from "./contracts/ICards";

const cardContainer = document.getElementById("container") as HTMLDivElement;

// Kartenanzeige

const renderCards = (shuffle1: ICard[], shuffle2: ICard[]) => {
  const totalCards: ICard[] = [...shuffle1, ...shuffle2];

  totalCards.forEach((element: ICard) => {
    console.log(element);

    const card = document.createElement("div");
    card.classList.add("cards");
    card.textContent = element.emoji;

    cardContainer.appendChild(card);

    card.addEventListener("click", () => {
      card.classList.add("uncovered");
    });

    return cardContainer;
  });
};

renderCards(shuffle(cardsArray), shuffle(cardsArray));

function shuffle(array: ICard[]) {
  return array.sort(() => Math.random() - 0.5);
}

// ===test
const shuffledArray = shuffle(cardsArray);
console.log(shuffledArray);
