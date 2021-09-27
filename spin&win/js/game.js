let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 400,

    scene: {
        preload: preload,
        create: create,
        update: update,
    }

};
let game = new Phaser.Game(config);
function preload() {
    console.log("preload");
    // we have lots of objects  and methods provided by the phaser frame work.
    // "this" keyword is used, as preload is part of scene object.
    //load is a phaser object in the scene object.
    //we can give the name of the image here we have given it name 'background'
    this.load.image('background', '../assets/back.jpg');
    this.load.image('wheel', '../assets/wheel.png');
    this.load.image('pin', '../assets/pin.png');
    this.load.image('stand', '../assets/stand.png');
}
function create() {
    console.log("create");
    //getting the height and width of canvas
    let W = game.config.width;
    let H = game.config.height;
    // sprite a object in scene object from the phaser.
    //sprite is a way to create images.
    /*sprite(0,0,'name') 0,0 in sprite is the position where to load the image*/

    let background = this.add.sprite(0, 0, 'background');
    // setPostion,setScales are method in spirte.
    background.setPosition(W / 2, H / 2);
    background.setScale(0.20);
    let stand = this.add.sprite(W / 2, H / 2 + 130, 'stand');
    stand.setScale(0.30);
    this.wheel = this.add.sprite(W / 2, H / 2, 'wheel');
    this.wheel.setScale(0.15);

    let pin = this.add.sprite(W / 2, H / 2 - 160, 'pin');
    pin.setScale(0.20);
    //event listner for mouse click(using phaser objects)
    //writen "this" to pass the context.
    this.input.on("pointerdown", spinwheel, this);
    //created text object to display.
    font_style = {
        font: "bold 30px Roboto",
        align: "center",
        color: "red",
    }
    //by writing this.game_text we are creating an game_text object in the scene object.
    //accessing "add" object from scene to assign text. 
    this.game_text = this.add.text(10, 10, "Welcome to Spin & Win ", font_style);
}
function update() {
    this.wheel.angle += 1;
    console.log("update");
}
function spinwheel() {
    this.game_text.setText("You clicked the mouse!");
}