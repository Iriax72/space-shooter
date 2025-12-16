/*
export class MobileController {
    move(player) {

    }

    update(player, time, delta) {

    }
}

export class DesktopController {
    move(player) {
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
            movement = movement.normalize();
            player.body.setVelocity(
                movement.x * player.speed,
                movement.y * player.speed
            )
        } else {
            // Amortissement
            this.body.velocity.scale(0.9);
            if (this.body.velocity.length() < 5) {
                this.body.setVelocity(0, 0);
            }
        }
    }

    update(player, time, delta) {
        this.attackDatas = this.getAttackDatas();
    }

    getAttackDatas() {

    }
}
*/