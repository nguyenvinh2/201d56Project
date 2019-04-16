'use strict';

var bgm = document.getElementById('background_music');
var bgmToggle = document.getElementById('bgm_toggle');

var bgmToggleOnOff = function(e) {
  if (localStorage.disableBGM) {
    localStorage.removeItem('disableBGM');
    bgm.load();
  } else {
    localStorage.disableBGM = 1;
    bgm.pause();
  }
};

bgmToggle.addEventListener('click', bgmToggleOnOff);

if (localStorage.disableBGM) {
  bgmToggle.checked = false;
  bgm.pause();
}
