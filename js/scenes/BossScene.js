class BossScene extends Phaser.Scene {


    constructor(){

        super("BossScene");

    }



    init(data){

        this.playerName = data.name;
        this.flag = data.flag;

    }



    create(){


        this.cameras.main.setBackgroundColor("#003344");



        // Title

        this.add.text(
            160,
            20,
            "OCEAN GUARDIAN",
            {
                fontFamily:"monospace",
                fontSize:"16px",
                color:"#ffffff"
            }
        )
        .setOrigin(0.5);



        // Player

        this.player =
        this.add.rectangle(
            160,
            140,
            12,
            12,
            0xffffff
        );


        this.playerHealth = 10;



        // Boss

        this.boss =
        this.add.rectangle(
            160,
            60,
            40,
            40,
            0x0066ff
        );


        this.bossHealth = 100;



        // UI

        this.hpText =
        this.add.text(
            10,
            10,
            "PLAYER HP: 10\nBOSS HP: 100",
            {
                fontFamily:"monospace",
                fontSize:"10px",
                color:"#ffffff"
            }
        );



        // Controls

        this.keys =
        this.input.keyboard.createCursorKeys();



        this.space =
        this.input.keyboard.addKey(
            Phaser.Input.Keyboard.KeyCodes.SPACE
        );



        this.bullets = [];

        this.attackTimer = 0;



    }




    update(time,delta){



        let speed =
        100 * delta / 1000;



        // Player movement

        if(this.keys.left.isDown){

            this.player.x -= speed;

        }


        if(this.keys.right.isDown){

            this.player.x += speed;

        }


        if(this.keys.up.isDown){

            this.player.y -= speed;

        }


        if(this.keys.down.isDown){

            this.player.y += speed;

        }



        // Shoot

        if(
            Phaser.Input.Keyboard.JustDown(this.space)
        ){

            this.shoot();

        }



        this.moveBullets();



        this.bossAttack(delta);



        this.checkHits();



    }





    shoot(){


        let laser =
        this.add.rectangle(
            this.player.x + 10,
            this.player.y,
            8,
            3,
            0xffff00
        );



        laser.speed = 200;



        this.bullets.push(laser);



    }






    moveBullets(){


        this.bullets.forEach(
            (bullet)=>{


                if(bullet){


                    bullet.x +=
                    bullet.speed * 0.016;



                    if(bullet.x > 320){

                        bullet.destroy();

                    }


                }


            }
        );


    }






    bossAttack(delta){


        this.attackTimer += delta;



        if(this.attackTimer > 2000){



            let wave =
            this.add.rectangle(
                this.boss.x,
                this.boss.y + 25,
                50,
                5,
                0x00ffff
            );



            this.tweens.add({

                targets:wave,

                x:0,

                duration:1500,


                onComplete:()=>{

                    wave.destroy();

                }


            });



            this.attackTimer = 0;


        }


    }






    checkHits(){



        this.bullets.forEach(
            (bullet)=>{



                if(
                    bullet &&
                    Phaser.Math.Distance.Between(
                        bullet.x,
                        bullet.y,
                        this.boss.x,
                        this.boss.y
                    ) < 25
                ){


                    this.bossHealth -= 5;



                    bullet.destroy();



                    this.hpText.setText(
                        "PLAYER HP: "
                        +
                        this.playerHealth
                        +
                        "\nBOSS HP: "
                        +
                        this.bossHealth
                    );



                    if(this.bossHealth <= 0){


                        this.scene.start(
                            "VictoryScene",
                            {
                                name:this.playerName,
                                flag:this.flag
                            }
                        );


                    }


                }



            }
        );


    }



}