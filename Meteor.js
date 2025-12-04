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

    checkCollision(player) {
        // Vérifier si la distance entre météore et joueur est < collision distance
        const distance = Phaser.Math.Distance.Between(
            this.x, this.y,
            player.x, player.y
        );
        const meteorRadius = (this.displayWidth + this.displayHeight) / 4;
        const playerRadius = (player.displayWidth + player.displayHeight) / 4;
        const collisionDistance = meteorRadius + playerRadius;
        
        if (distance < collisionDistance) {
            player.hit();
            //TODO: add an explosion animation that destroys others nerby meteors
            this.destroy();
        }
    }
}