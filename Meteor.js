export class Meteor extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, speed, size) {
        super(scene, x, y, "meteorImg");
        // TODO Add diffrent images for meteor
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(size);

        this.speed = speed;
        this.scene = scene;

        this.body.setVelocity(0, this.speed);
    }

    update () { 
        if (this.y > window.innerHeight + this.height) {
            this.destroy();
        }
        
        if (this.scene.physics.overlap(this, this.scene.player)) {
            this.scene.player.hit();
            //TODO: add an explosion animation that destroys others nerby meteors
            this.destroy();
        }
    }
}