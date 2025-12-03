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
        alert(this.scene.player);
    }

    update () { 
        if (this.y > window.innerHeight + this.height) {
            this.destroy();
        }
        // Vérifier collision avec le joueur
        if (this.scene.player) {
            this.checkCollision(this.scene.player);
        }
    }

    checkCollision(meteor, player) {
        meteor.scene.physics.overlap(
            meteor,
            player,
            () => {
                player.hit();
                //TODO: add an explosion animation that destroys others nerby meteors
                meteor.destroy();
            },
        );
    }
}