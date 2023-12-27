function InGamePosition(setting, level ){

  this.setting = setting;
  this.level = level;
  this.object = null;
  this.spaceship = null;
  this.bullets = [];
  this.lastBulletTime = null;
  this.ufos = [];
  this.bombs = [];

}

InGamePosition.prototype.update = function(play,){

  const spaceship = this.spaceship;
  const spaceshipSpeed = this.spaceshipSpeed;
  const upSec = this.setting.updateSeconds;
  const bullets = this.bullets;



  if (play.pressedKeys["ArrowLeft"]) {
    spaceship.x -= spaceshipSpeed * upSec;
  }
  if (play.pressedKeys["ArrowRight"]) {
    spaceship.x += spaceshipSpeed * upSec;
  }

  // if user fires: hits spaceship
  if(play.pressedKeys[" "]) {
    this.shoot();
  }

  if(spaceship.x < play.playBoundaries.left) {
    spaceship.x = play.playBoundaries.left;
  }

  if(spaceship.x > play.playBoundaries.right) {
    spaceship.x = play.playBoundaries.right;
  }

  //moving bullets
  for (let i = 0; i < bullets.length; i++) {
    let bullet = bullets[i];
    bullet.y -= upSec * this.setting.bulletSpeed;
    //if our bullet flies out from canvas it will be cleared
    if (bullet.y < 0) {
      bullets.splice(i--, 1);
    }
  }

  //movements of ufos
  let reachedSide = false;


  for (let i = 0; i < this.ufos.length; i++){
    let ufo = this.ufos[i];
    let fresh_x = ufo.x + this.ufoSpeed * upSec * this.turnAround * this.horizontalMoving;
    let fresh_y = ufo.y + this.ufoSpeed * upSec * this.verticalMoving;

    if(fresh_x > play.playBoundaries.right || fresh_x < play.playBoundaries.left){
      this.turnAround *= -1;
      reachedSide = true;
      this.horizontalMoving = 0;
      this.verticalMoving = 1;
      this.ufosAreSinking = true;
    }

    if(reachedSide !== true){
      ufo.x = fresh_x;
      ufo.y = fresh_y;
    }
  }

  if (this.ufosAreSinking == true) {
    this.ufoPresentSinkingValue += this.ufoSpeed * upSec;
    if (this.ufoPresentSinkingValue >= this.setting.ufoSinkingValue) {
    this.ufosAreSinking = false;
    this.verticalMoving = 0;
    this.horizontalMoving = 1;
    this.ufoPresentSinkingValue = 0;
    }
  }

  // UFOS bombing
  // sorting ufos - wich are not at tye bottom of each column
  const frontLineUFOs = [];
  for (let i = 0; i < this.ufos.length; i++) {
    let ufo = this.ufos[i];
    if (!frontLineUFOs[ufo.column] || frontLineUFOs[ufo.column].line < ufo.line) {
      frontLineUFOs[ufo.column] = ufo;
    }
  }

  //give a chance for bombing
  for(let i = 0; i < this.setting.ufoColumns; i++) {
    let ufo = frontLineUFOs[i];
    if (!ufo) continue;
    let chance = this.bombFrequency * upSec;
    this.object = new Objects();
    if ( chance > Math.random()) {
      //make a bom object and put it into bombs array
      this.bombs.push(this.object.bomb(ufo.x, ufo.y + ufo.height / 2));
    }
  }

  //Moving Bomb
  for (let i = 0; i < this.bombs.length; i++) {
    let bomb = this.bombs[i];
    bomb.y += upSec * this.bombSpeed;
    //if our bomb falls out from canvas it will be cleared
    if (bomb.y > this.height) {
      this.bomb.splice(i--, 1);
    }
  }

  // ufo-bullet colission
  for (let i = 0; i < this.ufos.length; i++){
    let ufo = this.ufos[i];
    let collision = false;
    for ( let j = 0; j < bullets.length; j++){
      let bullet = bullets[j];
      //collision check
      if(bullet.x >= (ufo.x - ufo.width / 2) && bullet.x <= (ufo.x + ufo.width / 2) &&
        bullet.y >= (ufo.y - ufo.height / 2) && bullet.y <= (ufo.y + ufo.height / 2 )){
        bullets.splice(j--, 1);
        collision = true;
      }
    }
    // if there is collision we delete ufo
    if(collision == true){
      this.ufos.splice(i--, 1);
    }
  }
  //spaceship-bomb collision
  for( let i = 0; i < this.bombs.length; i++){
    let bomb = this.bombs[i];
    if(bomb.x + 2 >= (spaceship.x - spaceship.width / 4)&&
      bomb.x - 2 <= (spaceship.x + spaceship.width / 4) &&
      bomb.y + 6 >= (spaceship.y - spaceship.height / 3)&&
      bomb.y <= (spaceship.y + spaceship.height / 3)){
        //collision deletes bomb
        this.bombs.splice(i--, 1);
        //spaceship hit
        play.goToPosition(new OpeningPosition());
      }
  }
  //spaceship ufo hit
  for( let i = 0; i < this.ufos.length; i++){
    let ufo = this.ufos[i];
    if((ufo.x + ufo.width) > (spaceship.x - spaceship.width / 4)&&
      (ufo.x - ufo.width) < (spaceship.x + spaceship.width / 4) &&
      (ufo.y + ufo.height) > (spaceship.y - spaceship.height / 3)&&
      (ufo.y - ufo.height) < (spaceship.y + spaceship.height / 3)){
      
        //spaceship hit
        play.goToPosition(new OpeningPosition());
      }
  }  
  
};

