

function Objects(){

};
Objects.prototype.spaceship = function (x,y,spaceship_image){
    this.x = x;
    this.y = y;
    this.width = 34;
    this.height = 38;
    this.spaceship_image = spaceship_image;
    this.spaceship_image.src = "images/skip.png";
    return this;
};