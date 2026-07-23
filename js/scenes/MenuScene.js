class MenuScene extends Phaser.Scene {

    constructor() {
        super("MenuScene");
    }


    create() {

        // Background
        this.cameras.main.setBackgroundColor("#05051a");


        // Create stars
        this.stars = [];

        for (let i = 0; i < 60; i++) {

            let star = this.add.rectangle(
                Phaser.Math.Between(0, 320),
                Phaser.Math.Between(0, 180),
                1,
                1,
                0xffffff
            );

            star.speed = Phaser.Math.Between(10, 40);

            this.stars.push(star);
        }


        // Game title

        this.add.text(
            160,
            45,
            "EXOPLANET\nEXPLORER",
            {
                fontFamily: "monospace",
                fontSize: "24px",
                color: "#ffffff",
                align: "center"
            }
        )
        .setOrigin(0.5);



        // Rocket

        this.rocket = this.add.text(
            160,
            90,
            "🚀",
            {
                fontSize:"32px"
            }
        )
        .setOrigin(0.5);



        // Press Enter text

        this.startText = this.add.text(
            160,
            145,
            "PRESS ENTER",
            {
                fontFamily:"monospace",
                fontSize:"12px",
                color:"#ffff00"
            }
        )
        .setOrigin(0.5);



        // Blinking effect

        this.tweens.add({
            targets:this.startText,
            alpha:0,
            duration:600,
            yoyo:true,
            repeat:-1
        });



        // Rocket floating animation

        this.tweens.add({

            targets:this.rocket,

            y:85,

            duration:1000,

            yoyo:true,

            repeat:-1,

            ease:"Sine.easeInOut"

        });



        // Keyboard

        this.input.keyboard.on(
            "keydown-ENTER",
            ()=>{

                this.scene.start("NameScene");

            }
        );

    }



    update(time, delta){


        // Move stars

        this.stars.forEach(star=>{

            star.y += star.speed * delta / 1000;


            if(star.y > 180){

                star.y = 0;

                star.x = Phaser.Math.Between(0,320);

            }

        });


    }

}