export class Bullet extends Phaser.GameObjects.Sprite{
    constructor (scene, x, y, targetDir, type){
        super (scene, x, y, 'bulletSprite');
        scene.add.existing(this);
        this.scene.physics.add.existing(this);

        this.setScale(0.04);
        this.body.setSize(100, 800);
        this.body.setOffset(30, 50);

        this.scene = scene;
        this.setType(type);
        this.body.velocity = targetDir.normalize().scale(this.speed);
        this.setMeteorCollision();
    }

    setType(type) {
        this.type = type;
        switch (type) {
            case 1:
                this.setFrame(3);
                this.speed = 500;
                break;
            case 2:
                this.setFrame(1);
                this.speed = 400;
                break;
            case 3:
                this.setFrame(4);
                this.speed = 750;
                break;
            default:
                this.setFrame(3);
                this.speed = 500;
        }
    }

    update () {
        if (this.x < 0 || this.x > window.innerWidth || this.y < 0 || this.y > window.innerHeight) {
            this.destroy();
        }
    }

    setMeteorCollision () {
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