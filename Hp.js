export class Hp extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "hpSprite");
        scene.add.existing(this);
        this.setFrame(1);

        this.setScale(0.3);
        this.scene = scene;
    }

    update() {
        if(this.scene.player.hp != this.frame.name +1) {
            this.setFrame(this.scene.player.hp -1);
        }
    }
}