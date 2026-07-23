class StoryScene extends Phaser.Scene {


    constructor(){

        super("StoryScene");

    }


    init(data){

        this.playerName = data.name;
        this.flag = data.flag;

    }



    create(){


        this.cameras.main.setBackgroundColor("#05051a");


        // Professor

        this.add.text(
            160,
            45,
            "◉",
            {
                fontSize:"40px",
                color:"#ffffff"
            }
        )
        .setOrigin(0.5);



        this.dialogueBox =
        this.add.rectangle(
            160,
            145,
            290,
            55,
            0x000000
        );

        this.dialogueBox.setStrokeStyle(
            2,
            0xffffff
        );



        this.dialogueText =
        this.add.text(
            25,
            120,
            "",
            {
                fontFamily:"monospace",
                fontSize:"10px",
                color:"#ffffff",
                wordWrap:{
                    width:260
                }
            }
        );


        this.messages=[

            "Welcome, Explorer.",

            `Your name is ${this.playerName}, correct?`,

            "Humanity has discovered five mysterious exoplanets.",

            "Each world has been invaded by alien creatures.",

            "Your mission is to explore these planets, defeat the invaders, and collect data.",

            "Build your rocket. Upgrade your technology.",

            "Become the first official Exoplanet Explorer."

        ];


        this.currentMessage=0;


        this.showMessage();



        this.input.keyboard.on(
            "keydown-ENTER",
            ()=>{

                this.currentMessage++;


                if(
                    this.currentMessage <
                    this.messages.length
                ){

                    this.showMessage();

                }

                else{


                    this.scene.start(
                        "PlanetSelectScene",
                        {
                            name:this.playerName,
                            flag:this.flag
                        }
                    );


                }


            }
        );


    }



    showMessage(){


        this.dialogueText.setText(
            this.messages[this.currentMessage]
        );


    }



}

window.StoryScene = StoryScene;