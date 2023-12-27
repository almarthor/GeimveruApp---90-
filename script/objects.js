

function Objects() {


};

Objects.prototype.spaceship = function(x,y,spaceship_image) {
  this.x = x;
  this.y = y;
  this.width = 64;
  this.height = 64;
  this.spaceship_image = spaceship_image;
  this.spaceship_image.src = "images/skip.png";
  return this;
};

Objects.prototype.bullet = function(x,y) {
    this.x = x;
    this.y = y;
    return this;

};

Objects.prototype.ufo = function(x, y, line, column, ufo_image) {
  this.x = x;
  this.y = y;
  this.line = line;
  this.column = column;
  this.width = 44;
  this.height = 44;
  this.ufo_image = ufo_image;
  this.ufo_image.src = "images/Untitled.png";
  return this;
};

Objects.prototype.bomb = function(x, y) {
  this.x = x;
  this.y = y;
  return this;
};
