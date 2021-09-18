function load_image() {
    // player,virus,gem

}
function init() {
    //define the objects that we will have in the game.
    canvas = document.getElementById("mycanvas");
    H = 400;
    W = 700;
    canvas.width = W;
    canvas.height = H;
    pen = canvas.getContext('2d');

    box = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 20
    };
}
//to prints the objects on the screen
function draw() {
    //clear the canvas area of the old frame
    pen.clearRect(0, 0, W, H);

    pen.fillStyle = "red";
    pen.fillRect(box.x, box.y, box.w, box.h);
}
//to add movement to the object
function update() {

    box.y += box.speed;
    if (box.y >= H - box.h || box.y < 0) {
        box.speed *= -1;
    }
}
function gameloop() {
    draw();
    update();
    console.log("In gameloop");
}
load_image();
init();

var f = setInterval(gameloop, 100);