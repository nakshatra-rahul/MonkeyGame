
var monkey , monkey_running,monkeyCollide;
var ground,invisibleGround,groundImg;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup,bananaGroup;
var score =0;
var bananaScore =0;
var PLAY=0;
var END=1;
var gameState=PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  
  
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  
  createCanvas(600,400);
  
  obstacleGroup = new Group();
  bananaGroup = new Group();
  
  monkey = createSprite(80,230,10,10);
  monkey.scale=0.12;
  monkey.addAnimation("monkey",monkey_running);
   // monkey.addAnimation("collide",monkeyCollide);

    ground = createSprite(300,340,600,10);
 // ground.scale=1;
  
 ground.x=ground.width/2
  console.log(ground.x)
  
  score=0;
  
  ground.velocityX=-4;

  
}


function draw() {

  background("skyblue");
  if(ground.x<0){
   ground.x=ground.width/2 
    
  }
  fill("black");
  text("SURVIVAL TIME:"+score,470,20);
  text("BANANA COLLECTED:"+bananaScore,300,20);
  
  if(gameState === PLAY){
  obstacles();
    bananas();
    score=score+Math.round(getFrameRate()/60);
    
    ground.velocityX=-(4+score*1.5/100);
    
    if(keyDown("space")&&monkey.y>=235){
      monkey.velocityY=-13;
    }
    
    monkey.velocityY=monkey.velocityY+0.8
    if(ground.x<0){
      ground.x=ground.width/2;
    }
    
    if(monkey.isTouching(bananaGroup)){
      bananaScore++;
      bananaGroup.destroyEach();
    }
     if(monkey.isTouching(obstacleGroup)){
       gameState=END;
     }
  }
  
  if(gameState === END){
ground.velocityX=0;
    monkey.y=235;
    monkey.scale=0.12;
    
   // monkey.changeAnimation("collide",monkeyCollide);
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
     obstacleGroup.setLifetimeEach(-1);
    
    bananaGroup.setLifetimeEach(-1);
    fill("red");
    stroke("black");
    textSize(30);
    text("GAMEOVER",220,170);
    fill("black");
    textSize(15);
    text("Press r to play again", 240,200);
    
    if(keyDown("r")&&gameState===END){
bananaGroup.destroyEach();
      obstacleGroup.destroyEach();
      monkey.changeAnimation("monkey",monkey_running);
      score=0;
      bananaScore=0;
      gameState=PLAY;
    }
  }
  drawSprites();
  monkey.collide(ground);
}

function bananas(){
if(frameCount%80===0){
banana = createSprite(600,250,40,10);
  
  banana.y=random(120,200)
  banana.addImage("banana",bananaImage);
  banana.scale=0.1;
  banana.velocityX=-4;
  banana.lifetime=220;
  bananaGroup.add(banana);
}
}
 
function obstacles(){
if(frameCount%200===0){
obstacle = createSprite(800,320,10,40);
  obstacle.addImage("rock",obstacleImage);
  obstacle.setCollider("circle",0,0,180);
  obstacle.scale=0.13;
  obstacle.velocityX=-6;
  obstacle.lifetime=220;
  obstacleGroup.add(obstacle);
}  
  
}




