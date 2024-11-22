import "./style.css";
import { confetti } from "@tsparticles/confetti";

import { cardsArray } from "./arrays/cardsArray";
import { ICard } from "./contracts/ICards";

const cardContainer = document.getElementById("container") as HTMLDivElement;
const startBtn = document.querySelector("#game-btn") as HTMLButtonElement;
const outputClicked = document.querySelector("#pairs-clicked") as HTMLSpanElement;
const outputGuessed = document.querySelector("#pairs-guessed") as HTMLSpanElement;

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
            randomBurst();
            singleBurst();
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
        // Show the modal
        const modal = document.getElementById("winModal") as HTMLElement;
        modal.style.display = "flex";

        // Close modal functionality
        const closeModal = document.getElementById("closeModal") as HTMLElement;
        closeModal.addEventListener("click", () => {
            modal.style.display = "none";
        });

        // Animations & Sounds

        const duration = 15 * 1000,
            animationEnd = Date.now() + duration,
            defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        function randomInRange(min: any, max: any) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);

            // since particles fall down, start a bit higher than random
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                })
            );
            confetti(
                Object.assign({}, defaults, {
                    particleCount,
                    origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                })
            );
        }, 250);
    }
}

function randomBurst() {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    // Randomize the origin position
    const randomX = Math.random();
    const randomY = Math.random();

    // Trigger the confetti burst
    confetti(
        Object.assign({}, defaults, {
            particleCount: 100, // Number of particles
            origin: { x: randomX, y: randomY }, // Random position
        })
    );
}

function singleBurst() {
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    // Trigger the confetti burst
    confetti(
        Object.assign({}, defaults, {
            particleCount: 100, // Number of particles in the burst
            origin: { x: 0.5, y: 0.5 }, // Center of the screen
        })
    );
}
