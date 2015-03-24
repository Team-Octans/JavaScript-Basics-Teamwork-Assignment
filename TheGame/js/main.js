//JS script

//Global variables
var canvas,
    ctx,
    cWidth,
    cHeight,
    stage,
    spriteSheet,
    animation,
    targetXPos,
    targetYPos;

//Initialize the global variables and call the mainDraw() function
function init(){
    canvas  = document.getElementById('canvas');
    cWidth  = canvas.width;
    cHeight = canvas.height;
    ctx     = canvas.getContext('2d'); // Set to 2d drawing. ctx - means context
                                       // We draw with this object
    targetXPos = 100;
    targetYPos = 100;

    mainDraw();
}
//Call the init() function when it loads
window.addEventListener('load', init);

//The main drawing function
//This function will call all base components functions of the game.
function mainDraw() {
    //This is like a background of the background. It will load first
    //call the ctx object to draw
    ctx.font = "20px Verdana";
    ctx.fillText("The Game!", 100, 80);

    //Create a Stage object to manipulate the canvas.
    stage = new createjs.Stage("canvas");
    var bgImg = new createjs.Bitmap("resources/pictures/backgroundImg.jpg");
    stage.addChild(bgImg);

    //Add any new child here
    //...

    // Create target
    createTarget();

    // Add ticker
    createjs.Ticker.setFPS(15);
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', ticker);
}