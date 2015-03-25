function createTarget()
{
    //Testing the Sprite
    spriteSheet = new createjs.SpriteSheet({
        "images": ['resources/pictures/target.jpeg'],
        "frames": {"width": 50, "height": 49},
        "animations": { "target": [0,0] }
    });

    targetAnimation = new createjs.Sprite(spriteSheet, "target");
    targetAnimation.regX = 20;
    targetAnimation.regY = 20;
    targetAnimation.x = targetXPos;
    targetAnimation.y = targetYPos;
    targetAnimation.gotoAndPlay("target");
    stage.addChildAt(targetAnimation,1);
}

function ticker()
{
    //Move the target
    if(targetXPos < (cWidth - targetWidth/2) && targetXPos > targetWidth/2)
    {
        targetXPos += targetSpeedX;
    } else
    {
        targetSpeedX = targetSpeedX * (-1);
        targetXPos += targetSpeedX;
    }
    if(targetYPos < (cHeight - targetHeight/2)&& targetYPos > targetHeight/2)
    {
        targetYPos += targetSpeedY;
    } else
    {
        targetSpeedY = targetSpeedY * (-1);
        targetYPos += targetSpeedY;
    }

    targetAnimation.x = targetXPos;
    targetAnimation.y = targetYPos;
}