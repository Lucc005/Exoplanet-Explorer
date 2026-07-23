class Player {
    constructor(scene, x, y) {
        this.scene = scene;

        this.speed = 100;

        this.maxHealth = 10;
        this.health = this.maxHealth;

        this.direction = "right";
        this.isInvulnerable = false;

        this.sprite = scene.add.rectangle(
            x,
            y,
            14,
            14,
            0xffffff
        );

        scene.physics.add.existing(this.sprite);

        this.sprite.body.setCollideWorldBounds(true);

        this.keys = scene.input.keyboard.createCursorKeys();

        this.spaceKey = scene.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );
    }

    update(delta) {
        const movement = this.speed * delta / 1000;

        let moveX = 0;
        let moveY = 0;

        if (this.keys.left.isDown) {
            moveX -= movement;
            this.direction = "left";
        } else if (this.keys.right.isDown) {
            moveX += movement;
            this.direction = "right";
        }

        if (this.keys.up.isDown) {
            moveY -= movement;
            this.direction = "up";
        } else if (this.keys.down.isDown) {
            moveY += movement;
            this.direction = "down";
        }

        /*
         * Prevent diagonal movement from being faster than
         * horizontal or vertical movement.
         */
        if (moveX !== 0 && moveY !== 0) {
            moveX *= 0.7071;
            moveY *= 0.7071;
        }

        this.sprite.x += moveX;
        this.sprite.y += moveY;

        this.keepInsideWorld();
    }

    keepInsideWorld() {
        const halfWidth = this.sprite.width / 2;
        const halfHeight = this.sprite.height / 2;

        this.sprite.x = Phaser.Math.Clamp(
            this.sprite.x,
            halfWidth,
            320 - halfWidth
        );

        this.sprite.y = Phaser.Math.Clamp(
            this.sprite.y,
            halfHeight,
            180 - halfHeight
        );
    }

    canShoot() {
        return Phaser.Input.Keyboard.JustDown(this.spaceKey);
    }

    takeDamage(amount) {
        if (this.isInvulnerable) {
            return false;
        }

        this.health = Math.max(0, this.health - amount);
        this.isInvulnerable = true;

        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0.25,
            duration: 100,
            yoyo: true,
            repeat: 4,
            onComplete: () => {
                this.sprite.setAlpha(1);
                this.isInvulnerable = false;
            }
        });

        return true;
    }

    isDead() {
        return this.health <= 0;
    }
}

window.Player = Player;