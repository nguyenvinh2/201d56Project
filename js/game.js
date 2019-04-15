'use strict';

var score = 0;

function Game() {
  this.executeOrder66 = function () {
    this.flipCard();
    var checkBoxesReturned = document.querySelectorAll('input[name=card]:checked');
    if (checkBoxesReturned.length === 1) {
      this.disableCheckBox(checkBoxesReturned['0']);
    } else if (checkBoxesReturned.length === 2) {
      formReset();
      if (checkBoxesReturned['0'].value === checkBoxesReturned['1'].value) {
        this.matchSuccess();
      } else {
        score++;
        console.log(score, 'no match');
      }
    } else {
      console.log('something has gone wrong');
    }
  };

  this.disableCheckBox = function(checkBox) {
    checkBox.setAttribute('disabled', 'disabled');
  };

  this.matchSuccess = function() {
  };

  this.matchFailure = function() {
    score++;
    this.resetFlip();
  };

  this.resetFlip = function() {
  };

  this.flipCard = function() {
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
