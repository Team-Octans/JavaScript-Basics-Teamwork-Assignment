//JS script

//Global variables
var canvas,
    ctx,
    cWidth,
    cHeight;

//The main drawing function
function mainDraw() {
    //call the ctx object to draw
    ctx.font = "20px Verdana";
    ctx.fillText("The Game!", 100, 80);
}

function init(){
    canvas  = document.getElementById('canvas');
    cWidth  = canvas.width;
    cHeight = canvas.height;
    ctx     = canvas.getContext('2d'); // Set to 2d drawing. ctx - means context
                                       // We draw with this object
    mainDraw()
}

//Call the init() function when it loads
window.addEventListener('load', init);