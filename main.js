import {Player} from "./Player.js";
import {Meteor} from "./Meteor.js";
import {Hp} from "./Hp.js";
import {Bullet} from "./Bullet.js";

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
    physics: {
        default: "arcade",
        arcade: {
            debug: true
        }
    }
};

const game = new Phaser.Game(config);

function preload() {
    this.load.image("playerImg", "./assets/player.png");
    this.load.image("meteorImg", "./assets/meteor.png");
    this.load.spritesheet("hpSprite", "./assets/hp-sprite.png", {
        frameWidth: 640,
        frameHeight: 1600
    });
    this.load.spritesheet("bulletSprite", "./assets/bullets-sprite.png", {
        frameWidth: 260,
        frameHeight: 2000
    });
}

function create() {
    createKeys(this);
    createPlayer(this);
    this.meteors = [];
    this.hpDisplay = new Hp(this, 30, 30);
    this.bullets = [];
    spawnBullet(this);
}

function update(time, delta) {
    // Update all sprites:
    if (this.player) {
        this.player.update(time, delta);
    }
    if (this.meteors) {
        this.meteors.forEach(meteor => {
            meteor.update();
        })
    }
    if (this.hpDisplay) {
        this.hpDisplay.update();
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
        1 + 1 * Math.random()
    ));
}

function spawnBullet(scene) {
    scene.bullets.push(new Bullet(
        scene,
        200,
        200,
        new Phaser.Math.Vector2(0, 0),
        0
    ));
}