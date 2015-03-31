//JS script

//Global variables
var canvas,
    cWidth,
    cHeight,
    stage,
    queue,
    centerSpriteSheet,
    leftToRightSpriteSheet,
    rightToLeftSpriteSheet,
    deadSpriteSheet,
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
    queue.on('progress', loadingScreen, this);
    queue.on('complete', drawMainMenu, this);
    queue.loadManifest([
        {id: 'bgMusic', src: 'resources/audio/MusicBG.mp3'},
        {id: 'bang', src: 'resources/audio/Gun_Shot.mp3'},
        {id: 'eject', src: 'resources/audio/Eject.mp3'},
        {id: 'empty', src: 'resources/audio/Empty.mp3'},
        {id: 'reload', src: 'resources/audio/Reload.mp3'},
        {id: 'die', src: 'resources/audio/targetDead1HerringGull3Cut.mp3'},
        {id: 'crosshair', src: 'resources/pictures/crosshair.png'},
        {id: 'bgImg2', src: 'resources/pictures/background-2.jpg'},
        {id: 'bullet', src: 'resources/pictures/bullet.png'},
        {id: 'bird', src: 'resources/pictures/target2Bird.png'},
        {id: 'dead', src: 'resources/pictures/targetDie.png'}
    ]);

    targetXPos = 60;
    targetYPos = 150;
    targetSpeedX = 3;
    targetSpeedY = 3;
    targetWidth = targetHeight = 64;
    explosionWidth = explosionHeight = 100;

}
//Call the init() function when it loads
window.addEventListener('load', init);

//The main drawing function
//This function will call all base components functions of the game.
function mainDraw() {

    stage.removeAllChildren();
    stage.update();
    
    //Create a Stage object to manipulate the canvas.
    stage = new createjs.Stage("canvas");

    var bgImg = new createjs.Bitmap(queue.getResult('bgImg2'));
    bgImg.scaleX = 0.8;
    bgImg.scaleY = 0.9;
    stage.addChild(bgImg);

    killCount = 0;
    shotCount = 0;

    drawInfoWrapper();
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