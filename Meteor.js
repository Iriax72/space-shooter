export class Meteor extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, speed, size) {
        super(scene, x, y, "meteorImg");
        // TODO Add diffrent images for meteor
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(size/10);
        this.body.setSize(200 *size, 200 *size);
        this.body.setOffset(240 - 100*size, 240 - 100*size);

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