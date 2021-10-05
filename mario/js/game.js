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
            },
            debug: true,//this will form a box around the objects.
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update,
    }
};
let game = new Phaser.Game(config);
let player_config = {
    player_speed: 150,
    player_jumpspeed: -700,
};
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
    //add bounce effect..
    //.group() is used to make group of objects.
    this.player.setBounce(0.3);
    // add animation and movement to player.

    //keyboard
    //"createCursorKey" its an standard function in Phaser
    //to read any key from the keyboard.
    //we make object like this.
    this.cursor = this.input.keyboard.createCursorKeys();


    //add group of apples as physical objects.
    let fruits = this.physics.add.group({
        key: "apple",
        repeat: 8,
        setScale: { x: 0.2, y: 0.2 },
        setXY: { x: 100, y: 0, stepX: 100 },

    });
    //adding bound effect with different value to each apple by iterating to all the apples
    fruits.children.iterate(function (f) {
        f.setBounce(Phaser.Math.FloatBetween(0.4, 0.7))
    });
    //adding plateform and to make them static we use staticGroup()
    let platforms = this.physics.add.staticGroup();
    //if we just use setscale then only the image dimension will change,not thr actual object,so we use refreshBody() to overlap with the dimension of image.  
    platforms.create(800, 350, "ground").setScale(2, 0.5).refreshBody();
    platforms.create(100, 250, "ground").setScale(2, 0.5).refreshBody();
    platforms.create(950, 150, "ground").setScale(2, 0.5).refreshBody();
    //to make ground sprite object experience physics we add .pyhics and since we have ground sprite already we use "existing() "
    this.physics.add.existing(ground, true);
    //if we write this.physics.add.existing(ground,true) if we pass true it means that it will be static body.and by default it is false that is static.
    //if we make ground static we dont have to specifically use .allowGravity and .immovable
    //exempting ground ground from gravity
    // ground.body.allowGravity = false;
    // ground.body.immovable = true;
    //adding the ground in the platforms group. since both have somewhat same functionality.
    platforms.add(ground);
    //add a collision detection btw player and ground.
    this.physics.add.collider(platforms, this.player);
    // this.physics.add.collider(ground, fruits);
    this.physics.add.collider(platforms, fruits);




}
function update() {
    if (this.cursor.left.isDown) {
        this.player.setVelocityX(-player_config.player_speed);
    }
    else if (this.cursor.right.isDown) {
        this.player.setVelocityX(player_config.player_speed);
    }
    else {
        this.player.setVelocityX(0);
    }
    //add jumping capability
    if (this.cursor.up.isDown && this.player.body.touching.down) {
        this.player.setVelocityY(player_config.player_jumpspeed)
    }
}