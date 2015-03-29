var magazine,
    capacity = 6,
    bullet,
    horizontalSpace,
    clock,
    playerScore = 0;

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
        bullet.y = stage.canvas.height - 100;
        horizontalSpace += 20;
        magazine.addChild(bullet);
    }
}

function drawClock() {
    var clockText,
    	clockTextClone,
        seconds,
        minutes;

    clock = new Date("January 1, 2015 00:00:04");
    
    function updateClock() {
        stage.removeChild(clockText, clockTextClone);

        if (seconds == 0 && minutes == "00") {
            clockText = new createjs.Text("GAME OVER!", "32px Chunk", "black");
            clockText.x = 650;
            clockText.y = stage.canvas.height - 70;
            clockText.outline = 5;
            clockTextClone = clockText.clone();
            clockTextClone.outline = false;
            clockTextClone.color = "white";
            stage.addChild(clockText,clockTextClone);
            gameOverScreen();
        }
        else {
            clock.setSeconds(clock.getSeconds()-1);
            seconds = clock.getSeconds();
            if (seconds < 10) { seconds = "0" + seconds;};
            minutes = clock.getMinutes();

            clockText = new createjs.Text("Time: " + minutes + ":" + seconds, "32px Chunk", "black");
            clockText.x = 700;
            clockText.y = stage.canvas.height - 70;
            clockText.outline = 5;

            clockTextClone = clockText.clone();
            clockTextClone.outline = false;
            clockTextClone.color = "white";
            stage.addChild(clockText,clockTextClone);

        }
    }
    setInterval(updateClock,1000);
}

function drawScore() {
    
    var playerScoreText;
    var playerScoreTextClone;

    function updateScore() {
        stage.removeChild(playerScoreText, playerScoreTextClone);
        playerScoreText = new createjs.Text("Score: " + playerScore, "32px Chunk", "black");
        playerScoreText.x = 250;
        playerScoreText.y = stage.canvas.height - 70;
        playerScoreText.outline = 5;
        playerScoreTextClone = playerScoreText.clone();
        playerScoreTextClone.outline = false;
        playerScoreTextClone.color = "white";
        stage.addChild(playerScoreText);
        stage.addChild(playerScoreTextClone);
    }

    setInterval(updateScore,1000);
}