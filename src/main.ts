import "./style.css";

import { cardsArray } from "./arrays/cardsArray";
import { ICard } from "./contracts/ICards";

function shuffle(array: ICard[]) {
  return array.sort(() => Math.random() - 0.5);
}

// ===test
const shuffledArray = shuffle(cardsArray);
console.log(shuffledArray);
