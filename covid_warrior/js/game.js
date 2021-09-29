function load_image() {
    // player,virus,gem
    enemy_image = new Image;
    enemy_image.src = "assets/v1.png";

    player_image = new Image;
    player_image.src = "assets/superhero.png";
    gem_image = new Image;
    gem_image.src = "assets/gemm.png";
}
function init() {
    //define the objects that we will have in the game.
    canvas = document.getElementById("mycanvas");
    H = 400;
    W = 700;
    gameOver = false;
    canvas.width = W;
    canvas.height = H;
    pen = canvas.getContext('2d');

    e1 = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 20
    };
    e2 = {
        x: 300,
        y: 150,
        w: 60,
        h: 60,
        speed: 30
    };
    e3 = {
        x: 450,
        y: 20,
        w: 50,
        h: 50,
        speed: 40
    };
    enemy = [e1, e2, e3];
    player = {
        x: 20,
        y: H / 2,
        w: 60,
        h: 60,
        speed: 20,
        moving: false,
        health: 100
    }
    gem = {
        x: W - 100,
        y: H / 2,
        w: 60,
        h: 60,
    }
    //lsiten to events on the canvas
    canvas.addEventListener('mousedown', function () {
        console.log("active");
        player.moving = true;
    });
    canvas.addEventListener('mouseup', function () {
        console.log("active");
        player.moving = false;
    });
}
function isCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.w &&
        rect1.x + rect1.w > rect2.x &&
        rect1.y < rect2.y + rect2.h &&
        rect1.y + rect1.h > rect2.y) {
        return true;
    }
    return false;
}
//to prints the objects on the screen
function draw() {
    //clear the canvas area of the old frame
    pen.clearRect(0, 0, W, H);

    pen.fillStyle = "white";
    pen.font = '20px Arial';
    pen.fillText("Score " + player.health, 10, 20);
    // pen.fillRect(box.x, box.y, box.w, box.h);
    // pen.drawImage(enemy_image, box.x, box.y, box.w, box.h);
    pen.drawImage(player_image, player.x, player.y, player.w, player.h);
    pen.drawImage(gem_image, gem.x, gem.y, gem.w, gem.h);

    for (let i = 0; i < enemy.length; i++) {
        pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }
}
//to add movement to the object
function update() {
    if (player.moving == true) {
        player.x += player.speed;
    }
    if (isCollision(player, gem)) {
        player.health += 20;
        alert("YOU WON" + player.health);
        return;
    }
    for (let i = 0; i < enemy.length; i++) {
        if (isCollision(player, enemy[i])) {
            player.health -= 101;
        }
        if (player.health < 0) {
            gameOver = true;
        }
    }
    // box.y += box.speed;
    // if (box.y >= H - box.h || box.y < 0) {
    //     box.speed *= -1;
    // }
    for (let i = 0; i < enemy.length; i++) {
        enemy[i].y += enemy[i].speed;
        if (enemy[i].y >= H - enemy[i].h || enemy[i].y < 0) {
            enemy[i].speed *= -1;
        }
    }
}
function gameloop() {
    if (gameOver) {
        clearInterval(f);
    }
    draw();
    update();
    console.log("In gameloop");
}
load_image();
init();

var f = setInterval(gameloop, 100);