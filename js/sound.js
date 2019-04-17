'use strict';

var bgm = document.getElementById('background_music');
var bgmToggle = document.getElementById('bgm_toggle');
var sfxToggle = document.getElementById('sfx_toggle');
var cardFlipSFX = document.getElementById('cardflipsfx'); // eslint-disable-line

var bgmToggleOnOff = function() {
  if (localStorage.disableBGM) {
    localStorage.removeItem('disableBGM');
    bgm.load();
  } else {
    localStorage.disableBGM = 1;
    bgm.pause();
  }
};

var sfxToggleOnOff = function() {
  if (localStorage.disableSFX) {
    localStorage.removeItem('disableSFX');
  } else {
    localStorage.disableSFX = 1;
  }
};

bgmToggle.addEventListener('click', bgmToggleOnOff);
sfxToggle.addEventListener('click', sfxToggleOnOff);

if (localStorage.disableBGM) {
  bgmToggle.checked = false;
  bgm.pause();
}

if (localStorage.disableSFX) {
  sfxToggle.checked = false;
}
