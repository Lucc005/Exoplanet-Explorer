class NameScene extends Phaser.Scene {

    constructor(){
        super("NameScene");
    }


    create(){

        this.cameras.main.setBackgroundColor("#05051a");


        this.add.text(
            160,
            35,
            "EXOPLANET ACADEMY",
            {
                fontFamily:"monospace",
                fontSize:"16px",
                color:"#ffffff"
            }
        )
        .setOrigin(0.5);



        this.add.text(
            160,
            80,
            "CADET,\nWHAT IS YOUR NAME?",
            {
                fontFamily:"monospace",
                fontSize:"14px",
                color:"#ffff00",
                align:"center"
            }
        )
        .setOrigin(0.5);



        this.nameText = this.add.text(
            160,
            125,
            "_",
            {
                fontFamily:"monospace",
                fontSize:"18px",
                color:"#00ffff"
            }
        )
        .setOrigin(0.5);



        this.playerName="";


        this.input.keyboard.on(
            "keydown",
            (event)=>{

                let key = event.key;


                if(key==="Backspace"){

                    this.playerName =
                    this.playerName.slice(0,-1);

                }


                else if(
                    key.length===1 &&
                    this.playerName.length<12
                ){

                    this.playerName += key.toUpperCase();

                }


                this.nameText.setText(
                    this.playerName + "_"
                );

            }
        );



        this.input.keyboard.on(
            "keydown-ENTER",
            ()=>{


                if(this.playerName.length>0){

                    console.log(
                        "Explorer:",
                        this.playerName
                    );


                    this.scene.start(
                        "FlagScene",
                        {
                            name:this.playerName
                        }
                    );

                }


            }
        );


    }

}