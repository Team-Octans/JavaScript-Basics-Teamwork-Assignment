var killCount;

function createTarget()
{
    //setting the target
    centerSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('bird')],
        "frames": { "width": targetWidth, "height": targetHeight },
        "framerate": 15,
        "animations": { "target": [12, 15] }
    });
    leftToRightSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('bird')],
        "frames": { "width": targetWidth, "height": targetHeight },
        "framerate": 15,
        "animations": { "target": [4, 7] }
    });
    rightToLeftSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('bird')],
        "frames": { "width": targetWidth, "height": targetHeight },
        "framerate": 15,
        "animations": { "target": [0, 3] }
    });
    deadSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('dead')],
        "frames": { "width": 100, "height": 100 },
        "framerate": 15,
        "animations": { "die": [0, 10] }
    });

    createEnemy();
}

function createEnemy() {
    targetAnimation = new createjs.Sprite(centerSpriteSheet, "target");
    targetAnimation.regX = targetWidth / 2;
    targetAnimation.regY = targetHeight / 2;
    targetAnimation.x = targetXPos;
    targetAnimation.y = targetYPos;
    targetAnimation.gotoAndPlay("target");
    stage.addChildAt(targetAnimation, 1);
}
function enemyDeath() {
    targetDeadAnimation = new createjs.Sprite(deadSpriteSheet, "die");
    targetDeadAnimation.regX = explosionWidth / 2;
    targetDeadAnimation.regY = explosionHeight / 2;
    targetDeadAnimation.x = targetXPos;
    targetDeadAnimation.y = targetYPos;
    targetDeadAnimation.gotoAndPlay("die");
    stage.addChild(targetDeadAnimation);
}

function normalizeStartPosition(coord) { //Ensures the bird will always cross most of the screen
    if(coord === 'x') {
        if((targetSpeedX > 0 && targetXPos > cWidth * 0.5) ||
            (targetSpeedX < 0 && targetXPos < cWidth * 0.5)) {
            targetXPos = cWidth * 0.5;
        }
    }
    else if (coord === 'y') {
        if((targetSpeedY > 0 && targetYPos > cHeight * 0.5) ||
            (targetSpeedY < 0 && targetYPos < cHeight * 0.5)) {
            targetYPos = cHeight * 0.5;
        }
    }
}

function ticker()
{
        //Move the target
        //right and left
        if (targetXPos < (cWidth + targetWidth * 1.5) && targetXPos >= -targetWidth) {
            targetXPos += targetSpeedX;
        } else {
            targetAnimation.spriteSheet = (targetSpeedX > 0) ? rightToLeftSpriteSheet : leftToRightSpriteSheet;
            targetYPos = cHeight * Math.random();
            normalizeStartPosition('y');
            targetSpeedX *= (-1);
            targetXPos += targetSpeedX;
        }

        //top  and bottom
        if (targetYPos < (cHeight + targetHeight * 1.5) && targetYPos >= -targetHeight) {
            targetYPos += targetSpeedY;
        } else {
            targetAnimation.spriteSheet = (targetSpeedX < 0) ? rightToLeftSpriteSheet : leftToRightSpriteSheet;
            targetXPos = cWidth * Math.random();
            normalizeStartPosition('x');
            targetSpeedY *= (-1);
            targetYPos += targetSpeedY;
        }

        targetAnimation.x = targetXPos;
        targetAnimation.y = targetYPos;
}

function checkTargetHit(){
    //Obtain Shot position
    var shotX = Math.round(stage.mouseX);
    var shotY = Math.round(stage.mouseY);
    var spriteX = Math.round(targetAnimation.x);
    var spriteY = Math.round(targetAnimation.y);

    // Compute the X and Y distance using absolute value
    var distX = Math.abs(shotX - spriteX);
    var distY = Math.abs(shotY - spriteY);

    if(distX < 35 && distY < 35) {
        stage.removeChild(targetAnimation);
        enemyDeath();
        playerScore = playerScore + 100;
        killCount = killCount + 1;
        createjs.Sound.play('die');
        setTimeout(
            function(){
                stage.removeChild(targetDeadAnimation);
                if(Math.round(Math.random())){ //50/50
                    targetXPos = cWidth * Math.random();
                    normalizeStartPosition('x');
                    targetYPos = -targetHeight;
                } else {
                    targetXPos = -targetWidth;
                    targetYPos = cHeight * Math.random();
                    normalizeStartPosition('y');
                }
                createEnemy();
            },
            700);
    } else {
        if(playerScore>0) {
            playerScore = playerScore - 50;
        }
    }
}