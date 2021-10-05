let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 1300,
        height: 610,
    },

    backgroundColor: 0xffffcc,
    // physics engines by phaser
    //one of basic physics engine is arcade-- it can be used to give speed ,gravity etc.
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {
                y: 1000,
            }
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};
let game = new Phaser.Game(config);
function preload() {
    this.load.image("ground", "assets/topground.png");
    this.load.image("sky", "assets/background.png");
    this.load.image("apple", "assets/apple.png");
    //to a sprite map type of image we use spritesheet func.
    this.load.spritesheet("dude", "assets/dude.png", { frameWidth: 32, frameHeight: 48 });

}
function create() {
    W = game.config.width;
    H = game.config.height;

    // let ground = this.add.sprite(0, H - 128, 'ground');
    //tileSprite is used to load the image as continuous tiles.
    let ground = this.add.tileSprite(0, H - 128, W, 128, 'ground');
    //every image have center as there origin,accordingly it is drawn on the screen.
    //setOrigin gives us capibility to change the position from center to anywhere.
    ground.setOrigin(0, 0);
    // adding background
    let background = this.add.sprite(0, 0, 'sky');
    background.setOrigin(0, 0);
    background.displayWidth = W;
    background.depth = -1;
    //to make the player an object on which we can apply physics we use .physics
    //instead of using "let player" if we use "this.player" we can then access the
    // player from other function 
    /*let player*/ this.player = this.physics.add.sprite(100, 100, 'dude', 4);
    //add bounce effect
    this.player.setBounce(0.3);
    let fruits = this.physics.add.group({
        key: "apple",
        repeat: 8,
        setScale: { x: 0.2, y: 0.2 },
        setXY: { x: 200, y: 0, stepX: 100 },

    });
    //adding bound effect with different value to each apple by iterating to all the apples
    fruits.children.iterate(function (f) {
        f.setBounce(Phaser.Math.FloatBetween(0.4, 0.7))
    });
    //to make ground sprite object experience physics we add .pyhics and since we have ground sprite already we use "existing() "
    this.physics.add.existing(ground);
    //if we write this.physics.add.existing(ground,true) if we pass true it means that it will be static body.and by default it is false that is static.
    //if we make ground static we dont have to specifically use .allowGravity and .immovable
    //exempting ground ground from gravity
    ground.body.allowGravity = false;
    ground.body.immovable = true;
    //add a collision detection btw player and ground.
    this.physics.add.collider(ground, this.player);
    this.physics.add.collider(ground, fruits);




}
function update() {

}