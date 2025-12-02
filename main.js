import {Player} from "./Player.js"
import {Meteor} from "./Meteor.js"

const gameContainer = document.querySelector("#game-container");

const config = {
    type: Phaser.AUTO,
    width: window.innerWidth,
    height: window.innerHeight,
    parent: gameContainer,
    scale: {
        mode: Phaser.Scale.RESIZE,
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
    this.load.image("playerImg", "./assets/player.png");
    this.load.image("meteorImg", "./assets/meteor.png");
}

function create() {
    createKeys(this);
    createPlayer(this);
    this.meteors = [];
}

function update(time, delta) {
    // Update all sprites:
    if (this.player) {
        this.player.update(delta);
    }
    if (this.meteors) {
        this.meteors.forEach(meteor => {
            meteor.update(delta);
        })
    }
    // Spawn meteors
    if (Math.random() < 0.3 * (delta / 1000)) {
        spawnMeteor(this);
    }
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

function spawnMeteor(scene) {
    scene.meteors.push(new Meteor(
        scene,
        Math.random() * window.innerWidth,
        -50,
        100 + 50 * Math.random(),
        0.1 + 0.1 * Math.random()
    ));
}