'use strict';

var crosshair,
    lastShot = Date.now();

function createCrosshair() {
    crosshair = new createjs.Bitmap(queue.getResult('crosshair'));
    stage.addChild(crosshair);
    stage.addEventListener('stagemousemove', moveCrosshair);
    stage.addEventListener('mousedown', shoot);
}

function shoot() {
    if(Date.now() - lastShot > 500) {
        createjs.Sound.play('bang');
        createjs.Sound.play('eject');
        lastShot = Date.now();
    }
}

function moveCrosshair() {
    crosshair.x = stage.mouseX - 52;
    crosshair.y = stage.mouseY - 52;
}

