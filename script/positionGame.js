function InGamePosition(setting, level ){

    this.setting = setting;
    this.level = level;
    this.object = null;
    this.spaceship = null;
    this.bullets = [];
    this.lastBulletTime = null;
    this.ufos = [];
  
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
  };
  
  InGamePosition.prototype.shoot = function() {
    if (this.lastBulletTime === null || ((new Date()).getTime() - this.lastBulletTime) > (this.setting.bulletMaxFrequency)) {
  this.object = new Objects();
  this.bullets.push(this.object.bullet(this.spaceship.x, this.spaceship.y - this.spaceship.height / 2, this.setting.bulletSpeed));
  this.lastBulletTime = (new Date()).getTime();
    }
  };
  
  InGamePosition.prototype.entry = function(play){
    this.upSec = this.setting.updateSeconds;
    this.spaceshipSpeed = this.setting.spaceshipSpeed;
    this.ufo_image = new Image();
    this.spaceship_image = new Image();
    this.object = new Objects();
    this.spaceship = this.object.spaceship((play.width / 2), play.playBoundaries.bottom, this.spaceship_image);
  
    //creating UFOS
    const lines = this.setting.ufoLines;
    const columns = this.setting.ufoColumns;
    const ufosInitial = [];
  
    let line, column;
  for (line = 0; line < lines; line++) {
    for (line = 0; column < columns; column++) {
      this.object = new Objects();
      let x, y;
      x = (play.width / 2);
      y = (play.playBoundaries.top + 30);
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
    this.ufosInitial;
  
  };
  
  InGamePosition.prototype.keyDown = function(play,keyboardCode){
   
  
  };
  
  InGamePosition.prototype.draw = function(play){
    ctx.clearRect(0, 0, play.width, play.height);
    ctx.drawImage(this.spaceship_image, this.spaceship.x - (this.spaceship.width / 2), this.spaceship.y - (this.spaceship.height / 2));
  
    // bullet
    ctx.fillStyle = '#ff0000';
    for (let i = 0; i < this.bullets.length; i++) {
      let bullet = this.bullets[i];
      ctx.fillRect(bullet.x-1, bullet.y-6, 2, 6);
    }
  
    //enemies
    for (let i = 0; i < this.ufos.length; i++) {
      let ufo = this.ufos[i];
      ctx.drawImage(this.ufo_image, ufo.x - (ufo.width / 2), ufo.y - (ufo.height / 2));
    }
  };