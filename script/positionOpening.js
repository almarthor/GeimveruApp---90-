
function OpeningPosition(){

}

OpeningPosition.prototype.draw = function(play,){
 

ctx.clearRect(0,0, play.width, play.height);
ctx.font="80px Areal";
ctx.textAlign="center";
const gradient = ctx.createLinearGradient((play.width/2 - 180), (play.height/2), (play.width/2+180), (play.height/2));
gradient.addColorStop("0","white");
gradient.addColorStop("0.5","red");
gradient.addColorStop("1.0","white");
ctx.fillStyle = gradient;
ctx.fillText("ANTON´s INNRÁS", play.width / 2, play.height/2 - 70);


ctx.font="40px Areal";
ctx.fillStyle = 'white';
ctx.fillText("Ýttu á 'Space' til að byrja.", play.width /2,play.height/2);



ctx.fillStyle = 'white';
ctx.fillText("BJARGAÐU HEIMINUM FRÁ ANTONI", play.width/2, play.height/2 + 210);
ctx.fillText("Vinstri : Ferðu til vinstri", play.width/2, play.height/2 + 260);
ctx.fillText("Hægri : Ferðu til hægri", play.width/2, play.height/2 + 300);
ctx.fillText("Space : Skýturðu", play.width/2, play.height/2 + 340);


};

OpeningPosition.prototype.keyDown = function (play, keyboardCode) {
  if (keyboardCode == " ") {
    play.goToPosition(new TransferPosition(play.level));
  }
};
