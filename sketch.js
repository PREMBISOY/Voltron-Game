const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var armyGroup;
var armySet = 1;
var edges;
var player;
var laserkGroup;
var laseraGroup;
var laserA_img;
var keith_life = 50; 
var gameState = 'START';
var sheild; 
var sheildActivated = false;
var time = 0;
var sheildRecovery = false;
var bg_img;
var zarkon_life = 60;
var laserZGroup;
var zarkonGroup;
var empror;
var princess;
var text_box,text_box_img,text_box_2;
var button;
var voltron,v_img;
var right;
var left;
var bL,bL_img;





function preload(){

  bg_img = loadImage("images/voltron--bg.jpeg");
  laserA_img = loadImage('images/glara_lasers.png');
  laserZ_img = loadImage('images/glara_lasers.png');
  text_box_img = loadImage('images/text_box.png');
  v_img = loadImage('images/voltron.png');
  bL_img =loadImage('images/black_lion.png');

}




function setup() {
  createCanvas(displayWidth-10,displayHeight-100);
  
  
  voltron = createSprite(width/2,height/2,100,200);
  voltron.addImage('voltron',v_img);

  player = new Keith(displayWidth/2,displayHeight/2-100);
  // player.body.visibile = false;
  //empror = new Zarkon(width/2,height/2);
  princess = new Allura(70,650);
  text_box = createSprite(350,650,100,900);
  text_box.addImage('msgs',text_box_img);
  text_box.scale = 0.8;
  text_box.depth = 0;
  button = createButton('START');
  button.position(width/2,height/2 + 100);
  text_box_2 = createSprite(840,650,100,900);
     
    text_box_2.addImage('msgs',text_box_img);
    text_box_2.scale = 0.8;
    text_box_2.depth = 0;
    text_box_2.visible = false;

    bL = createSprite(player.body.x, player.body.y - 100,20,20);
    bL.addImage('black_lion',bL_img);
    bL.scale = 0.2; 
    bL.visible = false;


  
  
  



  armyGroup = new Group();
laserkGroup = new Group();
laseraGroup = new Group();
laserZGroup = new Group();
zarkonGroup = new Group();




engine = Engine.create();
world = engine.world;
}
  
function draw() {
  background('white');
  
  edges = createEdgeSprites();
  camera.position.x = player.body.x;
  camera.position.y = player.body.y;
  
  edges[0].visible = false;
  edges[1].visible = false;
  edges[2].visible = false;
  edges[3].visible = false;

console.log(gameState);

  button.mousePressed(()=>{
    gameState = 'PLAY'
  });

  if(gameState === 'START'){
    text_box_2.visible = true;
    drawSprites(); 
    //console.log(princess.body.x);
    
    fill('red');
    textSize(18);
    text("Use right and left arrow for control.Use 'space' to shoot.\nUse 'x + .' and 'x + ,' for boost. Use 'shift + s' for activating\nsheild after the shield Recovery = 59 then sheild is ready\nto use.",text_box_2.x-240,text_box_2.y-30);
    text('Hey, Keith the black lion has been captured by ZARKON \n the ruthless ruler of the galra empire \n Your mission is to defeat Zarkon and rescue the black lion',text_box.x-240,text_box.y-20);
    
    }

if(gameState === 'PLAY' ){
  background(bg_img);
  button.hide();
  player.body.visible = true;
  voltron.visible = false;
  text_box_2.visible = false;
  
  switch(armySet)
  {
    case 1 :for(var i = 0;i<1;i++)
           {
            armyGroup.add(new Army(random(100,displayWidth-100),50).body);
           armySet = 'set 1';
           }
           break;
   case 2 :for(var i = 0;i<2;i++)
          {
           armyGroup.add(new Army(random(100,displayWidth-100),50).body);
           armySet = 'set 2';
           }
           break; 
   case 3 :for(var i = 0;i<4;i++)
          {
           armyGroup.add(new Army(random(100,displayWidth-100),50).body);
           armySet = 'set 3';
           }
           break; 
   case 4 :for(var i = 0;i<6;i++)
          {
           armyGroup.add(new Army(random(100,displayWidth-100),50).body);
           armySet = 'set 4';
           }
           break; 
   case 5 :for(var i = 0;i<8;i++)
           {
            armyGroup.add(new Army(random(100,displayWidth-100),50).body);
            armySet = 'set 5';
            }
            break;
   case 6 :for(var i = 0;i<10;i++)
          {
           armyGroup.add(new Army(random(100,displayWidth-100),50).body);
           armySet = 'set 6';
           }
           break; 
  
   case 7 :for(var i = 0;i<12;i++)
          {
           armyGroup.add(new Army(random(100,displayWidth-100),50).body);
           armySet = 'set 7';
           }
           break; 
  
   case 8 :for(var i = 0;i<14;i++)
          {
           armyGroup.add(new Army(random(100,displayWidth-100),50).body);
           armySet = 'set 8';
           }
           break; 
   case 9 :for(var i = 0;i<1;i++)
         {
           empror = new Zarkon(width/2,100);
           armySet = 'BOSS FIGHT'
         
         }
            break; 
  
  
           
  
  }
  armyDestruction();
  player.keithActivity();
   if(empror){
     empror.zarkonActivity();
     stroke('white');
     text_box_2.visible = true;
     
     
           }
  
  armyDuty();
  
  keithDestruction();
  
  playerDestruction();
  
    drawSprites();
    shieldActivation();
    stroke('white');
    strokeWeight(2);
    fill('red');
  textSize(22);
  text('FLEET = '+ armySet,player.body.x-600,player.body.y+260);
  text('HEALTH = '+ keith_life,player.body.x-600,player.body.y+300);
   
  if(empror){
    zarkonDestruction();

    
    

    stroke('white');
    strokeWeight(2);
    fill('red');
  textSize(18);
    text('ZARKON HEALTH = '+ zarkon_life,player.body.x-380,player.body.y+360);
 
    stroke('white');
    strokeWeight(2);
          fill('red');
          textSize(20);
          text('ZARKON IS HERE DESTROY HIM \n AND RESCUE THE BLACK LION',text_box_2.x-200,text_box_2.y-20);
          
     }
       
  
       
}

text_box.x = player.body.x-400;
princess.body.x = player.body.x-680;
text_box_2.x = text_box.x + 510;

if(gameState === 'END'){
  background(bg_img);
  drawSprites(); 
  stroke('white');
    strokeWeight(2);
    fill('red');
    textSize(22);
    text('MISSION FAILED!!!',width/2,height/2);
 
    if(keyDown('r')){
      
    gameState = 'PLAY';

  
    
  }

}

if(gameState === 'WON')
    {
      drawSprites();
      stroke('white');
    strokeWeight(2);
    fill('red');
  textSize(22);
      text('MISSION SUCESS !!',text_box.x + 30,text_box.y);
      text("Press 'v' to call the Black Lion now that Zarkon\nis defeated and you have re-established\nconnection with it",text_box_2.x -240,text_box_2.y-20)
    
       if(keyDown('v'))
        {
          bL.visible = true;
          bL.y = player.body.y - 100;
          bL.x = player.body.x;
        }
    }

}

