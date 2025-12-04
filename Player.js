export class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "playerImg");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.3);

        this.scene = scene;
        this.hp = 5;
        this.speed = 200; //pixels per second
        this.velocity = new Phaser.Math.Vector2(0, 0);
    }

    update(time, delta) {
        this.move();
    }

    hit() {
        this.hp -= 1;
        this.scene.cameras.main.shake(200, 0.01);
        if (this.hp <= 0) {
            alert("Game Over\nur dead :(")
            // TODO: add game over menu
        }
    }

    move() {
        let x_move = 0;
        let y_move = 0;

        if (this.scene.dKey.isDown || this.scene.cursors.right.isDown)
            {x_move += 1;}
        if (this.scene.aKey.isDown || this.scene.cursors.left.isDown)
            {x_move -= 1;}
        if (this.scene.sKey.isDown || this.scene.cursors.down.isDown)
            {y_move += 1;}
        if (this.scene.wKey.isDown || this.scene.cursors.up.isDown)
            {y_move -= 1;}

        let movement = new Phaser.Math.Vector2(x_move, y_move);

        if (movement.length() > 0) {
            movement.normalize();
            this.body.setVelocity(movement.x * this.speed, movement.y * this.speed);
        } else {
            // Amortissement : réduit la vélocité progressivement
            this.body.velocity.scale(0.9);
            if (this.body.velocity.length() < 10) {
                this.body.setVelocity(0, 0);
            }
        }
    }
}