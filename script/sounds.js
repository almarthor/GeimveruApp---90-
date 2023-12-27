function Sounds(){
    
}
Sounds.prototype.init = function(){
this.sound = new Audio();
this.sound.src = "sounds/shot.mp3";
this.sound.setAttribute("preload", "auto");
};

Sounds.prototype.playSound = function(soundName){
    if(soundName == 'shot'){
        this.sound.play();
    }
};
Sounds.prototype.mute = function(){

};