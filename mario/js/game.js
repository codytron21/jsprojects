let config = {
    type: Phaser.AUTO,
    scale: {
        mode: Phaser.Scale.FIT,
        width: 800,
        height: 600,
    },
    backgroundColor: 0xffffcc,
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};
let game = new Phaser.Game(config);
function preload() {
    this.load.image("ground", "assets/topground.png");
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
}
function update() {

}