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
  this.shuffledArray = array.concat(array.slice());
  this.shuffledArray = shuffleArray(this.shuffledArray);
};

// Method to render the game board onto the html
GameBoard.prototype.renderGameBoard = function () {
  var table = document.getElementById('gameBoardTable');
  var arrayIndex = 0;
  for (let i = 0; i < this.size; i++) {
    var newRow = document.createElement('tr');
    for (let j = 0; j < this.size; j++) {
      var card = this.shuffledArray[arrayIndex++];
      var newCol = document.createElement('td');
      var newLabel = document.createElement('label');
      var newCardDiv = document.createElement('div');
      var cardFrontDiv = document.createElement('div');
      var cardBackDiv = document.createElement('div');
      var imgFront = document.createElement('img');
      var imgBack = document.createElement('img');
      var newInput = document.createElement('input');

      newCardDiv.setAttribute('class', 'card');
      cardFrontDiv.setAttribute('class', 'front');
      imgFront.setAttribute('src', '../assets/cf-logo-shield.jpeg');
      imgFront.setAttribute('width', this.imgDim);
      imgFront.setAttribute('height', this.imgDim);
      imgFront.setAttribute('alt', 'logo');
      imgFront.setAttribute('title', 'logo');
      cardBackDiv.setAttribute('class', 'back');
      imgBack.setAttribute('src', card.filePath);
      imgBack.setAttribute('width', this.imgDim);
      imgBack.setAttribute('height', this.imgDim);
      imgBack.setAttribute('alt', card.firstName + card.lastName);
      imgBack.setAttribute('title', card.firstName + card.lastName);
      newInput.setAttribute('id', Math.floor(Math.random() * 1000) + card.value);
      newInput.setAttribute('name', card.value);
      newInput.setAttribute('value', card.value);

      cardFrontDiv.appendChild(imgFront);
      cardBackDiv.appendChild(imgBack);
      newCardDiv.appendChild(cardFrontDiv);
      newCardDiv.appendChild(cardBackDiv);
      newLabel.appendChild(newCardDiv);
      newCol.appendChild(newLabel);
      newCol.appendChild(newInput);
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
gb.makeShuffledArray();
gb.renderGameBoard();