function armyDuty(){

for(var j = 0; j<armyGroup.length && armyGroup.length>0 ; j++)
{
//armyGroup[j].armyActivity();
//console.log(armyGroup[j]);
armyGroup[j].bounceOff(edges);
// console.log(frameCount);
if(frameCount%60 === 0){
  var laserA = createSprite(395,200,5,50);
  console.log('armyActiveted');
  laserA.x = armyGroup[j].x;
  laserA.y = armyGroup[j].y;
  laserA.velocityY = 5;
  laserA.lifetime = 90; 
  laserA.scale = 0.03;
  laserA.addImage('laserA_img',laserA_img);  
  laseraGroup.add(laserA);
}

}

}

function armyDestruction(){

for(var i=0;i<armyGroup.length && laserkGroup.length>0; i++){
  if(armyGroup[i].isTouching(laserkGroup))
  {
    armyGroup[i].destroy();

    if(armyGroup.length === 0 && armySet === 'set 1')
    {
    armySet = 2;
     } 

     if(armyGroup.length === 0 && armySet === 'set 2')
    {
    armySet = 3;
     } 

     if(armyGroup.length === 0 && armySet === 'set 3')
    {
    armySet = 4;
     } 

     if(armyGroup.length === 0 && armySet === 'set 4')
     {
     armySet = 5;
      } 
      if(armyGroup.length === 0 && armySet === 'set 5')
     {
     armySet = 6;
      }

      if(armyGroup.length === 0 && armySet === 'set 6')
     {
     armySet = 7;
      } 

      if(armyGroup.length === 0 && armySet === 'set 7')
     {
     armySet = 8;
      } 
      if(armyGroup.length === 0 && armySet === 'set 8')
     {
     armySet = 9;
      } 
      


  }
}



}


function keithDestruction(){

  for(var i=0;i<laseraGroup.length && laseraGroup.length>0; i++){
    if(laseraGroup[i].isTouching(player.body))
    {
      laseraGroup[i].destroy();
      keith_life  = keith_life - 1;
  
      
  
    }

    

    if(keith_life === 0)
    {
      player.body.destroy();
      gameState = 'END';
    }
   

  }
  
  
  
  }

  function shieldActivation(){
    if(keyDown('shift') && keyDown('s') && sheildActivated === false){
      time = 0;
    sheild = new Sheild(player.body.x,player.body.y);
    sheildActivated = true;
      
      
  }
  if(sheild && sheildActivated === true){
    console.log(time);
    sheild.sheildActivity();
   // sheildRecovery = false;
  }else{
    //sheildActivated = false;
    sheildRecovery = true;
    currentTime = second();
  }

if(sheildRecovery === true){
  
  time = second();
  stroke('white');
    strokeWeight(2);
    fill('red');
    textSize(22);
  text('SheildRecovering '+ time,player.body.x-600,player.body.y+340);
  if(time === 59){
    sheildActivated = false;
    sheildRecovery = false;
  }
 }
}


function playerDestruction(){
     for(var i=0;i<laserZGroup.length && laserZGroup.length>0; i++){
       if(laserZGroup[i].isTouching(player.body))
       {
          laserZGroup[i].destroy();
          keith_life  = keith_life - 3;
    
          if(keith_life <= 0)
          {
            keith_life = 0;
            player.body.destroy();
            gameState = 'END';
          }
    
       }
      }  
}

function zarkonDestruction()
{
  for(var i=0;i<laserkGroup.length && laserkGroup.length>0; i++){
    if(empror.body.isTouching(laserkGroup[i]))
    {
       laserkGroup[i].destroy();
       zarkon_life  = zarkon_life - 1;
 
       if(zarkon_life === 0)
       {
         
         empror.body.destroy();
         gameState = 'WON';
       }
 
    }
   }   


}


// function controls()
// {

//   if(touches[].player)
//   {

//   }

// }

  
  