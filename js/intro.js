'use strict';


window.onpageshow = function () {
  var getForm = document.getElementById('game-mode');
  getForm.reset();
  getForm.addEventListener('click', function () {
    if (document.querySelector('input[name=mode]:checked') !== null) {
      getForm.submit();
    }
  });
  loopImage();
  getForm.addEventListener('keypress', function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  });
};

function loopImage() {
  var introCardSet = document.getElementsByClassName('intro-image');
  for (let i = 0; i < introCardSet.length; i++) {
    introCardSet[i].innerHTML = '';
    renderImage(retrieveCard(), introCardSet[i], i);
  }
  if (introCardSet[0].getElementsByTagName('input')[0].value === introCardSet[1].getElementsByTagName('input')[0].value) {
    setTimeout(activateTranslate, 1000, introCardSet);
  }
  setTimeout(loopImage, 4000);
}

function activateTranslate(introCardSet) {
  for (let i = 0; i < introCardSet.length; i++) {
    var cards = introCardSet[i].getElementsByClassName('card');
    if (i === 0) {
      cards[0].classList.add('intro-translate-left');
    } else {
      cards[0].classList.add('intro-translate-right');
    }
  }
}

function renderImage(card, container, index) {
  var newLabel = document.createElement('label');
  var newCardDiv = document.createElement('div');
  var cardFrontDiv = document.createElement('div');
  var cardBackDiv = document.createElement('div');
  var imgFront = document.createElement('img');
  var imgBack = document.createElement('img');
  var newInput = document.createElement('input');
  var imgDim = '100%';

  newLabel.setAttribute('for', index);
  newCardDiv.setAttribute('class', 'card');
  cardFrontDiv.setAttribute('class', 'front');
  newCardDiv.classList.add('intro-animation');
  imgFront.setAttribute('src', 'assets/cf-logo-shield.jpeg');
  imgFront.setAttribute('width', imgDim);
  imgFront.setAttribute('height', imgDim);
  cardBackDiv.setAttribute('class', 'back');
  imgBack.setAttribute('src', card.filePath);
  imgBack.setAttribute('width', imgDim);
  imgBack.setAttribute('height', imgDim);
  newInput.setAttribute('type', 'hidden');
  newInput.setAttribute('name', 'card');
  newInput.setAttribute('id', index);
  newInput.setAttribute('value', card.value);

  cardFrontDiv.appendChild(imgFront);
  cardBackDiv.appendChild(imgBack);
  newCardDiv.appendChild(cardFrontDiv);
  newCardDiv.appendChild(cardBackDiv);
  newLabel.appendChild(newCardDiv);
  container.appendChild(newLabel);
  container.appendChild(newInput);
}

function retrieveCard() {
  // eslint-disable-next-line no-undef
  return allCards[Math.floor(Math.random() * 10)];
}
