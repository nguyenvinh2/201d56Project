'use strict';


window.onpageshow = function () {
  var getForm = document.getElementById('game-mode');
  getForm.reset();
  getForm.addEventListener('click', function () {
    if (document.querySelector('input[name=mode]:checked') !== null) {
      getForm.submit();
    }
  });
};


