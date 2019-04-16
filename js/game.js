'use strict';

function Game(board) {
  // eslint-disable-next-line no-undef
  this.userScore = new Score(0, 'Vinh');
  this.userSelects = [];
  this.cardsLeft = board.size*board.size;
  this.createBoard = function () {
    // eslint-disable-next-line no-undef
    board.deck = allCards;
    board.makeShuffledArray();
    board.renderGameBoard();
  };
  this.executeOrder66 = function () {
    var returnedOption = document.querySelector('input[name=card]:checked');
    if (returnedOption !== null) {
      this.flipCard(returnedOption);
      this.userSelects.push(returnedOption);
      this.disableCheckBox(returnedOption);
      if (this.userSelects.length === 2) {
        if (this.userSelects['0'].value === this.userSelects['1'].value) {
          this.matchSuccess();
        } else {
          this.matchFailure(this.userSelects['0'], this.userSelects['1']);
        }
        this.userSelects = [];
      }
      if (this.cardsLeft === 0) {
        alert(`Congrats, you won! Score: ${this.userScore.score}`);
      }
      formReset();
    }
  };

  this.disableCheckBox = function (checkBox) {
    checkBox.checked = false;
    checkBox.setAttribute('disabled', 'disabled');
  };

  this.matchSuccess = function () {
    console.log(this.cardsLeft);
    this.cardsLeft -= 2;
  };

  this.matchFailure = function (cardOne, cardTwo) {
    setTimeout(this.resetFlip, 1500, cardOne, cardTwo);
    cardOne.removeAttribute('disabled');
    cardTwo.removeAttribute('disabled');
    this.userScore.score++;
  };

  this.resetFlip = function (cardOne, cardTwo) {
    var flipTargetOne = cardOne.parentNode.childNodes['0'].childNodes['0'];
    var flipTargetTwo = cardTwo.parentNode.childNodes['0'].childNodes['0'];
    flipTargetOne.classList.remove('transform');
    flipTargetTwo.classList.remove('transform');
  };

  this.flipCard = function (inputCard) {
    var flipTarget = inputCard.parentNode.childNodes['0'].childNodes['0'];
    flipTarget.classList.add('transform');
  };

  this.undisableAllCards = function (uncheckBoxes) {
    for (let i = 0; i < uncheckBoxes.length; i++) {
      uncheckBoxes[i].removeAttribute('disabled');
    }
  };
}

// eslint-disable-next-line no-undef
var gaming = new Game(new GameBoard(2));
gaming.createBoard();
window.onload = function () {
  formReset();
  triggerEvents(true);
};
//convoluted way to get JS to recognize the proper "this" object
function triggerEvents(enabled) {
  if (enabled) {
    document.getElementById('game').addEventListener('click', runEvent, false);
  }
  else {
    document.getElementById('game').removeEventListener('click', runEvent);
  }
}

function runEvent() {
  gaming.executeOrder66();
}

function formReset() {
  var gameForm = document.getElementById('game');
  gameForm.reset();
}
