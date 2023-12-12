function TransferPosition(level) {

}

TransferPosition.prototype.draw = function(play) {
  ctx.clearRect(0, 0, play.width, play.height);
  ctx.font="40px Areal";
  ctx.fillStyle = "grey";
  ctx.fillText("Anton hefur gert innrás, reyndu að stoppa hann", play.width / 2, play.height/2);
};