export class Bullet extends Phaser.GameObject.Sprite{
    constructor (scene, x, y, targetDir, speed){
        super (scene, x, y, 'bulletSprite');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);
        this.setFrame(3);

        this.setScale(0.04);
        this.body.setSize(10, 80);
        this.body.setOffset(0.2, 0);

        this.scene = scene;
        this.speed = speed;
        this.velocity = targetDir.normalize().scale(speed);
        this.setMeteorCollision();
    }

    update () {
        if (this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
            this.destroy();
        }
    }

    setMeteorCollision (target) {
        this.scene.meteors.forEach(meteor => {
            this.scene.physics.add.overlap(
                this,
                meteor,
                () => {
                    meteor.exploade();
                    this.destroy();
                }
            );
        });
    }
}