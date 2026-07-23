class FlagScene extends Phaser.Scene {


    constructor(){

        super("FlagScene");

    }



    init(data){

        this.playerName=data.name;

    }



    create(){


        this.cameras.main.setBackgroundColor("#05051a");


        this.add.text(
            160,
            30,
            "CREATE YOUR FLAG",
            {
                fontFamily:"monospace",
                fontSize:"16px",
                color:"#ffffff"
            }
        )
        .setOrigin(0.5);



        this.add.text(
            160,
            65,
            this.playerName,
            {
                fontFamily:"monospace",
                fontSize:"14px",
                color:"#ffff00"
            }
        )
        .setOrigin(0.5);



        this.flagColors=[
            0xff0000,
            0x00ff00,
            0x0000ff,
            0xffff00
        ];

        this.selectedColor=0;



        this.flag =
        this.add.rectangle(
            160,
            110,
            50,
            35,
            this.flagColors[0]
        );



        this.add.text(
            160,
            160,
            "ARROWS: COLOR\nENTER: CONFIRM",
            {
                fontFamily:"monospace",
                fontSize:"10px",
                color:"#ffffff",
                align:"center"
            }
        )
        .setOrigin(0.5);



        this.input.keyboard.on(
            "keydown-RIGHT",
            ()=>{

                this.selectedColor++;

                if(this.selectedColor>=this.flagColors.length)
                    this.selectedColor=0;


                this.flag.setFillStyle(
                    this.flagColors[this.selectedColor]
                );

            }
        );



        this.input.keyboard.on(
            "keydown-ENTER",
            ()=>{


                this.scene.start(
                    "StoryScene",
                    {
                        name:this.playerName,
                        flag:this.flagColors[this.selectedColor]
                    }
                );


            }
        );


    }

}