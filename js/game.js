'use strict';

function Game(board) {
  // eslint-disable-next-line no-undef
  this.userScore = new Score(0, window.location.search.split('&')[0].split('=')[1]);
  this.gameMode = gameDifficulty()[0];
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
    this.changeScore(true);
    displayInfo();
    // eslint-disable-next-line no-undef
    var cardObject = allCards.find((card) => {
      if (cardInput.value === card.value.toString()) {
        return card;
      }
    });
    this.makeModal(cardObject);
    if (this.cardsLeft === 0) {
      this.runWinEvents();
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
    this.changeScore(false);
    displayInfo();
  };

  this.resetFlip = function (cardOne, cardTwo) {
    var flipTargetOne = cardOne.parentNode.childNodes['0'].childNodes['0'];
    var flipTargetTwo = cardTwo.parentNode.childNodes['0'].childNodes['0'];
    if (!localStorage.disableSFX) {
      // eslint-disable-next-line no-undef
      cardFlipSFX.play();
    }
    flipTargetOne.classList.remove('transform');
    flipTargetTwo.classList.remove('transform');
  };

  this.flipCard = function (inputCard) {
    var flipTarget = inputCard.parentNode.childNodes['0'].childNodes['0'];
    if (!localStorage.disableSFX) {
      // eslint-disable-next-line no-undef
      cardFlipSFX.play();
    }
    flipTarget.classList.add('transform');
  };

  this.changeScore = function (status) {
    switch (status) {
    case true:
      switch (this.gameMode) {
      case 'easy':
        this.userScore.score += 4;
        break;
      case 'medium':
        this.userScore.score += 6;
        break;
      case 'hard':
        this.userScore.score += 8;
        break;
      }
      break;
    case false:
      this.userScore.score -= 1;
      break;
    }
  };

  this.runWinEvents = function () {
    this.userScore.toLocalStorage();
    var cards = document.getElementsByClassName('card');
    for (let i = 0; i < cards.length; i++) {
      cards[i].classList.add('finish');
    }
  };
}

// global code execution
// eslint-disable-next-line no-undef
var gaming = new Game(new GameBoard(gameDifficulty()[1]));
gaming.createBoard();
window.onload = function () {
  formReset();
  triggerEvents(true);
  displayInfo();
};

function gameDifficulty() {
  var modeArray = new Array(2);
  modeArray[0] = window.location.search.split('&')[1].split('=')[1];
  switch (modeArray[0]) {
  case 'easy':
    modeArray[1] = 4;
    return modeArray;
  case 'medium':
    modeArray[1] = 6;
    return modeArray;
  case 'hard':
    modeArray[1] = 8;
    return modeArray;
  }
}

//convoluted way to get JS to recognize the proper "this" object
function triggerEvents(enabled) {
  if (enabled) {
    document.getElementById('game').addEventListener('click', runEvent, false);
  }
  else {
    document.getElementById('game').removeEventListener('click', runEvent, false);
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

function displayInfo() {
  var name = window.location.search.split('&')[0].split('=')[1];
  var appendName = document.getElementById('user-info').getElementsByTagName('p')[0];
  var appendScore = document.getElementById('user-info').getElementsByTagName('p')[1];
  appendName.textContent = `Hi ${name.replace(/\+/g, ' ')}!`;
  appendScore.textContent = `Points: ${gaming.userScore.score}`;
}

document.getElementById('card-modal').addEventListener('click', () => {
  var getModal = document.getElementById('card-modal');
  hideModal(getModal);
}, false);


console.log(gaming.gameMode);
