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
    const pointer = this.input.activePointer;

    updateSprites(this, time, delta)

    // Spawn meteors
    if (Math.random() < 0.3 * (delta / 1000)) {
        spawnMeteor(this);
    }
    // Shoot bullets
    if (this.oneKey.isDown) {
        spawnBullet(this, {x: pointer.x, y: pointer.y}, 1);
    } else if (this.twoKey.isDown) {
        spawnBullet(this, {x: pointer.x, y: pointer.y}, 2);
    } else if (this.threeKey.isDown) {
        spawnBullet(this, {x: pointer.x, y:pointer.y}, 3)
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
    scene.oneKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE);
    scene.twoKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO);
    scene.threeKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE);
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

function spawnBullet(scene, target={x: scene.player.x, y: -1}, type=1) {
    scene.bullets.push(new Bullet(
        scene,
        scene.player.x,
        scene.player.y,
        new Phaser.Math.Vector2(target.x - scene.player.x, target.y - scene.player.y),
        type
    ));
}

function updateSprites(scene, time, delta) {
    if (scene.player) {
        scene.player.update(time, delta);
    }
    if (scene.meteors) {
        scene.meteors.forEach(meteor => {
            meteor.update();
        });
    }
    if (scene.hpDisplay) {
        scene.hpDisplay.update();
    }
    if (scene.bullets) {
        scene.bullets.forEach(bullet => {
            bullet.update();
        });
    }
}