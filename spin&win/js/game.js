let config = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,

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
    // "this" keyword is used as preload is part of scene object.
    //load is a phaser object in the scene object.
    //we can give the name of the image here we have given it name 'background'
    this.load.image('background', '../assets/back.jpg');

}
function create() {
    console.log("create");
    //getting the height and width of canvas
    let W = game.config.width;
    let H = game.config.height;
    // sprite a object in scene object from the phaser.
    //sprite is a way to create images.
    let background = this.add.sprite(0, 0, 'background');
    // setPostion,setScales are method in spirte.
    background.setPosition(W / 2, H / 2);
    background.setScale(0.20);
}
function update() {
    console.log("update");
}