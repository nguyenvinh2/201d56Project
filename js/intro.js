'use strict';


var getForm = document.getElementById('mode');

getForm.addEventListener('click', function() {
  if(document.querySelector('input[name=game-mode]:checked') !== null) {
    getForm.submit();
  }
});

