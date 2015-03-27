var magazine,
    capacity = 6,
    bullet,
    horizontalSpace;

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