const canvas = document.getElementById("ufoCanvas");
canvas.width = 900;
canvas.height = 750;
const ctx = canvas.getContext('2d');

function resize() {
  const height = window.innerHeight - 20;
  const ratio = canvas.width / canvas.height;
  const width = height * ratio;

  canvas.style.width = width + "px";
  canvas.style.height = height + "px";
}

window.addEventListener("load", resize, false);

// Game basics
function GameBasics(canvas) {
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;

  // active playing field
  this.playBoundaries = {
    top: 75,
    bottom: 650,
    left: 100,
    right: 800
  };

  // initial values
  this.level = 1;
  this.score = 0;
  this.shields = 2;

  this.setting = {
    // FPS: 240 frames per 1 second, this means 1 new frame every something seconds
    updateSeconds: 1 / 60,
    spaceshipSpeed: 400,
    bulletSpeed: 130,
    bulletMaxFrequency: 500, //how fast our spaceship can shoot after another

    ufoLines: 4, //ufo lines
    ufoColumns: 8, //ufo number
    ufoSpeed: 35, //ufo speed
    ufoSinkingValue: 30,

    bombSpeed: 75,
    bombFrequency: 0.05,
  };

  // we collect here the different positions, states of the game
  this.positionContainer = [];

  // we collect here the different positions, states of the game
  this.pressedKeys = {};
}

// Return to the current game position, status. Always returns the top element of positionContainer
GameBasics.prototype.presentPosition = function () {
  return this.positionContainer.length > 0 ? this.positionContainer[this.positionContainer.length - 1] : null;
};

// Move to the desired position
GameBasics.prototype.goToPosition = function (position) {
  // if we're already in a position clear the positionContainer.
  if (this.presentPosition()) {
    this.positionContainer.length = 0;
  }
  // If we find an 'entry' in a given position, we call it.
  if (position.entry) {
    position.entry(this);
  }
  // setting the current game position in the positionContainer
  this.positionContainer.push(position);
};

// Push our new position into the positionContainer
GameBasics.prototype.pushPosition = function (position) {
  this.positionContainer.push(position);
};

// Pop the position from the positionContainer
GameBasics.prototype.popPosition = function () {
  this.positionContainer.pop();
};

GameBasics.prototype.start = function () {
  setInterval(function () {
    gameLoop(play);
  }, this.setting.updateSeconds * 1000);
  // Go into the Opening position
  this.goToPosition(new OpeningPosition());
};

// Notifies the game when a key is pressed
GameBasics.prototype.keyDown = function (keyboardCode) {
  this.pressedKeys[keyboardCode] = true;
  // it calls the present position's keyDown function
  if (this.presentPosition() && this.presentPosition().keyDown) {
    this.presentPosition().keyDown(this, keyboardCode);
  }
};

// Notifies the game when a key is released
GameBasics.prototype.keyUp = function (keyboardCode) {
  // delete the released key from 'pressedKeys'
  delete this.pressedKeys[keyboardCode];
};

function gameLoop(play) {
  let presentPosition = play.presentPosition();

  if (presentPosition) {
    // update
    if (presentPosition.update) {
      presentPosition.update(play);
    }
    // draw
    if (presentPosition.draw) {
      presentPosition.draw(play);
    }
  }
}

// Keyboard events listening
window.addEventListener("keydown", function (e) {
  const keyboardCode = e.key || event.key;
  console.log("Keydown event fired. Code:", keyboardCode);

  if (keyboardCode == 'ArrowLeft' || keyboardCode == 'ArrowRight' || keyboardCode == 'Space') {
    e.preventDefault();
  }

  play.keyDown(keyboardCode);
});

window.addEventListener("keyup", function (e) {
  const keyboardCode = e.key || event.key;
  console.log("Keyup event fired. Code:", keyboardCode);

  play.keyUp(keyboardCode);
});

const play = new GameBasics(canvas);
play.start();
