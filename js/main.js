class BoardSquare {
  constructor(element, color) {
    this.element = element;
    this.isFaceUp = false;
    this.isMatched = false;
    this.setColor(color);
  }

  setColor(color) {
    const faceUpElement = this.element.getElementsByClassName('faceup')[0];
    this.color = color;
    faceUpElement.classList.add(color);
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


const colorPairs = [];

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

function shuffleColors() {
  const colorPairs = generateColorPairs()
  return shuffle(colorPairs);
}

const boardSquares = [];

function setupGame() {
  generateHTMLForBoardSquares();

  const randomColorPairs = shuffleColors();
  // 1
  const squareElements = document.getElementsByClassName("board-square");

  // 2
  for (let i = 0; i < squareElements.length; i++) {
    const element = squareElements[i];
    const color = randomColorPairs[i];
    // 3
    const square = new BoardSquare(element, color)

    // 4
    boardSquares.push(square);
  }
}

setupGame(); // DO NOT ERASE THIS OR GAME WILL NOT RUN