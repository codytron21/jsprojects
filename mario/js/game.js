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
    let player = this.physics.add.sprite(100, 100, 'dude', 4);
    //to make ground sprite object experience physics we add .pyhicsand since we have ground sprite already we use "existing() "
    this.physics.add.existing(ground);
    //exempting ground ground from gravity
    ground.body.allowGravity = false;
    ground.body.immovable = true;
    //add a collision detection btw player and ground.
    this.physics.add.collider(ground, player);



}
function update() {

}