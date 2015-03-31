var magazine,
    capacity = 6,
    bullet,
    horizontalSpace,
    clock,
    playerScore = 0,
    scoreInterval,
    clockInterval;

function drawInitialBullets() {
    magazine = new createjs.Container();
    loadGun();
    stage.addChild(magazine);
}

function loadGun() {
    horizontalSpace = 50;
    for (var i = 0; i < capacity; i++) {
        bullet = new createjs.Bitmap(queue.getResult('bullet'));
        bullet.x = stage.canvas.width - horizontalSpace;
        bullet.y = stage.canvas.height - 70;
        bullet.scaleX = 0.8;
        bullet.scaleY = 0.6;
        horizontalSpace += 20;
        magazine.addChild(bullet);
    }
}

function drawClock() {
    var clockText,
    	clockTextClone,
        seconds,
        minutes;

    clock = new Date("January 1, 2015 00:01:00");
    
    function updateClock() {
        stage.removeChild(clockText, clockTextClone);

        if (seconds == 0 && minutes == "00") {
            gameOverScreen();
        }
        else {
            clock.setSeconds(clock.getSeconds()-1);
            seconds = clock.getSeconds();
            if (seconds < 10) { seconds = "0" + seconds;};
            minutes = clock.getMinutes();

            clockText = new createjs.Text("Time  " + minutes + ":" + seconds, "26px Chunk", "black");
            clockText.x = 700;
            clockText.y = stage.canvas.height - 50;
            clockText.outline = 5;

            clockTextClone = clockText.clone();
            clockTextClone.outline = false;
            clockTextClone.color = "white";
            stage.addChild(clockText,clockTextClone);

        }
    }
    clockInterval = setInterval(updateClock,1000);
}

function drawScore() {
    
    var playerScoreText;
    var playerScoreTextClone;

    function updateScore() {
        stage.removeChild(playerScoreText, playerScoreTextClone);
        playerScoreText = new createjs.Text("Score  " + playerScore, "26px Chunk", "black");
        playerScoreText.x = 200;
        playerScoreText.y = stage.canvas.height - 50;
        playerScoreText.outline = 5;
        playerScoreTextClone = playerScoreText.clone();
        playerScoreTextClone.outline = false;
        playerScoreTextClone.color = "white";
        stage.addChild(playerScoreText);
        stage.addChild(playerScoreTextClone);
    }

    scoreInterval = setInterval(updateScore,1000);
}

function drawInfoWrapper() {
    var infoWrapperBox = new createjs.Graphics().beginFill("darkred")
                        .drawRoundRect(0, stage.canvas.height - 80, stage.canvas.width, 80, 5);
    var infoWrapperShape = new createjs.Shape(infoWrapperBox);
    infoWrapperShape.alpha = 0.4;
    infoWrapperShape.shadow = new createjs.Shadow("black", 3, 3, 10);
    stage.addChild(infoWrapperShape);
}