function createTarget()
{
    //Testing the Sprite
    spriteSheet = new createjs.SpriteSheet({
        "images": ['resources/pictures/target.jpeg'],
        "frames": {"width": 50, "height": 49},
        "animations": { "target": [0,0] }
    });

    animation = new createjs.Sprite(spriteSheet, "target");
    animation.regX = 20;
    animation.regY = 20;
    animation.x = targetXPos;
    animation.y = targetYPos;
    animation.gotoAndPlay("target");
    stage.addChildAt(animation,1);
}

//function ticker()
//{
//    //Move the target
//    if(targetXPos < cWidth && targetXPos > 0)
//    {
//        targetXPos += 1.5;
//    } else
//    {
//        targetXPos += 1.5* (-1);
//    }
//    if(targetYPos < cHeight && targetYPos > 0)
//    {
//        targetYPos += 1.5;
//    } else
//    {
//        targetYPos += 1.5* (-1);
//    }
//
//    animation.x = targetXPos;
//    animation.y = targetYPos;
//}