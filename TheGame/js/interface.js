var magazine,
    capacity = 6,
    bullet,
    horizontalSpace;
    clock;

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
        seconds,
        minutes;

    clock = new Date("January 1, 2015 00:02:00");
    
    function updateClock() {
        stage.removeChild(clockText);

        if (seconds == 0 && minutes == "00") {
            clockText = new createjs.Text("GAME OVER!", "42px Chunk", "black");
            clockText.x = 600;
            clockText.y = stage.canvas.height - 70;
            stage.addChild(clockText);
        }
        else {
            clock.setSeconds(clock.getSeconds()-1);
            seconds = clock.getSeconds();
            if (seconds < 10) { seconds = "0" + seconds;};
            minutes = clock.getMinutes();

            clockText = new createjs.Text(minutes + ":" + seconds, "42px Chunk", "black");
            clockText.x = 700;
            clockText.y = stage.canvas.height - 70;
            stage.addChild(clockText);
        }
    }
    setInterval(updateClock,1000);
}

function drawScore() {
    var playerScore = 0; // for now it is here
    var playerScoreText;

    function updateScore() {
        stage.removeChild(playerScoreText);
        playerScoreText = new createjs.Text("Score: " + playerScore, "42px Chunk", "black");
        playerScoreText.x = 350;
        playerScoreText.y = stage.canvas.height - 70;
        stage.addChild(playerScoreText);
    }

    setInterval(updateScore,1000);
}