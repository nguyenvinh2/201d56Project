// The following modal js is from:
// https://www.w3schools.com/howto/tryit.asp?filename=tryhow_css_modal

// Get the modal
var hsModal = document.getElementById('hiscoremodal');

// Get the button that opens the modal
var hsBtn = document.getElementById('hiscorebtn');

// Get the <span> element that closes the modal
var hsSpan = document.getElementById('hiscore-modal-close');

// When the user clicks the button, open the modal
hsBtn.onclick = function() {
  renderHiScores();
  hsModal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
hsSpan.onclick = function() {
  hsModal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target === hsModal) {
    hsModal.style.display = 'none';
  }
};

var renderHiScores = function() {
  var scoresListEl = document.getElementById('hi-scores-list');
  var scores = [];
  scores.forEach(function(score) {
    var newLI = document.createElement('li');
    newLI.textContent = `${score[0]} ${score[1]}`;
    scoreListEL.appendChild(newLI);
  });
};
