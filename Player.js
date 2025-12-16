import {Bullet} from "./Bullet.js";

// abstract class
class Player extends Phaser.GameObjects.Sprite{
    constructor(scene, x, y) {
        super(scene, x, y, "playerImg");
        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.setScale(0.2);
        this.body.setSize(488, 320);
        this.body.setOffset(61, 40);

        this.body.setCollideWorldBounds(true);

        this.scene = scene;
        this.hp = 5;
        this.speed = 200; //pixels per second
        this.velocity = new Phaser.Math.Vector2(0, 0);
        this.isInCoolDown = false;

        // ca ca devrait peut etre etre gere par la class Bullet
        this.coolDownDurations = {
            1: 600,
            2: 1200,
            3: 3000
        }
    }

    update(time, delta) {
        // movement
        this.move();

        // attack
        const attackDatas = this.getAttackDatas();
        if (attackDatas) {
            this.attack(...attackDatas)
        }
    }

    getAttackDatas() {
        throw new Error("la methode getAttackDatas d'un player d'oit etre override")
        /*if (this.isInCoolDown) {
            return null;
        }
        
        const pointer = this.scene.input.activePointer;
        const target = {x: pointer.x, y: pointer.y};

        if (this.scene.oneKey.isDown) {
            return [this.scene, 1, target];
        }
        if (this.scene.twoKey.isDown) {
            return [this.scene, 2, target];
        }
        if (this.scene.threeKey.isDown) {
            return [this.scene, 3, target];
        }

        return null;
        */
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
        throw new Error("La methode move d'un Player doit etre override.");
        /*let x_move = 0;
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
        }*/
    }

    attack(scene, type, target) {
        this.beginCooldown(this.coolDownDurations[type]);
        scene.bullets.push(new Bullet(
            scene,
            this.x,
            this.y,
            new Phaser.Math.Vector2(target.x - this.x, target.y - this.y),
            type
        ));
    }

    beginCooldown(duration) {
        this.isInCoolDown = true;
        this.scene.time.delayedCall(duration, () => {
            this.isInCoolDown = false;
        })
    }
}

export class PlayerMobile extends Player{
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    move() {
        // TODO
    }

    getAttackDatas() {
        if(this.isInCoolDown) {
            return null;
        }

        // TODO
    }
}

export class PlayerDesktop extends Player{
    constructor(scene, x, y) {
        super(scene, x, y);
    }

    move() {
        let x_move = 0;
        let y_move = 0;

        if (this.scene.dKey.isDown || this.scene.cursors.right.isDown) {
            x_move += 1;
        }
        if (this.scene.aKey.isDown || this.scene.cursors.left.isDown) {
            x_move -= 1;
        }
        if (this.scene.wKey.isDown || this.scene.cursors.up.isDown) {
            y_move -= 1;
        }
        if (this.scene.sKey.isDown || this.scene.cursors.down.isDown) {
            y_move += 1;
        }

        let movement = new Phaser.Math.Vector2(x_move, y_move);

        if (movement.length > 0) {
            movement = movement.normalize();
            this.body.setVelocity(
                movement.x * this.speed, 
                movement.y * this.speed
            );
        } else {
            this.body.velocity.scale(0.9);
            if (this.body.velocity < 10) {
                this.body.setVelocity(0, 0);
            }
        }
    }

    getAttackDatas() {
        if (this.isInCoolDown) {
            return null;
        }

        const scene = this.scene
        const pointer = scene.input.activePointer;
        const target = {x: pointer.x, y: pointer.y};

        if (scene.oneKey.isDown) {
            return [scene, 1, target];
        }
        if (scene.twoKey.isDown) {
            return [scene, 2, target];
        }
        if (scene.threeKey.isDown) {
            return [scene, 3, target];
        }

        return null;
    }
}