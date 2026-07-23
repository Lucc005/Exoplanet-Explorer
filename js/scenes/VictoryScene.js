class VictoryScene extends Phaser.Scene {


    constructor(){

        super("VictoryScene");

    }



    init(data){

        this.playerName = data.name;
        this.flag = data.flag;

    }



    create(){


        // Background

        this.cameras.main.setBackgroundColor("#001122");



        // Title

        this.add.text(
            160,
            45,
            "SUPER-EARTH\nLIBERATED!",
            {
                fontFamily:"monospace",
                fontSize:"20px",
                color:"#ffff00",
                align:"center"
            }
        )
        .setOrigin(0.5);



        // Victory message

        this.add.text(
            160,
            110,
            "🚩 FLAG PLANTED\n\nNEW TECHNOLOGY FOUND:\n\nENGINE CORE MK I",
            {
                fontFamily:"monospace",
                fontSize:"12px",
                color:"#ffffff",
                align:"center"
            }
        )
        .setOrigin(0.5);



        // Explorer name

        this.add.text(
            160,
            155,
            this.playerName + "\nEXOPLANET EXPLORER",
            {
                fontFamily:"monospace",
                fontSize:"10px",
                color:"#00ffff",
                align:"center"
            }
        )
        .setOrigin(0.5);



        // Continue

        this.continueText =
        this.add.text(
            160,
            175,
            "PRESS ENTER",
            {
                fontFamily:"monospace",
                fontSize:"10px",
                color:"#ffffff"
            }
        )
        .setOrigin(0.5);



        // Blinking animation

        this.tweens.add({

            targets:this.continueText,

            alpha:0,

            duration:600,

            yoyo:true,

            repeat:-1

        });



        // Continue to next mission

        this.input.keyboard.once(
            "keydown-ENTER",
            ()=>{


                this.scene.start(
                    "PlanetSelectScene",
                    {
                        name:this.playerName,
                        flag:this.flag
                    }
                );


            }
        );


    }


}