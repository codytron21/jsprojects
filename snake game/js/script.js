function init() {
    var canvas = document.getElementById('mycanvas');
    W = H = canvas.width = canvas.height = 635;
    pen = canvas.getContext('2d');
    cs = 35;
    score = 0;
    food = getRandomFood();
    foodImage = new Image();
    foodImage.src = "assets/foodimg.png";
    tropy = new Image();
    tropy.src = "assets/trophy.png";
    gameOver = false;
    snake = {
        init_len: 1,
        color: "blue",
        cells: [],
        direction: "right",
        createSnake: function () {
            for (let i = this.init_len; i > 0; i--) {
                this.cells.push({ x: i, y: 0 });
            }
        },
        drawSnake: function () {
            for (let i = 0; i < this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.fillRect(this.cells[i].x * cs, this.cells[i].y * cs, cs - 2, cs - 2);
            }
        },
        updateSnake: function () {
            let headX = this.cells[0].x;
            let headY = this.cells[0].y;
            if (headX == food.x && food.y == headY) {
                food = getRandomFood();
                score++;
            }
            else { this.cells.pop(); }

            let nextX, nextY;
            if (this.direction == "right") {
                nextX = headX + 1;
                nextY = headY;
            }
            else if (this.direction == "left") {
                nextX = headX - 1;
                nextY = headY;
            }
            else if (this.direction == "down") {
                nextX = headX;
                nextY = headY + 1;
            }
            else {
                nextY = headY - 1;
                nextX = headX;
            }
            this.cells.unshift({ x: nextX, y: nextY });
            let lastX = Math.round(W / cs);
            let lastY = Math.round(H / cs);
            if (headX < 0 || headY < 0 || headX > lastX || headY > lastY) {
                gameOver = true;
            }
        }
    };

    snake.createSnake();
    function keyPressed(e) {
        if (e.key == "ArrowRight") { snake.direction = "right"; }
        else if (e.key == "ArrowLeft") { snake.direction = "left"; }
        else if (e.key == "ArrowDown") { snake.direction = "down"; }
        else {
            snake.direction = "up";
        }
    }
    document.addEventListener('keydown', keyPressed);
}
function getRandomFood() {
    let foodX = Math.round(Math.random() * ((W - cs) / cs));
    let foodY = Math.round(Math.random() * ((H - cs) / cs));
    food = {
        x: foodX,
        y: foodY,
        foodColor: "red"
    }
    return food;
}
function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSnake();
    pen.fillStyle = food.foodColor;
    pen.drawImage(foodImage, food.x * cs + 2, food.y * cs + 2, cs, cs);
    pen.font = "20px Roboto";
    pen.drawImage(tropy, 5, 5, 50, 50);
    pen.fillText(score, 25, 25);
    pen.fillText("Score", 5, 70);
}
function update() {
    snake.updateSnake();
}
function gameLoop() {
    if (gameOver) {
        clearInterval(f);
        alert("Game Over: You losed! Your score is " + score);
    }
    draw();
    update();
}
init();
var f = setInterval(gameLoop, 100);