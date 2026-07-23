class PlanetIntroScene extends Phaser.Scene {


    constructor(){
        super("PlanetIntroScene");
    }


    init(data){

        this.playerName=data.name;
        this.flag=data.flag;

    }



    create(){


        this.cameras.main.setBackgroundColor("#003344");



        this.add.text(
            160,
            25,
            "🌍 SUPER-EARTH",
            {
                fontFamily:"monospace",
                fontSize:"16px",
                color:"#ffffff"
            }
        )
        .setOrigin(0.5);



        this.add.text(
            160,
            70,
            "SUPER-EARTHS ARE\nROCKY WORLDS\nLARGER THAN EARTH.\n\nTHIS PLANET HAS\nLAND AND WATER,\nMAKING IT THE PERFECT\nFIRST MISSION.",
            {
                fontFamily:"monospace",
                fontSize:"10px",
                color:"#ffffff",
                align:"center"
            }
        )
        .setOrigin(0.5);



        this.add.text(
            160,
            150,
            "PRESS ENTER TO LAND",
            {
                fontFamily:"monospace",
                fontSize:"10px",
                color:"#ffff00"
            }
        )
        .setOrigin(0.5);



        this.input.keyboard.once(
            "keydown-ENTER",
            ()=>{


                this.scene.start(
                    "Planet1Scene",
                    {
                        name:this.playerName,
                        flag:this.flag
                    }
                );


            }
        );


    }


}