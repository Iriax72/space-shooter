export class Meteor extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, speed, size) {
        super(scene, x, y, "meteorImg");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(size);
        this.body.setSize(this.width, this.height);
        this.body.setOffset(this.width * (0.65 - size) /2, this.height * (0.65 - size) /2);

        this.speed = speed;
        this.scene = scene;

        this.body.setVelocity(0, this.speed);
        this.createCollision(this.scene.player);
    }

    update () { 
        if (this.y > window.innerHeight + this.height) {
            this.destroy();
            return;
        }
    }

    createCollision(player) {
        this.scene.physics.add.overlap(
            this,
            player,
            () => {
                player.hit();
                //TODO: add an explosion animation that destroys others nerby meteors
                this.destroy();
            }
        );
    }
}