const numberOfSquares = 16;
let squaresHTML = '';

// generate HTML for board squares
for (let i=0; i < numberOfSquares; i++) {
  squaresHTML += `
  <div class="col-3 board-square">
  <div class="face-container">
    <div class="facedown"></div>
    <div class="faceup"></div>
  </div>
</div>`;
}


const boardElement = document.getElementById('gameboard');
boardElement.innerHTML =  squaresHTML;