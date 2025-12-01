import {Player} from "./Player"

const gameContainer = document.querySelector("#game-container");

const config = {
    type: phaser.AUTO,
    width: 800,
    height: 600,
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
    const player = new Player(this, 100, 100);
}

function update() {

}