function drawMainMenu() {
	stage = new createjs.Stage("canvas");
	stage.mouseMoveOutside = false;
	stage.enableMouseOver(10);

	createjs.Sound.play('bgMusic');

	var menuBackground = new createjs.Bitmap("resources/pictures/background-2.jpg");
	menuBackground.scaleX = 0.8;
	menuBackground.scaleY = 0.9;
	stage.addChild(menuBackground);

	var mainMenuBox = new createjs.Graphics().beginFill("darkred").drawRoundRect(430, 200, 308, 195, 25);
 	var mainMenuBoxShape = new createjs.Shape(mainMenuBox);
 	mainMenuBoxShape.alpha = 0.5;
 	mainMenuBoxShape.shadow = new createjs.Shadow("black", 3, 3, 5);
 	stage.addChild(mainMenuBoxShape);

	var menuCrosshair = new createjs.Bitmap(queue.getResult('crosshair'));
	menuCrosshair.scaleX = 0.6;
	menuCrosshair.scaleY = 0.6;

   	var menuBullet = new createjs.Bitmap("resources/pictures/menu-bullet.png");
    menuBullet.alpha = 0;
    stage.addChild(menuBullet);

    var footerText = new createjs.Text("© 2015   TEAM OCTANS @ SOFTWARE UNIVERSITY", 
    									"20px Chunk", "white");
    footerText.x = 250;
    footerText.y = stage.canvas.height - 50;
    footerText.shadow = new createjs.Shadow("black", 5, 5, 10);
    stage.addChild(footerText);

    var titleText = new createjs.Text("SHOOT THE BIRD", "70px Chunk", "black");
    titleText.x = 200;
    titleText.y = 70;
    titleText.shadow = new createjs.Shadow("black", 3,3,10);
    stage.addChild(titleText);

    var titleTextOutline = titleText.clone();
    titleTextOutline.outline = false;
    titleTextOutline.color = "red";
    stage.addChild(titleTextOutline);

	var menuButtons = [
		new createjs.Text("Start", "30px Chunk", "#FFFFFF"),
		new createjs.Text("Credits", "24px Chunk", "#FFFFFF")
	];

	function onHover() {
		menuBullet.alpha = 1;
		menuBullet.x = this.x - 50;
		menuBullet.y = this.y + 6;
		this.shadow = new createjs.Shadow("black", 2, 2, 15);
		this.color = "yellow";
		menuCrosshair.alpha = 0.6;
	}

	function onUnHover() {
		menuBullet.alpha = 0;
		this.color = "white";
		this.shadow = new createjs.Shadow("black", 2, 2, 15);
		menuCrosshair.alpha = 1;
	}

	var vertSpace = 240;
	
	for (var btn in menuButtons) {
		var tempBtn = menuButtons[btn];
		tempBtn.x = 500;
		tempBtn.y = vertSpace;
		tempBtn.shadow = new createjs.Shadow("black", 2, 2, 15);
		vertSpace = vertSpace + 80;
		var hitArea = new createjs.Shape();
		hitArea.graphics.beginFill("#000").drawRect(-15, -15, 
			150, 
			30);
		
		tempBtn.hitArea = hitArea;
		stage.addChild(tempBtn);
	}

	menuButtons[0].on("mouseover", onHover);
	menuButtons[0].on("mouseout", onUnHover);
	menuButtons[0].on("click", mainDraw);
	menuButtons[0].x = 525;
	menuButtons[1].on("mouseover", onHover);
	menuButtons[1].on("mouseout", onUnHover);
	menuButtons[1].x = 517;

	stage.addChild(menuCrosshair);

	function moveHandler() {
   		menuCrosshair.x = stage.mouseX - 20;
   		menuCrosshair.y = stage.mouseY - 20;
  	}

  	stage.addEventListener("stagemousemove", moveHandler);

	createjs.Ticker.addEventListener("tick", stage);
	createjs.Ticker.timingMode = createjs.Ticker.RAF;
 	createjs.Ticker.setFPS(60);
}

function loadingScreen() {
	var loadingStage = new createjs.Stage("canvas");

	var loadingTitle = new createjs.Text("SHOOT THE BIRD", "70px Chunk", "red");
    loadingTitle.x = 200;
    loadingTitle.y = 70;
    loadingTitle.shadow = new createjs.Shadow("black", 3,3,10);

	var loadProgressLabel = new createjs.Text("LOADING","40px Chunk","white");
	loadProgressLabel.lineWidth = 200;
	loadProgressLabel.textAlign = "center";
	loadProgressLabel.x = loadingStage.canvas.width/2;
	loadProgressLabel.y = loadingStage.canvas.height/2;

	var pleaseWaitLabel = new createjs.Text("Please wait...", "18px Chunk", "white");
	pleaseWaitLabel.x = loadProgressLabel.x - 100;
	pleaseWaitLabel.y = loadProgressLabel.y + 100;

	loadingStage.addChild(loadProgressLabel,pleaseWaitLabel,loadingTitle);
	loadingStage.update();
}

