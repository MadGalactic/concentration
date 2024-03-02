const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;

document.querySelector(".score").textContent = score;

fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

  function shuffleCards() {
    let currentIndex = cards.length,
      randomIndex,
      temporaryValue;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = cards[currentIndex];
      cards[currentIndex] = cards[randomIndex];
      cards[randomIndex] = temporaryValue;
    }
  }

  function generateCards() {
    for (let card of cards) {
      const cardElement = document.createElement("div");
      cardElement.classList.add("card");
      cardElement.setAttribute("data-name", card.name);
      cardElement.innerHTML = `
        <div class="front">
          <img class="front-image" src=${card.image} />
        </div>
        <div class="back"></div>
      `;
      gridContainer.appendChild(cardElement);
      cardElement.addEventListener("click", flipCard);
    }
  }

function flipCard(){
  // start by checking if the board is locked. if so, the function returns, preventing any cards from being flipped 
  if (lockBoard) 
    return;
  // If the player clicks on the same card twice, the function also returns, avoiding any unwanted behavior
  if (this === firstCard) 
    return;

  // The card that was clicked is then given the class "flipped", which causes it to flip over and reveal its image
  this.classList.add("flipped");

  // If this is the first card being flipped, the "firstCard" variable is set to the card that was clicked. 
  if (!firstCard) {
    firstCard= this;
    return;
  }
  secondCard = this;
  document.querySelector(".score").textContent = score;
  lockBoard = true;
  
  checkForMatch();

}

function checkForMatch(){
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  if(isMatch) {
    disableCards();
    incrementScore(); // Call the function to increment score if there's a match
  } else {
    unflipCards();
  }

}

function incrementScore() {
  score++; // Increment the score
  document.querySelector(".score").textContent = score; // Update the score on the UI
}


function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000)
}

function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}

function displayWinner (){

}



