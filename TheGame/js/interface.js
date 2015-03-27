function drawInitialBullets(stage) {
	var bulletGroup = [];
	var horizontalSpace = 50;
	for (var i = 0; i < 6; i++) {
		var bullet = new createjs.Bitmap("resources/pictures/bullet.png");
		bullet.x = stage.canvas.width - horizontalSpace;
		bullet.y = stage.canvas.height - 100;
		horizontalSpace = horizontalSpace + 20;
		bulletGroup.push(bullet);
	}

	for (var i in bulletGroup) {
		stage.addChild(bulletGroup[i]);
	}
}