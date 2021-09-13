var score = 0;
var gameState = "play";
function preload(){
  bgImg = loadImage("bg.png");
  brickImg = loadImage("brick.png");
  collided = loadImage("collided.png");
  gameOverImg = loadImage("gameOver.png");
  groundImg = loadImage("ground2.png");
  marioImg = loadAnimation("mario00.png","mario01.png","mario03.png");
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  restartImg = loadImage("restart.png");
}

function setup(){
  createCanvas(600,400)
  
  ground = createSprite(300,370);
  ground.addImage(groundImg);
  ground.x = ground.width/2;
  
  mario = createSprite(25,320);
  mario.addAnimation("run",marioImg)
  
  brickGroup = new Group();
  obstacleGroup = new Group();
  
  gameOver = createSprite(300,180);
  gameOver.addImage(gameOverImg )
  gameOver.scale = 0.8;
  restart = createSprite(300,200);
  restart.addImage(restartImg)
  restart.scale = 0.5;
}

function draw(){
  background(bgImg);
 // background("white")
  fill("white")
  textSize(15);
  text("Score :: "+ score, 500,30)
  
  if(gameState == "play"){
    gameOver.visible = false;
    restart.visible = false;
  ground.velocityX = -2  ;
  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
//console.log(mario.y)
  if(keyDown("space") && mario.y >= 311) {
    mario.velocityY = -10;
  }
  
  mario.velocityY = mario.velocityY + 0.5;
    
 
    for (var i = 0; i < brickGroup.length; i++) {
    
      if(brickGroup.get(i).isTouching(mario)){
      brickGroup.get(i).remove()
      score =score+1;
  
      }
  }
  
  if(mario.isTouching(obstacleGroup)){
    gameState = "over";
  }
     spawnBrick();
    spawnObstacle();
  }
  else if(gameState == "over") {
    gameOver.visible = true;
    restart.visible = true;
    ground.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    brickGroup.setVelocityXEach(0);
    
    obstacleGroup.setLifetimeEach(-1);
    brickGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)){
      reset();
    }
    
  }
  mario.collide(ground)
  
 
  drawSprites();
  
}

function spawnBrick(){
  if(frameCount%70 == 0){
    brick = createSprite(600,200);
    brick.y = Math.round(random(200,220))
    brick.addImage(brickImg);
    brick.velocityX = -2;
    brick.lifetime = 300
    brickGroup.add(brick)
  }
  
}

function spawnObstacle(){
  if(frameCount%100 == 0){
    obstacle = createSprite(600,320);
    obstacle.addImage(brickImg);
    var rand = Math.round(random(1,4));
    switch(rand){
      case 1: obstacle.addImage(obstacle1);
          break;
      case 2: obstacle.addImage(obstacle2);
          break;
      case 3: obstacle.addImage(obstacle3);
          break;
      case 4: obstacle.addImage(obstacle4);
          break;
    }
    obstacle.velocityX = -2;
    obstacle.lifetime = 300;
    obstacleGroup.add(obstacle)
  }
  
}

function reset(){
  gameState = "play";
  
  gameOver.visible = false;
  restart.visible = false;
  
  obstacleGroup.destroyEach();
  brickGroup .destroyEach();
  
  
  score = 0;
}