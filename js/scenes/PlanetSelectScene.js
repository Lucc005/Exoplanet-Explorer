class PlanetSelectScene extends Phaser.Scene {


    constructor(){

        super("PlanetSelectScene");

    }


    init(data){

        this.playerName=data.name;
        this.flag=data.flag;

    }



    create(){


        this.cameras.main.setBackgroundColor("#02021a");



        this.add.text(
            160,
            30,
            "MISSION MAP",
            {
                fontFamily:"monospace",
                fontSize:"18px",
                color:"#ffffff"
            }
        )
        .setOrigin(0.5);



        let planets=[

            "🌍 SUPER-EARTH",
            "🌊 SUB-NEPTUNE",
            "🪐 GAS GIANT",
            "🔥 HOT JUPITER",
            "❄ ICE PLANET"

        ];



        planets.forEach((planet,index)=>{


            this.add.text(
                160,
                65+(index*20),
                planet,
                {
                    fontFamily:"monospace",
                    fontSize:"12px",
                    color:
                    index===0
                    ?
                    "#ffff00"
                    :
                    "#777777"
                }
            )
            .setOrigin(0.5);


        });



        this.add.text(
            160,
            160,
            "PRESS ENTER TO LAND",
            {
                fontFamily:"monospace",
                fontSize:"10px",
                color:"#00ffff"
            }
        )
        .setOrigin(0.5);



        this.input.keyboard.once(
            "keydown-ENTER",
            ()=>{

                this.scene.start(
                    "PlanetIntroScene",
                    {
                        name:this.playerName,
                        flag:this.flag
                    }
                );

            }
        );


    }

}

window.PlanetSelectScene = PlanetSelectScene;