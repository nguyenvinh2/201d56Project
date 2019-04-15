'use strict';

function Game() {
  this.executeOrder66 = function () {
    var checkBoxesReturned = document.querySelectorAll('input[name=card]:checked');
    if (checkBoxesReturned.length === 1) {
      this.flipCard(checkBoxesReturned['0']);
      this.disableCheckBox(checkBoxesReturned['0']);
    } else if (checkBoxesReturned.length === 2) {
      this.disableCheckBox(checkBoxesReturned['1']);
      var uncheckBoxes = document.querySelectorAll('input[name=card]:not(:disabled)');
      this.disableAllCards(uncheckBoxes);
      this.flipCard(checkBoxesReturned['1']);
      setTimeout(this.undisableAllCards, 2100, uncheckBoxes);
      if (checkBoxesReturned['0'].value === checkBoxesReturned['1'].value) {
        this.matchSuccess();
      } else {
        this.matchFailure(checkBoxesReturned['0'], checkBoxesReturned['1']);
      }
    }
  };

  this.disableCheckBox = function(checkBox) {
    checkBox.setAttribute('disabled', 'disabled');
    console.log('hello');
  };

  this.matchSuccess = function() {
    formReset();
  };

  this.matchFailure = function(cardOne, cardTwo) {
    setTimeout(this.resetFlip, 2000, cardOne, cardTwo);
    formReset();
    cardOne.removeAttribute('disabled');
    cardTwo.removeAttribute('disabled');

  };

  this.resetFlip = function(cardOne, cardTwo) {
    var flipTargetOne = cardOne.parentNode.childNodes['1'].childNodes['1'];
    var flipTargetTwo = cardTwo.parentNode.childNodes['1'].childNodes['1'];
    flipTargetOne.classList.remove('transform');
    flipTargetTwo.classList.remove('transform');

  };

  this.flipCard = function(inputCard) {
    var flipTarget = inputCard.parentNode.childNodes['1'].childNodes['1'];
    flipTarget.classList.add('transform');
  };

  this.disableAllCards = function(uncheckBoxes) {
    for(let i = 0; i < uncheckBoxes.length; i++) {
      console.log('veofore the stomrm');
      this.disableCheckBox(uncheckBoxes[i]);
    }
  };

  this.undisableAllCards = function(uncheckBoxes) {
    for(let i = 0; i < uncheckBoxes.length; i++) {
      uncheckBoxes[i].removeAttribute('disabled');
    }
  };
}

window.onload = function () {
  formReset();
  var gaming = new Game();
  triggerEvents(gaming);
};
//convoluted way to get JS to recognize the proper "this" object
function triggerEvents(gaming) {
  document.getElementById('game').addEventListener('click', function runEvent() {
    gaming.executeOrder66();
  }, false);
}

function formReset() {
  var gameForm = document.getElementById('game');
  gameForm.reset();
}
