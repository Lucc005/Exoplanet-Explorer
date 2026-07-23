class Planet1Scene extends Phaser.Scene {


constructor(){

super("Planet1Scene");

}



init(data){

this.playerName=data.name;
this.flag=data.flag;

}



create(){


this.cameras.main.setBackgroundColor("#3a8f3a");


// Terrain

this.add.rectangle(
160,
90,
320,
180,
0x3a8f3a
);


// Water area

this.add.rectangle(
80,
70,
60,
80,
0x3399ff
);



// Player

this.player =
this.add.rectangle(
160,
120,
12,
12,
0xffffff
);


this.speed=100;



// Controls

this.keys =
this.input.keyboard.createCursorKeys();

this.space =
this.input.keyboard.addKey(
Phaser.Input.Keyboard.KeyCodes.SPACE
);



// Bullets

this.bullets =
this.physics.add.group();


// Enemies

this.enemies =
this.physics.add.group();


// Create enemies

this.createEnemy(80,130);

this.createEnemy(220,80);

this.createEnemy(250,150);



// UI

this.healthText =
this.add.text(
10,
10,
"LASER MK I",
{
fontFamily:"monospace",
fontSize:"10px",
color:"#ffffff"
}
);



}



createEnemy(x,y){


let enemy =
this.add.rectangle(
x,
y,
14,
14,
0xff0000
);


enemy.health=3;


this.enemies.add(enemy);


}



update(time,delta){


let speed =
this.speed *
delta/1000;



// Movement


if(this.keys.left.isDown)
this.player.x-=speed;


if(this.keys.right.isDown)
this.player.x+=speed;


if(this.keys.up.isDown)
this.player.y-=speed;


if(this.keys.down.isDown)
this.player.y+=speed;



// Shooting

if(
Phaser.Input.Keyboard.JustDown(this.space)
){

this.shoot();

}



// Move bullets

this.bullets.children.iterate(
bullet=>{


if(bullet){

bullet.x+=bullet.speed;


if(
bullet.x>320
){

bullet.destroy();

}


}

});



// Collision check

this.checkHits();



}



shoot(){


let laser =
this.add.rectangle(
this.player.x+10,
this.player.y,
8,
2,
0x00ffff
);



laser.speed=200;


this.bullets.add(laser);


}



checkHits(){


this.bullets.children.iterate(
bullet=>{


this.enemies.children.iterate(
enemy=>{


if(
enemy &&
bullet &&
Phaser.Math.Distance.Between(
bullet.x,
bullet.y,
enemy.x,
enemy.y
)<10
){


enemy.health--;

bullet.destroy();



if(enemy.health<=0){

enemy.destroy();


}


}



});


});


}



}