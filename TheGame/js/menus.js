function drawMainMenu() {
	stage = new createjs.Stage("canvas");
	stage.mouseMoveOutside = false;
	stage.enableMouseOver(10);

	createjs.Sound.play('bgMusic');

	var menuBackground = new createjs.Bitmap("resources/pictures/background-2.jpg");
	menuBackground.scaleX = 0.8;
	menuBackground.scaleY = 0.9;
	stage.addChild(menuBackground);

	var mainMenuBox = new createjs.Graphics().beginFill("darkred").drawRoundRect(430, 200, 320, 230, 25);
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

    var titleText = new createjs.Text("SHOOT THE BIRD", "80px Chunk", "red");
    titleText.x = 250;
    titleText.y = 70;
    titleText.shadow = new createjs.Shadow("black", 3,3,10);
    stage.addChild(titleText);

	var menuButtons = [
		new createjs.Text("New Game", "36px Chunk", "#FFFFFF"),
		new createjs.Text("Options", "36px Chunk", "#FFFFFF"),
		new createjs.Text("Credits", "36px Chunk", "#FFFFFF")
	];

	function onHover() {
		menuBullet.alpha = 1;
		menuBullet.x = this.x - 50;
		menuBullet.y = this.y + 6;
		this.shadow = new createjs.Shadow("black", 2, 2, 15);
		this.color = "yellow";
	}

	function onUnHover() {
		menuBullet.alpha = 0;
		this.color = "white";
		this.shadow = new createjs.Shadow("black", 2, 2, 15);
	}

	var vertSpace = 240;
	
	for (var btn in menuButtons) {
		var tempBtn = menuButtons[btn];
		tempBtn.x = 500;
		tempBtn.y = vertSpace;
		tempBtn.shadow = new createjs.Shadow("black", 2, 2, 15);
		vertSpace = vertSpace + 60;
		var hitArea = new createjs.Shape();
		hitArea.graphics.beginFill("#000").drawRect(0, 0, 
			tempBtn.getMeasuredWidth() + 50, 
			tempBtn.getMeasuredHeight() + 20);
		
		tempBtn.hitArea = hitArea;
		stage.addChild(tempBtn);
	}

	menuButtons[0].on("mouseover", onHover);
	menuButtons[0].on("mouseout", onUnHover);
	menuButtons[0].on("click", mainDraw);
	menuButtons[1].on("mouseover", onHover);
	menuButtons[1].on("mouseout", onUnHover);
	menuButtons[2].on("mouseover", onHover);
	menuButtons[2].on("mouseout", onUnHover);

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
	var loadProgressLabel = new createjs.Text("LOADING","50px Chunk","white");
	loadProgressLabel.lineWidth = 200;
	loadProgressLabel.textAlign = "center";
	loadProgressLabel.x = loadingStage.canvas.width/2;
	loadProgressLabel.y = loadingStage.canvas.height/2;

	var pleaseWaitLabel = new createjs.Text("Please wait...", "24px Chunk", "white");
	pleaseWaitLabel.x = loadProgressLabel.x - 80;
	pleaseWaitLabel.y = loadProgressLabel.y + 100;

	loadingStage.addChild(loadProgressLabel,pleaseWaitLabel);
	loadingStage.update();
}

function gameOverScreen() {
	stage.autoClear = true;
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

 	var gameOverLabel = new createjs.Text("GAME OVER !!!", "38px Chunk", "white");
 	gameOverLabel.x = 450;
 	gameOverLabel.y = 160;
 	gameOverLabel.shadow = new createjs.Shadow("black", 3, 3, 5);
 	stage.addChild(gameOverLabel);

 	var horzLine = new createjs.Shape();
 	horzLine.graphics.beginStroke("white")
				.moveTo(420, 400)
				.lineTo(770, 400)
				.endStroke();
				stage.addChild(horzLine);

	var killCountText = new createjs.Text("Birds killed: " + killCount, "26px Chunk", "white");
	killCountText.x = 495;
	killCountText.y = 240;
	killCountText.shadow = new createjs.Shadow("black", 2, 2, 10);
	stage.addChild(killCountText);

	var shotCountText = new createjs.Text("Bullets used: " + shotCount, "26px Chunk", "white");
	shotCountText.x = 495;
	shotCountText.y = 290;
	shotCountText.shadow = new createjs.Shadow("black", 2, 2, 10);
	stage.addChild(shotCountText);

	var accuracy = (killCount / shotCount) * 100;
	var accuracyText = new createjs.Text("Accuracy: " + accuracy.toFixed(2) + "%", "26px Chunk", "white");
	accuracyText.x = 480;
	accuracyText.y = 340;
	accuracyText.shadow = new createjs.Shadow("black", 2, 2, 10);
	stage.addChild(accuracyText);

	var backToMenuText = new createjs.Text("Back to main menu", "32px Chunk", "white");
	backToMenuText.x = 440;
	backToMenuText.y = 430;
	backToMenuText.shadow = new createjs.Shadow("black", 3, 3, 15);
	stage.addChild(backToMenuText);

	var backToMenuHitArea = new createjs.Shape();
		backToMenuHitArea.graphics.beginFill("#000").drawRect(0, 0, 
			backToMenuText.getMeasuredWidth() + 50, 
			backToMenuText.getMeasuredHeight() + 20);
		
		backToMenuText.hitArea = backToMenuHitArea;
}