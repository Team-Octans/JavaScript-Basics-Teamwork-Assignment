function drawMainMenu() {
	stage = new createjs.Stage("canvas");
	stage.mouseMoveOutside = false;
	stage.enableMouseOver(10);
	stage.canvas.style.cursor = "none";

	createjs.Sound.play('bgMusic');

	var menuBackground = new createjs.Bitmap("resources/pictures/background-2.jpg");
	menuBackground.scaleX = 0.8;
	menuBackground.scaleY = 0.9;
	stage.addChild(menuBackground);

	var menuCrosshair = new createjs.Bitmap(queue.getResult('crosshair'));
	menuCrosshair.scaleX = 0.6;
	menuCrosshair.scaleY = 0.6;
   	menuCrosshair.x = -9999;
   	menuCrosshair.y = -9999;

   	var menuBullet = new createjs.Bitmap("resources/pictures/menu-bullet.png");
    menuBullet.alpha = 0;
    menuBullet.scaleX = 1;
    menuBullet.scaleY = 1;
    stage.addChild(menuBullet);

    var titleText = new createjs.Text("SHOOT EM UP", "80px Chunk", "red");
    titleText.x = 300;
    titleText.y = 50;
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
		menuBullet.y = this.y + 13;
		this.shadow = new createjs.Shadow("black", 2, 2, 15);
		this.color = "Red";
	}

	function onUnHover() {
		menuBullet.alpha = 0;
		this.color = "white";
		this.shadow = new createjs.Shadow("black", 2, 2, 15);
	}

	var vertSpace = 240;
	
	for (var btn in menuButtons) {
		var tempBtn = menuButtons[btn];
		tempBtn.x = 480;
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

   	function tick(event) {
 		stage.update();
	}

	function moveHandler() {
   		menuCrosshair.x = stage.mouseX - 20;
   		menuCrosshair.y = stage.mouseY - 20;
  	}

  	stage.addEventListener("stagemousemove", moveHandler);

	createjs.Ticker.addEventListener("tick", tick);
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
