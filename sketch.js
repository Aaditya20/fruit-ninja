var knife,apple,mango,orange,banana,alien,gameOver;
var knife1,apple1,mango1,orange1,banana1,alien1,gameOver1;
var knifeGroup,appleGroup,mangoGroup,orangeGroup,bananaGroup,alienGroup;

var score = 0;

var start,startI

var cps ,fruitS



var retry,retryI,retry2,retry2I

//Game States
var START=0;
var PLAY=1;
var OVER=2;
var WIN=3;
var gameState=0;




function preload(){
  
  knife1 = loadImage("knife.png");
  apple1 = loadImage("fruit1.png");
  mango1 = loadImage("fruit2.png");
  orange1 = loadImage("fruit3.png");
  banana1 = loadImage("fruit4.png");
  alien1 = loadAnimation("alien1.png","alien2.png");
  gameOver1 = loadImage("gameover.png");
  
  gameOverSound = loadSound ("gameover.mp3");
  retryI = loadImage("retry.png");
  retry2I = loadImage("retry2.png");
   cps = loadSound("checkPoint.mp3");
   fruitS = loadSound("jump.mp3")
  startI = loadImage("start.png")
  
}

function setup() {
  createCanvas(500, 400);
  
   //creating knife.
   knife=createSprite(250,300,20,20);
   knife.scale=0.7
   //knife.debug = true;
   knife.setCollider("rectangle",5,-25,48,65);
  
  //create fruit and monster Group variable here
  knifeGroup=createGroup();
  appleGroup=createGroup();
  mangoGroup=createGroup();
  orangeGroup=createGroup();
  bananaGroup=createGroup();
  alienGroup=createGroup();
  
  retry=createSprite(40,70,20,20);
  retry.addImage(retryI);
  retry.scale=0.3
  
  retry2=createSprite(50,70,20,20);
  retry2.addImage(retry2I);
  retry2.scale=0.3
  
  start= createSprite(250,100,10,10);
  start.addImage(startI);
  start.scale = 0.35;
  
}

function draw() {
  background("lightBlue");
  if(gameState===START){
    knife.addImage(knife1);
    knife.scale=0.7
    fill("red");
    textSize(17);
    text("PRESS  'SPACE' OR CLICK ON START IMAGE TO  START",10,200);
  if(keyDown("space")){
    gameState = PLAY;
  }
    if(mousePressedOver(start)){
      gameState = PLAY;
    }
    
  }
  if(gameState===PLAY){
  knife.addImage(knife1);  
  knife.scale=0.7  
  if(World.frameCount%100===0){  
  createApple();
  createMango();
  }  
  if(World.frameCount%175===0){  
  createOrange();
  createBanana();
  }  
  if(World.frameCount%250===0){  
  createAlien();
  }  
    //calling fruit and monster function & Increase score if knife touching fruit.
    if(appleGroup.isTouching(knife)){
      appleGroup.destroyEach();
      fruitS.play();
      score=score+1;
    }
    if(mangoGroup.isTouching(knife)){
      mangoGroup.destroyEach();
      fruitS.play();
      score=score+1;
    }
    if(orangeGroup.isTouching(knife)){
      orangeGroup.destroyEach();
      fruitS.play();
      score=score+1;
    }
    if(bananaGroup.isTouching(knife)){
      bananaGroup.destroyEach();
     fruitS.play();
      score=score+1;
    }
     // Go to end state if knife touching enemy.
    if(alienGroup.isTouching(knife)){
      alienGroup.destroyEach();
      appleGroup.destroyEach();
      mangoGroup.destroyEach();
      orangeGroup.destroyEach();
      bananaGroup.destroyEach();
      gameOverSound.play();
      gameState = OVER;
    }
    
    if(score===100){
      gameState=WIN;
      alienGroup.destroyEach();
      appleGroup.destroyEach();
      mangoGroup.destroyEach();
      orangeGroup.destroyEach();
      bananaGroup.destroyEach();
    }
    
     retry.visible = false;
    retry2.visible = false;
    
     start.visible = false;
    
    // Move knife with mouse
    knife.y=World.mouseY;
    knife.x=World.mouseX;
    
   
    }
  
    if(gameState===OVER){
      knife.addImage(gameOver1);
      knife.x = 250;
      knife.y = 200;
      knife.scale = 0.9;
      fill("green");
      textSize(20);
      text("PRESS 'R' TO RESTART",140,300);
      if(keyDown("r")){
        gameState = PLAY;
        score = 0;
         start.visible = false;
    
        
      }
      
      if (mousePressedOver(retry)){
          gameState = PLAY;
        score = 0;
        }
      
      retry.visible = true;
    retry2.visible = false;
    }
    if(gameState===WIN){
      fill("green");
      textSize(40);
      text("CONGRATULATION!",80,200);
      fill("green");
      textSize(40);
      text("YOU WIN!",180,300);
      fill("red");
      textSize(20);
      text("PRESS 'R' TO RESTART",160,350);
      if(keyDown("r")){
        gameState = PLAY;
        score = 0;
      }
      
       start.visible = false;
    
      
      if (mousePressedOver(retry2)){
          gameState = PLAY;
        score = 0;
        }
      
      retry.visible = false;
    retry2.visible = true;
    }
  
  drawSprites();
  
  //Display score
  fill("blue");
  textSize(20);
  
  text("Score : "+ score,300,50);
  
  
  retry.visible = false;
    retry2.visible = false;
  
  
  
}

function createApple(){
  
  apple = createSprite(100, 200);
  apple.addImage(apple1);
  apple.scale = 0.2;
  apple.y=Math.round(random(50,350));  
  apple.velocityX = +(3+1.5*score/10);       
  apple.lifetime = 100;
  appleGroup.add(apple);
  //apple.debug = true;  
  
}
function createMango(){
  mango = createSprite(50, 200);
  mango.addImage(mango1);
  mango.scale = 0.1;
  mango.y=Math.round(random(50,350));  
  mango.velocityX = +(3+1.5*score/10);       
  mango.lifetime = 100;
  mangoGroup.add(mango); 
  //mango.debug = true;  
}
function createOrange(){
  orange = createSprite(450, 100);
  orange.addImage(orange1);
  orange.scale = 0.2;
  orange.y=Math.round(random(50,350));  
  orange.velocityX = -(3+1.5*score/10);     
  orange.lifetime = 100;
  orangeGroup.add(orange); 
  //orange.debug = true;  
}

function createBanana(){
  banana = createSprite(450, 200);
  banana.addImage(banana1);
  banana.scale = 0.12;
  banana.y=Math.round(random(50,350));  
  banana.velocityX = -(3+1.5*score/10);  
  banana.lifetime = 100;
  bananaGroup.add(banana);  
  //banana.debug = true;  
}

function createAlien(){
  alien = createSprite(450, 200);
  alien.addAnimation("explosion",alien1);
  alien.scale = 0.7;
  alien.y=Math.round(random(50,350));
  
  alien.velocityX= -(5+3*score/20);  
  alien.lifetime = 100; 
  alienGroup.add(alien);
  //alien.debug = true;
  alien.setCollider("circle",0,0,20); 
}
