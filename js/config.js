const config = {

    type: Phaser.AUTO,

    width:320,

    height:180,


    scale:{
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },

    physics:{

    default:"arcade",

    arcade:{
        debug:false
    }

    },


    backgroundColor:"#000000",


    scene:[
        MenuScene,
        NameScene,
        FlagScene,
        StoryScene,
        PlanetSelectScene,
        PlanetIntroScene,
        Planet1Scene,
        BossScene,
        VictoryScene
    ]

}