InGamePosition.prototype.shoot = function() {
  if (this.lastBulletTime === null || ((new Date()).getTime() - this.lastBulletTime) > (this.setting.bulletMaxFrequency)) {
this.object = new Objects();
this.bullets.push(this.object.bullet(this.spaceship.x, this.spaceship.y - this.spaceship.height / 2, this.setting.bulletSpeed));
this.lastBulletTime = (new Date()).getTime();
  }
};

InGamePosition.prototype.entry = function(play){
  this.horizontalMoving = 1;
  this.verticalMoving = 0;
  this.ufosAreSinking = false;
  this.ufoPresentSinkingValue = 0;
  this.turnAround = 1;
  this.upSec = this.setting.updateSeconds;
  this.spaceshipSpeed = this.setting.spaceshipSpeed;
  this.ufo_image = new Image();
  this.spaceship_image = new Image();
  this.object = new Objects();
  this.spaceship = this.object.spaceship((play.width / 2), play.playBoundaries.bottom, this.spaceship_image);

  // Values that change with levels (1. UFO speed, 2. Bomb falling speed, 4 Bomb dropping frequency)
  let presentLevel = this.level;
// 1. UFO speed
  this.ufoSpeed = this.setting.ufoSpeed + (presentLevel * 7);
//  2.bomb falling speed
this.bombSpeed = this.setting.bombSpeed + (presentLevel * 10);
//  3.bomb dropping freq
this.bombFrequency = this.setting.bombFrequency + (presentLevel * 0.05);


//creating UFOS
  const lines = this.setting.ufoLines;
  const columns = this.setting.ufoColumns;
  const ufosInitial = [];

  let line, column;
for (line = 0; line < lines; line++) {
for (column = 0; column < columns; column++) {

    this.object = new Objects();
    let x, y;
    x = (play.width / 2) + (column * 70) - ((columns - 1) * 35);
    y = (play.playBoundaries.top) + (line * 55);
    ufosInitial.push(this.object.ufo(
      x,
      y,
      line,
      column,
      this.ufo_image
    ));
    console.log('line: ' + line + ' column: ' + column + ' x:' + x + ' y:' + y);
    }
  
  }
  this.ufos = ufosInitial;


};

InGamePosition.prototype.keyDown = function(play,keyboardCode){
 

};

InGamePosition.prototype.draw = function(play){
  ctx.clearRect(0, 0, play.width, play.height);
  ctx.drawImage(this.spaceship_image, this.spaceship.x - (this.spaceship.width / 2), this.spaceship.y - (this.spaceship.height / 2));

  // bullet
  ctx.fillStyle = '#FE2EF7';
  for (let i = 0; i < this.bullets.length; i++) {
    let bullet = this.bullets[i];
    ctx.fillRect(bullet.x-1, bullet.y -4 , 4, 10);
  }

  //enemies
  for (let i = 0; i < this.ufos.length; i++) {
    let ufo = this.ufos[i];
    ctx.drawImage(this.ufo_image, ufo.x - (ufo.width / 2), ufo.y - (ufo.height / 2));
  }

  //bombs
  ctx.fillStyle = '#ff0000';
  for (let i = 0; i < this.bombs.length; i++) {
    let bomb = this.bombs[i];
    ctx.fillRect(bomb.x - 2, bomb.y, 8, 6);
  }
};