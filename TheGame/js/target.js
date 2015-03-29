function createTarget()
{
    //setting the target
    centerSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('bird')],
        "frames": {"width": targetWidth, "height": targetHeight},
        "framerate": 15,
        "animations": { "target": [12,15] }
    });
    leftToRightSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('bird')],
        "frames": {"width": targetWidth, "height": targetHeight},
        "framerate": 15,
        "animations": { "target": [4,7] }
    });
    rightT0LeftSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('bird')],
        "frames": {"width": targetWidth, "height": targetHeight},
        "framerate": 15,
        "animations": {"target": [0,3]}
    });
    deadSpriteSheet = new createjs.SpriteSheet({
        "images": [queue.getResult('dead')],
        "frames": {"width": 100, "height": 100},
        "framerate": 5,
        "animations": { "target": [0,11]}
    });

    targetAnimation = new createjs.Sprite(centerSpriteSheet, "target");
    targetAnimation.regX = 20;
    targetAnimation.regY = 20;
    targetAnimation.x = targetXPos;
    targetAnimation.y = targetYPos;
    targetAnimation.gotoAndPlay("target");
    stage.addChildAt(targetAnimation,1);
}

function ticker()
{
    if(targetIsDead_f == true) {
        setTimeout(function(){
            targetIsDead_f = false;
            targetAnimation.spriteSheet = centerSpriteSheet;
        },2000);
        targetAnimation.spriteSheet = deadSpriteSheet;
        if(Math.round(Math.random()) == 1){ //50/50
            targetXPos = cWidth * Math.random();
            targetYPos = -targetHeight;
        } else {
            targetXPos = -targetWidth;
            targetYPos = cHeight * Math.random();
        }
    }else {
        //Move the target
        //right and left
        if (targetXPos < (cWidth + targetWidth * 1.5) && targetXPos >= -targetWidth) {
            targetXPos += targetSpeedX;
        } else {
            if (targetSpeedX > 0) {
                targetAnimation.spriteSheet = rightT0LeftSpriteSheet;
            } else {
                targetAnimation.spriteSheet = leftToRightSpriteSheet;
            }
            targetYPos = cHeight * Math.random();
            targetSpeedX = targetSpeedX *(-1);
            targetXPos += targetSpeedX;
        }

        //top  and bottom
        if (targetYPos < (cHeight + targetHeight * 1.5) && targetYPos >= -targetHeight) {
            targetYPos += targetSpeedY;
        } else {
            if (targetSpeedX < 0) {
                targetAnimation.spriteSheet = rightT0LeftSpriteSheet;
            } else {
                targetAnimation.spriteSheet = leftToRightSpriteSheet;
            }
            targetXPos = cWidth * Math.random();
            targetSpeedY = targetSpeedY *(-1);
            targetYPos += targetSpeedY;
        }

        targetAnimation.x = targetXPos;
        targetAnimation.y = targetYPos;
    }
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

    // Hit the bird.
    if(magazine.children.length !== 0) {
        if(distX < 50 && distY < 50){

            targetIsDead_f = true;
            playerScore = playerScore + 100;
            createjs.Sound.play('die');
        }else {
            if(playerScore>0) {
                playerScore = playerScore - 50;
            }
        }
    }
}