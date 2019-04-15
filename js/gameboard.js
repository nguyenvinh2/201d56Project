'use strict';

// GameBoard constructor
var GameBoard = function() {
  this.size = 0;
  this.deck = [];
  this.imgDim = '125';
  this.shuffledArray = [];
};

// Method to build two randomized arrays built from the gameboard's deck
GameBoard.prototype.makeShuffledArray = function() {
  var array = shuffleArray(this.deck).slice(0, (this.size * this.size) / 2);
  console.log('length of temp array', array.length);
  this.shuffledArray = array.concat(array.slice());
  this.shuffledArray = shuffleArray(this.shuffledArray);
};

// Method to render the game board onto the html
GameBoard.prototype.renderGameBoard = function () {
  var table = document.getElementById('gameBoard');
  var arrayIndex = 0;
  for (let i = 0; i < this.size; i++) {
    var newRow = document.createElement('tr');
    for (let j = 0; j < this.size; j++) {
      var card = this.shuffledArray[arrayIndex++];
      var newCol = document.createElement('td');
      var newLabel = document.createElement('label');
      var newInput = document.createElement('input');
      var outerDiv = document.createElement('div');
      var imgDivTop = document.createElement('div');
      var imgDivBottom = document.createElement('div');
      var cardTopImg = document.createElement('img');
      var cardBottomImg = document.createElement('img');

      newLabel.setAttribute('id',
                            Math.floor(Math.random() * 1000) + card.value);
      newLabel.setAttribute('value', card.value);
      newInput.setAttribute('type', 'checkbox');
      outerDiv.setAttribute('class', 'card');
      imgDivTop.setAttribute('class', 'front');
      imgDivBottom.setAttribute('class', 'bottom');
      cardTopImg.setAttribute('src', '../assets/cf-logo-shield.jpeg');
      cardTopImg.setAttribute('width', this.imgDim);
      cardBottomImg.setAttribute('src', card.filePath);
      cardBottomImg.setAttribute('width', this.imgDim);

      imgDivTop.appendChild(cardTopImg);
      imgDivBottom.appendChild(cardBottomImg);
      outerDiv.appendChild(imgDivTop);
      outerDiv.appendChild(imgDivBottom);
      newLabel.appendChild(newInput);
      newLabel.appendChild(outerDiv);
      newCol.appendChild(newLabel);
      newRow.appendChild(newCol);
    }
    table.appendChild(newRow);
  }
};

// Helper function
// Returns a randomized array built from the input array
// Fisher-Yates in-place array shuffle
// Found here: https://bost.ocks.org/mike/shuffle/
var shuffleArray = function(inputArray) {
  var array = inputArray.slice();
  var remainingElements = array.length;
  var tempElementHolder = 0;
  var randomIndex = 0;

  // While there remain elements to shuffle…
  while (remainingElements) {

    // Pick a remaining element…
    randomIndex = Math.floor(Math.random() * remainingElements--);

    // And swap it with the current element.
    tempElementHolder = array[remainingElements];
    array[remainingElements] = array[randomIndex];
    array[randomIndex] = tempElementHolder;
  }

  return array;
};

// The following for testing purposes
var gb = new GameBoard();
gb.deck = allCards;
gb.size = 6; // Use even numbers for now
gb.makeShuffledArray()
gb.renderGameBoard();
