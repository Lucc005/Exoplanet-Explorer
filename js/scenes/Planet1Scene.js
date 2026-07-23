class Planet1Scene extends Phaser.Scene {
    constructor() {
        super("Planet1Scene");
    }

    init(data) {
        this.playerName = data.name;
        this.flag = data.flag;
    }

    create() {
        this.cameras.main.setBackgroundColor("#3a8f3a");

        this.levelComplete = false;

        // Terrain
        this.add.rectangle(
            160,
            90,
            320,
            180,
            0x3a8f3a
        );

        // Water
        this.water = this.add.rectangle(
            80,
            70,
            60,
            80,
            0x3399ff
        );

        // Player
        this.player = new Player(
            this,
            160,
            120
        );

        // Laser objects
        this.lasers = [];

        // Physics groups
        this.bullets =
            this.physics.add.group();

        this.enemies =
            this.physics.add.group();

        this.enemiesRemaining = 3;

        this.createEnemy(80, 130);
        this.createEnemy(220, 80);
        this.createEnemy(250, 150);

        this.physics.add.overlap(
            this.bullets,
            this.enemies,
            this.laserHitEnemy,
            null,
            this
        );

        // UI
        this.healthText = this.add.text(
            10,
            10,
            "",
            {
                fontFamily: "monospace",
                fontSize: "10px",
                color: "#ffffff"
            }
        );

        this.enemyText = this.add.text(
            310,
            10,
            "",
            {
                fontFamily: "monospace",
                fontSize: "10px",
                color: "#ffffff",
                align: "right"
            }
        ).setOrigin(1, 0);

        this.messageText = this.add.text(
            160,
            160,
            "DEFEAT ALL ALIENS",
            {
                fontFamily: "monospace",
                fontSize: "9px",
                color: "#ffffff",
                align: "center"
            }
        ).setOrigin(0.5);

        this.updateUI();
    }

    update(time, delta) {
        if (this.levelComplete) {
            return;
        }

        this.player.update(delta);

        if (this.player.canShoot()) {
            this.shoot();
        }

        this.updateLasers(delta);
        this.moveEnemies(delta);
        this.checkEnemyDamage();
    }

    shoot() {
        const directionVectors = {
            left: { x: -1, y: 0 },
            right: { x: 1, y: 0 },
            up: { x: 0, y: -1 },
            down: { x: 0, y: 1 }
        };

        const direction =
            directionVectors[this.player.direction];

        const spawnDistance = 12;

        const spawnX =
            this.player.sprite.x +
            direction.x * spawnDistance;

        const spawnY =
            this.player.sprite.y +
            direction.y * spawnDistance;

        const laser = new Laser(
            this,
            spawnX,
            spawnY,
            this.player.direction,
            {
                speed: 220,
                damage: 1,
                color: 0x00ffff
            }
        );

        this.lasers.push(laser);

        this.bullets.add(
            laser.sprite
        );
    }

    updateLasers(delta) {
        for (const laser of this.lasers) {
            laser.update(delta);
        }

        this.lasers =
            this.lasers.filter(
                laser =>
                    laser.sprite &&
                    laser.sprite.active
            );
    }

    createEnemy(x, y) {
        const enemy = this.add.rectangle(
            x,
            y,
            14,
            14,
            0xff0000
        );

        this.physics.add.existing(enemy);

        enemy.health = 3;
        enemy.speed = 22;
        enemy.detectionRange = 90;
        enemy.contactDamage = 1;
        enemy.wasDefeated = false;

        enemy.body.setSize(
            enemy.width,
            enemy.height
        );

        this.enemies.add(enemy);
    }

    laserHitEnemy(
        laserSprite,
        enemy
    ) {
        if (
            !laserSprite.active ||
            !enemy.active ||
            enemy.wasDefeated
        ) {
            return;
        }

        const laser =
            laserSprite.laserObject;

        if (
            !laser ||
            laser.hasHit
        ) {
            return;
        }

        enemy.health -= laser.damage;

        laser.hit();

        this.flashEnemy(enemy);

        if (enemy.health <= 0) {
            this.defeatEnemy(enemy);
        }
    }

    flashEnemy(enemy) {
        if (!enemy.active) {
            return;
        }

        enemy.setFillStyle(
            0xffffff
        );

        this.time.delayedCall(
            80,
            () => {
                if (enemy.active) {
                    enemy.setFillStyle(
                        0xff0000
                    );
                }
            }
        );
    }

    defeatEnemy(enemy) {
        if (enemy.wasDefeated) {
            return;
        }

        enemy.wasDefeated = true;

        enemy.disableBody(
            true,
            true
        );

        this.enemiesRemaining--;

        this.updateUI();

        if (
            this.enemiesRemaining <= 0
        ) {
            this.prepareBossBattle();
        }
    }

    moveEnemies(delta) {
        const enemies =
            this.enemies.getChildren();

        for (const enemy of enemies) {
            if (
                !enemy ||
                !enemy.active ||
                enemy.wasDefeated
            ) {
                continue;
            }

            const distance =
                Phaser.Math.Distance.Between(
                    enemy.x,
                    enemy.y,
                    this.player.sprite.x,
                    this.player.sprite.y
                );

            if (
                distance >
                enemy.detectionRange
            ) {
                continue;
            }

            const angle =
                Phaser.Math.Angle.Between(
                    enemy.x,
                    enemy.y,
                    this.player.sprite.x,
                    this.player.sprite.y
                );

            enemy.x +=
                Math.cos(angle) *
                enemy.speed *
                delta / 1000;

            enemy.y +=
                Math.sin(angle) *
                enemy.speed *
                delta / 1000;

            enemy.body
                .updateFromGameObject();
        }
    }

    checkEnemyDamage() {
        const enemies =
            this.enemies.getChildren();

        for (const enemy of enemies) {
            if (
                !enemy ||
                !enemy.active ||
                enemy.wasDefeated
            ) {
                continue;
            }

            const touching =
                Phaser.Geom.Intersects
                    .RectangleToRectangle(
                        this.player.sprite
                            .getBounds(),

                        enemy.getBounds()
                    );

            if (!touching) {
                continue;
            }

            const damageApplied =
                this.player.takeDamage(
                    enemy.contactDamage
                );

            if (!damageApplied) {
                continue;
            }

            this.knockEnemyAway(enemy);
            this.updateUI();

            if (this.player.isDead()) {
                this.restartLevel();
                return;
            }
        }
    }

    knockEnemyAway(enemy) {
        const angle =
            Phaser.Math.Angle.Between(
                this.player.sprite.x,
                this.player.sprite.y,
                enemy.x,
                enemy.y
            );

        enemy.x +=
            Math.cos(angle) * 18;

        enemy.y +=
            Math.sin(angle) * 18;

        enemy.body
            .updateFromGameObject();
    }

    prepareBossBattle() {
        if (this.levelComplete) {
            return;
        }

        this.levelComplete = true;

        this.player.sprite
            .setVisible(false);

        this.messageText.setText(
            "ALL ALIENS DEFEATED!\n" +
            "BOSS DETECTED..."
        );

        this.cameras.main.flash(
            300,
            255,
            255,
            255
        );

        this.time.delayedCall(
            1500,
            () => {
                this.scene.start(
                    "BossScene",
                    {
                        name:
                            this.playerName,

                        flag:
                            this.flag,

                        health:
                            this.player.health
                    }
                );
            }
        );
    }

    restartLevel() {
        this.levelComplete = true;

        this.cameras.main.flash(
            200,
            255,
            0,
            0
        );

        this.time.delayedCall(
            250,
            () => {
                this.scene.restart({
                    name:
                        this.playerName,

                    flag:
                        this.flag
                });
            }
        );
    }

    updateUI() {
        this.healthText.setText(
            `HP: ${this.player.health}/` +
            `${this.player.maxHealth}` +
            "\nLASER MK I"
        );

        this.enemyText.setText(
            `ALIENS: ` +
            `${this.enemiesRemaining}`
        );
    }
}

window.Planet1Scene =
    Planet1Scene;