export class Player{
    constructor(scene, x, y) {
        scene.add.sprite(x, y, "playerImg");

        this.setScale(0.3);

        this.scene = scene;
        this.speed = 5; 
        this.velocity = new Phaser.Math.Vector2(0, 0);
    }

    update() {
        this.move();
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
        movement.normalize();

        if (movement.length > 0) {
            this.velocity = movement * this.speed;
        } else {
            this.velocity /= 1.1;
            if (this.velocity.length < 0.1) {
                this.velocity = new Phaser.Math.Vector2(0, 0);
            }
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;

        if (this.x < 0) {this.x = 0;}
        else if (this.x > window.innerWidth) {this.x = window.innerWidth;}
        if (this.y < 0) {this.y = 0;}
        else if (this.y > window.innerHeight) {this.y = window.innerHeight;}
    }
}