class Laser {
    constructor(scene, x, y, direction, options = {}) {
        this.scene = scene;

        this.speed = options.speed || 220;
        this.damage = options.damage || 1;
        this.color = options.color || 0x00ffff;

        this.direction = direction;

        const directionVectors = {
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 },
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 }
        };

        const vector = directionVectors[direction];

        this.directionX = vector.x;
        this.directionY = vector.y;

        const width =
            this.directionX === 0 ? 3 : 8;

        const height =
            this.directionY === 0 ? 3 : 8;

        this.sprite = scene.add.rectangle(
            x,
            y,
            width,
            height,
            this.color
        );

        scene.physics.add.existing(this.sprite);

        this.sprite.body.setAllowGravity(false);

        this.sprite.body.setSize(
            width,
            height
        );

        this.sprite.laserObject = this;

        this.hasHit = false;
    }

    update(delta) {
        if (!this.sprite.active) {
            return;
        }

        this.sprite.x +=
            this.directionX *
            this.speed *
            delta / 1000;

        this.sprite.y +=
            this.directionY *
            this.speed *
            delta / 1000;

        this.sprite.body.updateFromGameObject();

        if (this.isOutsideWorld()) {
            this.destroy();
        }
    }

    isOutsideWorld() {
        return (
            this.sprite.x < -10 ||
            this.sprite.x > 330 ||
            this.sprite.y < -10 ||
            this.sprite.y > 190
        );
    }

    hit() {
        if (this.hasHit) {
            return;
        }

        this.hasHit = true;
        this.destroy();
    }

    destroy() {
        if (this.sprite && this.sprite.active) {
            this.sprite.destroy();
        }
    }
}

window.Laser = Laser;