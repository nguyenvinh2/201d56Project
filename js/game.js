'use strict';

function Game(board) {
  // eslint-disable-next-line no-undef
  this.userScore = new Score(0, 'Vinh');
  this.userSelects = [];
  this.cardsLeft = board.size * board.size;

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
          this.matchSuccess(this.userSelects['0']);
        } else {
          this.matchFailure(this.userSelects['0'], this.userSelects['1']);
        }
        this.userSelects = [];
      }
      formReset();
    }
  };

  this.disableCheckBox = function (checkBox) {
    checkBox.checked = false;
    checkBox.setAttribute('disabled', 'disabled');
  };

  this.matchSuccess = function (cardInput) {
    this.cardsLeft -= 2;
    if (this.cardsLeft === 0) {
      this.runWinEvents();
    } else {
      // eslint-disable-next-line no-undef
      var cardObject = allCards.find((card) => {
        if (cardInput.value === card.value.toString()) {
          return card;
        }
      });
      this.makeModal(cardObject);
    }
  };

  this.makeModal = function (modal) {
    var getModal = document.getElementById('card-modal');
    var getTitle = document.getElementById('title-modal');
    var getImage = document.getElementById('img-modal');
    var getDesc = document.getElementById('desc-modal');
    getTitle.textContent = modal.firstName.toUpperCase();
    getImage.setAttribute('src', `${modal.filePath}`);
    getDesc.textContent = modal.facts;
    revealModal(getModal);
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
    if (!localStorage.disableSFX) {
      cardFlipSFX.play();
    }
    flipTargetOne.classList.remove('transform');
    flipTargetTwo.classList.remove('transform');
  };

  this.flipCard = function (inputCard) {
    var flipTarget = inputCard.parentNode.childNodes['0'].childNodes['0'];
    if (!localStorage.disableSFX) {
      cardFlipSFX.play();
    }
    flipTarget.classList.add('transform');
  };

  this.runWinEvents = function() {
    var cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.add('finish');
    }
  };
}

// eslint-disable-next-line no-undef
var gaming = new Game(new GameBoard(4));
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

function revealModal(getModal) {
  getModal.style.display = 'block';
}

function hideModal(getModal) {
  getModal.style.display = 'none';
}

document.getElementById('card-modal').addEventListener('click', (event) => {
  var getModal = document.getElementById('card-modal');
  if (event.target === getModal) {
    hideModal(getModal);
  }
}, false);
