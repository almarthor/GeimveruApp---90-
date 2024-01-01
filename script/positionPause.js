function PausePosition() {

}

PausePosition.prototype.draw = function (play) {
    ctx.clearRect(0, 0, play.width, play.height);
    ctx.font = "40px Areal";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("PÁSA", play.width / 2, play.height / 2 - 200);

    ctx.fillStyle = 'white';
    ctx.font = "36px";
    ctx.fillText("P: Til baka", play.width / 2, play.height / 2 - 150);
    ctx.fillText("ESC: Byrja uppá nýtt", play.width / 2, play.height / 2 - 110);

};

PausePosition.prototype.keyDown = function (play, keyboardCode) {
    if (keyboardCode == 'p') {
        play.popPosition();
    }

    if (keyboardCode == 'Escape') {
        play.pushPosition(new OpeningPosition());
    }
};
