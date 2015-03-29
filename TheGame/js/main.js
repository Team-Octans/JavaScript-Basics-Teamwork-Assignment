//JS script

//Global variables
var canvas,
    cWidth,
    cHeight,
    stage,
    queue,
    centerSpriteSheet,
    leftToRightSpriteSheet,
    rightT0LeftSpriteSheet,
    deadSpriteSheet,
    targetIsDead_f,
    targetAnimation,
    targetDeadAnimation,
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

    canvas.oncontextmenu = function(event) { event.preventDefault() }; // blocks context menu in canvas

    queue = new createjs.LoadQueue(false);
    queue.installPlugin(createjs.Sound);
    queue.on('complete', drawMainMenu, this);
    queue.loadManifest([
        {id: 'bang', src: 'resources/audio/Gun_Shot.mp3'},
        {id: 'eject', src: 'resources/audio/Eject.mp3'},
        {id: 'empty', src: 'resources/audio/Empty.mp3'},
        {id: 'reload', src: 'resources/audio/Reload.mp3'},
        {id: 'crosshair', src: 'resources/pictures/crosshair.png'},
        {id: 'bgImg', src: 'resources/pictures/backgroundImg.jpg'},
        {id: 'bullet', src: 'resources/pictures/bullet.png'},
        {id: 'bird', src: 'resources/pictures/target2Bird.png'},
        {id: 'dead', src: 'resources/pictures/targetDie.png'}
    ]);

    targetXPos = 60;
    targetYPos = 150;
    targetSpeedX = 2;
    targetSpeedY = 2;
    targetWidth = 64;
    targetHeight = 64;
    targetIsDead_f = false;

}
//Call the init() function when it loads
window.addEventListener('load', init);

//The main drawing function
//This function will call all base components functions of the game.
function mainDraw() {
    
    //Create a Stage object to manipulate the canvas.
    stage = new createjs.Stage("canvas");

    var bgImg = new createjs.Bitmap(queue.getResult('bgImg'));
    stage.addChild(bgImg);

    drawInitialBullets(); // bottom-right bullets
    drawClock();
    drawScore();
    createCrosshair();
    createTarget();

    // Add ticker
    createjs.Ticker.setFPS(60); // smoother fps
    createjs.Ticker.timingMode = createjs.Ticker.RAF;   // smoother
    createjs.Ticker.addEventListener('tick', stage);
    createjs.Ticker.addEventListener('tick', ticker);
}