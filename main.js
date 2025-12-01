import {Player} from "./Player.js"

const gameContainer = document.querySelector("#game-container");

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: gameContainer,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    },
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image("playerImg", "./assets/player.png")
}

function create() {
    createKeys(this);
    createPlayer(this);
}

function update() {
    this.player.update();
}

// Functions

function createPlayer(scene) {
    scene.player = new Player(
        scene,
        window.innerWidth / 2,
        window.innerHeight - 120
    );
}

function createKeys(scene) {
    scene.cursors = scene.input.keyboard.createCursorKeys();
    scene.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    scene.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    scene.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    scene.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
}