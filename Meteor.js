export class Meteor extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y, speed, size){
        super(scene, x, y, "meteorImg");
        // TODO Add diffrent images for meteor
        scene.add.existing(this);

        this.setScale(size);

        this.speed = speed;
        this.scene = scene;
    }

    update(delta){
        this.move(delta);
        //TODO: check colision with player
    }

    move(delta){
        dt =
        delta / 1000;
        this.y += this.speed * dt;

        if (this.y > window.innerHeight + this.height) {
            this.destroy();
        }
    }
}