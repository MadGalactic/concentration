class BoardSquare {
  constructor(element, color) {
    this.element = element;
    this.element.addEventListener("click", this, false);
    this.isFaceUp = false;
    this.isMatched = false;
    this.setColor(color);
  }

  // TODO #2: add update this to be setImage
  setColor(color) {
    const faceUpElement = this.element.getElementsByClassName('faceup')[0];
    faceUpElement.classList.remove(this.color);
    this.color = color;
    faceUpElement.classList.add(color);
  }


  reset() {
    this.isFaceUp = false;
    this.isMatched = false;
    this.element.classList.remove('flipped');
  }

  matchFound() {
    this.isFaceUp = true;
    this.isMatched = true;
  }
  
  handleEvent(event) {
    switch (event.type) {
      case "click":
        if (this.isFaceUp || this.isMatched) {
          return;
        }
        this.isFaceUp = true;
        this.element.classList.add('flipped');

        squareFlipped(this);
    }
  }

}


function generateHTMLForBoardSquares() {
const numberOfSquares = 16;
let squaresHTML = '';

  // generate HTML for board squares
  for (let i = 0; i < numberOfSquares; i++) {
    squaresHTML +=
    '<div class="col-3 board-square">\n' +
    '<div class="face-container">\n' +
    '<div class="facedown"></div>\n' +
    '<div class="faceup"></div>\n' +
    '</div>\n' +
    '</div>\n';
  }

// insert squares HTML in DOM
const boardElement = document.getElementById('gameboard');
boardElement.innerHTML =  squaresHTML;
}

// TODO #3: Update to imagePairs
const colorPairs = [];

// TODO #4: Update to generateImagePairs
function generateColorPairs() {
  if (colorPairs.length > 0) {
    return colorPairs;
  } else {
    // generates matching pair for each color
    for (let i = 0; i < 8; i++) {
      colorPairs.push('color-' + i);
      colorPairs.push('color-' + i);
    }

    return colorPairs;
  }
}

function shuffle(array) {
  let currentIndex = array.length;
  let temporaryValue, randomIndex;

  // While there remain elements to shuffle
  while (0 !== currentIndex) {
    // pick a remaining element 
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element 
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;

}


// TODO #5: Update to shuffleImages
function shuffleColors() {
  const colorPairs = generateColorPairs()
  return shuffle(colorPairs);
}


const boardSquares = [];

function setupGame() {
  generateHTMLForBoardSquares();

  const randomColorPairs = shuffleColors();
  const squareElements = document.getElementsByClassName("board-square");

  for (let i = 0; i < squareElements.length; i++) {
    const element = squareElements[i];
    const color = randomColorPairs[i];
    const square = new BoardSquare(element, color)

    boardSquares.push(square);
  }
}

setupGame(); // DO NOT ERASE THIS OR GAME WILL NOT RUN

// Variable that holds a reference to the first faceup square. This helps to keep track of whether the square is the first or second square flipped. 
let firstFaceupSquare = null;

/*

When a square is flipped, the following should happen:
a. If the square is the first to be flipped face up, save a reference to it and do nothing else. 
b. If the square is the second to be flipped face up, check if it's face up color matches with the first square. 
c. If so, set the squares to matched and clear the reference of the first square. 
d. If not, flip both squares back to facedown and clear the reference to the first square.

*/

function squareFlipped(square) {
  // Check if the square is the first square to be flipped faceup.
  if (firstFaceupSquare === null){
    firstFaceupSquare = square;
    // If it is, set a reference to it and return from the function
    return;
  }

  // If the square is the second square to be flipped, check if it's faceup color matches the first faceup square's color.
  if (firstFaceupSquare.color === square.color) {
    // If both faceup colors for each square is the same, a match is made. Set both BoardSquare objects to matched 
    firstFaceupSquare.matchFound();
    square.matchFound();
    // clear the firstFaceupSquare variable so the player can keep playing.
    firstFaceupSquare = null;
  } else {
    // If the faceup colors aren't the same, reset each square to it's default (facedown) state.
    const a = firstFaceupSquare;
    const b = square;

    firstFaceupSquare = null;

    setTimeout(function() {
      a.reset();
      b.reset();
    }, 400);
  }

}

// Get a reference to the DOM element using the #reset-button id.
const resetButton = document.getElementById("reset-button");

// Add an event listener that monitors the element for click events.
resetButton.addEventListener('click', () => {
  // Log reset button clicked to the JavaScript console each time a click event occurs.
  resetGame();
});

// reset game 

function resetGame() {

  // Reset the firstFaceupSquare variable back to null.

  firstFaceupSquare = null;

  //Use the reset() method of BoardSquare to set both isFaceUp and isMatched back to false, as well as setting each square back to facedown.
  boardSquares.forEach((square) => {
    square.reset()
  });

  /* 
  Use the setTimeout() function to delay the execution of the code within setTimeout() by 500 milliseconds. 
  We do this because calling the reset() on each BoardSquare object will trigger the .face-container animation transition property.
  By delaying the shuffling of colors by 500ms, we don't interrupt the flipping animation.
  */
  setTimeout(() => {

    // Shuffle and randomize a new order for the color pairs.
    const randomColorPairs = shuffleColors();

    // Set each BoardSquare object in our boardSquares array with a new color based on our new shuffled colors.
    // TODO #6: Change colors to images
    for (let i=0; i < boardSquares.length; i++) {
      const newColor = randomColorPairs[i];
      const square = boardSquares[i];

      square.setColor(newColor);
    }

  }, 500);

}