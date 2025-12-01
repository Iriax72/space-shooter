export class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "playerImg");
        scene.add.existing(this);

        this.setScale(0.3);

        this.scene = scene;
        this.speed = 200; //pixels per second
        this.velocity = new Phaser.Math.Vector2(0, 0);
    }

    update(delta) {
        this.move(delta);
    }

    move(delta) {
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

        const dt = delta / 1000;

        if (movement.length() > 0) {
            movement.normalize();
            this.velocity = movement.scale(this.speed * dt);
        } else {
            this.velocity.scale(1 / 1.1);
            if (this.velocity.length() < 0.1) {
                this.velocity.set(0, 0);
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x < 0)
            {this.x = 0;}
        else if (this.x > window.innerWidth)
            {this.x = window.innerWidth;}
        if (this.y < 0)
            {this.y = 0;}
        else if (this.y > window.innerHeight)
            {this.y = Window.innerHeight;}
    }
}