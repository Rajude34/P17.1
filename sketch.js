var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score
var ground
var bgimage
var PLAY =1;
var END = 0;
var gameState = PLAY


function preload(){
monkey_running =           loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png", "Monkey_10.png")
  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("stone.png");
  bgimage = loadImage("jungle.jpg")
  
}



function setup() {
monkey = createSprite(50,380,10,10)
monkey.addAnimation("monkey1",monkey_running)
monkey.scale = 0.1
bg = createSprite(0,0,400,400)
bg.scale = 1.2
bg.addImage(bgimage)
ground = createSprite(200,380,1200,10)
bg.velocityX = -5
ground.visible = false
obstacleGroup = new Group() 
FoodGroup = new Group()

  score=0;
}



function draw() {
background("white")
text(mouseX+","+mouseY,mouseX,mouseY)
  
  text("Surivival Time: "+score,250,50)
  
  if(gameState === PLAY){
    
    
     food()
spawnObstacles()
  if(keyDown("space")){

    monkey.velocityY = -5
    
}
    
  if(FoodGroup.isTouching(monkey)){
     
     score = score+2
FoodGroup.destroyEach()
  
}  
    
 switch(score){
     
   case 10: monkey.scale = 0.12 
  break
     
     case 20: monkey.scale = 0.14 
  break
     
 case 30: monkey.scale = 0.16 
  break
 
 case 40: monkey.scale = 0.18
  break
 
  default: break
  
 }
    
    
    
 monkey.velocityY = monkey.velocityY + 0.8
  
  
if (bg.x < 0){
      bg.x = bg.width/2;
    }
    
    if(obstacleGroup.isTouching(monkey)){
       monkey.scale = 0.1
      gameState =END;
       }
}
  if(gameState === END){
    ground.velocityX = 0
    obstacleGroup.setVelocityEach(0,0)
    FoodGroup.setVelocityEach(0,0)
    bg.velocityX = 0 
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
  
  }

  
  
monkey.collide(ground)
drawSprites()
fill("white")
text("Score: "+score,300,50)
}

function food(){
if (frameCount % 80 === 0) {
    var banana = createSprite(400,120,40,10);
    banana.y = Math.round(random(120,200));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    monkey.depth = monkey.depth + 1;
    
    //add each cloud to the group
    FoodGroup.add(banana);
  } 
  
}
function spawnObstacles(){
 if (frameCount % 400 === 0){
   var obstacle = createSprite(350,355,20,40);
   obstacle.velocityX = -(6 + score/100);
   
   
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.1;
    obstacle.lifetime = 300;
   
   //add each obstacle to the group
    obstacleGroup.add(obstacle);
    obstacle.addImage(obstaceImage)
 }
}