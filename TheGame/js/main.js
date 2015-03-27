//JS script

//Global variables
var canvas,
    ctx,
    cWidth,
    cHeight,
    stage,
    queue,
    spriteSheet,
    targetAnimation,
    targetXPos,
    targetYPos,
    targetSpeedX,
    targetSpeedY,
    targetWidth,
    targetHeight;

//Initialize the global variables and call the mainDraw() function
function init(){
    canvas = document.getElementById('canvas');
    cWidth = canvas.width;
    cHeight = canvas.height;
    console.log(cWidth);
    console.log(cHeight);

    ctx = canvas.getContext('2d'); // Set to 2d drawing. ctx - means context
                                       // We draw with this object

    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on('complete', mainDraw, this);
    queue.loadManifest([
        {id: 'bang', src: 'resources/audio/Gun_Shot.mp3'},
        {id: 'eject', src: 'resources/audio/Eject.mp3'},
        {id: 'empty', src: 'resources/audio/Empty.mp3'},
        {id: 'reload', src: 'resources/audio/Reload.mp3'},
        {id: 'crosshair', src: 'resources/pictures/crosshair.png'},
        {id: 'bgImg', src: 'resources/pictures/backgroundImg.jpg'},
        {id: 'bullet', src: 'resources/pictures/bullet.png'}
    ]);

    targetXPos = 60;
    targetYPos = 150;
    targetSpeedX = 5;
    targetSpeedY = 5;
    targetWidth = 48;
    targetHeight = 48;

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
    var bgImg = new createjs.Bitmap(queue.getResult('bgImg'));
    stage.addChild(bgImg);

    drawInitialBullets(stage); // bottom-right bullets 
    createCrosshair();
    createTarget();
    

    // Add ticker
    createjs.Ticker.setFPS(60); // smoother fps
    createjs.Ticker.timingMode = createjs.Ticker.RAF;   // smoother
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', ticker);
}

function doNothing(event) { //Blocks the context menu from appearing
    event.preventDefault();
}