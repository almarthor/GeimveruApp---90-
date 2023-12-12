function TransferPosition(level) {
this.level = level;
this.fontSize = 140;
this.fontColor = 255;
}
TransferPosition.prototype.update = function(play) {
  this.fontSize -= 0.8;
  this.fontColor -= 1.5;

  if(this.fontSize < 1){
    play.goToPosition(new InGamePosition(play.setting,this.level));
  }
};

TransferPosition.prototype.draw = function(play) {
  ctx.clearRect(0,0, play.width, play.height);
  ctx.font= this.fontSize + "px Areal"
  ctx.textAlign = "center";
  ctx.fillstyle = "white";
  ctx.fillText("Anton er að koma!!!! ", play.width / 2, play.height/2);

  
  ctx.fillstyle = 'white';
  ctx.font = "40px Areal";
  ctx.fillText("Level : " + this.level, play.width / 2, play.height/2 +70);
}