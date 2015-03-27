'use strict';

var crosshair,
    shotCooldown = 500,
    lastShot = Date.now();

function createCrosshair() {
    crosshair = new createjs.Bitmap(queue.getResult('crosshair'));
    stage.addChild(crosshair);
    stage.addEventListener('stagemousemove', moveCrosshair);
    stage.addEventListener('mousedown', handleClick);
}

function handleClick(event) {
    if((event.nativeEvent.button === 0) && (Date.now() - lastShot > shotCooldown)) { //Left click
        fire();
    }
    else if ((event.nativeEvent.button === 2) && (magazine.children.length === 0)) { //Right click
        createjs.Sound.play('reload');
        setTimeout(loadGun(), 2000);
        lastShot = Date.now();
    }
}

function moveCrosshair() {
    crosshair.x = stage.mouseX - 52;
    crosshair.y = stage.mouseY - 52;
}

function fire() {
    if(magazine.children.length > 0) {
        createjs.Sound.play('bang');
        createjs.Sound.play('eject');
        lastShot = Date.now();
        magazine.removeChildAt(magazine.children.length - 1);
    }
    else {
        createjs.Sound.play('empty');
    }
}