function gameOverScreen() {

	clearInterval(scoreInterval);
	clearInterval(clockInterval);

	stage.removeAllChildren();
	stage.removeEventListener('stagemousemove', moveCrosshair);
    stage.removeEventListener('mousedown', handleClick);
	stage.update();

	menuBackground = new createjs.Bitmap("resources/pictures/background-2.jpg");
	menuBackground.scaleX = 0.8;
	menuBackground.scaleY = 0.9;
	stage.addChild(menuBackground);

	var gameOverBox = new createjs.Graphics().beginFill("darkred").drawRoundRect(380, 120, 430, 380, 25);
 	var gameOverBoxShape = new createjs.Shape(gameOverBox);
 	gameOverBoxShape.alpha = 0.7;
 	gameOverBoxShape.shadow = new createjs.Shadow("black", 3, 3, 10);
 	stage.addChild(gameOverBoxShape);

 	var gameOverLabel = new createjs.Text("GAME OVER !!!", "30px Chunk", "white");
 	gameOverLabel.x = 440;
 	gameOverLabel.y = 145;
 	gameOverLabel.shadow = new createjs.Shadow("black", 3, 3, 5);
 	stage.addChild(gameOverLabel);

 	var horzLine = new createjs.Shape();
 	horzLine.graphics.beginStroke("white")
				.moveTo(420, 420)
				.lineTo(770, 420)
				.endStroke();
				stage.addChild(horzLine);

	function drawFinalScore() {
		var scoreDisplay = new createjs.Text("Score: " + playerScore, "20px Chunk", "white");
		scoreDisplay.x = 460;
		scoreDisplay.y = 220;
		scoreDisplay.shadow = new createjs.Shadow("black", 2, 2, 10);
		stage.addChild(scoreDisplay);
	}

	function drawFinalKillCount() {
		var killCountText = new createjs.Text("Birds killed: " + killCount, "20px Chunk", "white");
		killCountText.x = 460;
		killCountText.y = 270;
		killCountText.shadow = new createjs.Shadow("black", 2, 2, 10);
		stage.addChild(killCountText);
	}

	function drawFinalShotCount() {
		var shotCountText = new createjs.Text("Bullets used: " + shotCount, "20px Chunk", "white");
		shotCountText.x = 460;
		shotCountText.y = 320;
		shotCountText.shadow = new createjs.Shadow("black", 2, 2, 10);
		stage.addChild(shotCountText);
	}

	var accuracy = (killCount / shotCount) * 100;
	if (isNaN(accuracy)) {
		accuracy = 0;
	}

	function drawFinalAccuracy() {
		var accuracyText = new createjs.Text("Accuracy: " + accuracy.toFixed(2) + "%", "20px Chunk", "white");
		accuracyText.x = 460;
		accuracyText.y = 370;
		accuracyText.shadow = new createjs.Shadow("black", 2, 2, 10);
		stage.addChild(accuracyText);
	}

	var statsArray = [drawFinalScore, drawFinalKillCount, drawFinalShotCount, drawFinalAccuracy];

	var currTimeout = 500;
	statsArray.forEach(function (func) {
		setTimeout(func, currTimeout);
		currTimeout = currTimeout + 500;
	});

	var backToMenuText = new createjs.Text("Press any key ...", "22px Chunk", "white");
	backToMenuText.x = 460;
	backToMenuText.y = 445;
	backToMenuText.shadow = new createjs.Shadow("black", 3, 3, 15);
	stage.addChild(backToMenuText);

	var backToMenuHitArea = new createjs.Shape();
		backToMenuHitArea.graphics.beginFill("#000").drawRect(0, 0, 
			backToMenuText.getMeasuredWidth() + 50, 
			backToMenuText.getMeasuredHeight() + 20);
		
		backToMenuText.hitArea = backToMenuHitArea;

	function finish() {
	    playerScore = 0;
    	killCount = 0;
    	shotCount = 0;
    	createjs.Sound.stop('bgMusic');
	    init();
	}

	document.onkeypress = finish;
}