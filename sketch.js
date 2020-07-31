var player,ground,r1,r2,r3,rid1,rid2,rid3;
var obstaclesgroup,coinsgroup,riddlesgroup,count,c;
var groundimg,playerimg,girl1,girl2,coinimg,obstacleimg,giftimg,backgroundimg; 
var button,box;
var choose = 0;  
var score = 0;
var PLAY = 0;  
var LEVEL2 = 3;
var END = 1; 
var END1 = 6;
var RESUME = 2; 
var RESUME1=5;
var PLAY1=4;
var gameState = PLAY; 
var gamestate=PLAY1

var ans,a;

function preload (){
 groundimg = loadImage("ground2.png");
 playerimg = loadImage("player1.png");
 girl2img = loadImage("player2.png");  
 coinimg = loadImage("coin.png"); 
 obstacleimg = loadImage("obstacle.png");
 giftimg = loadImage("gift.png"); 
 backgroundimg = loadImage("b1.jpg");   
  r1 = loadImage("riddle1.jpg")
 r2 = loadImage("riddle2.jpg") 
 r3 = loadImage("riddle3.png") 
 backgroundimg2 = loadImage("b2.png");
 p1=loadImage("o2plant.jpg"); 
} 

function setup() {
 createCanvas(800,400); 
 player = createSprite(50, 200, 50, 50); 
 player.debug = true; 

 ground = createSprite(400,390,800,30);   

 b = createSprite(400,200);
 b.visible = false;

 girl1= createSprite(200,200,50,50); 
 girl1.addImage("girl1",playerimg) 
 girl1.scale = 0.4;
 girl1.visible = false;

 girl2 = createSprite(600,200,50,50)
 girl2.addImage("girl2",girl2img) 
 girl2.scale = 0.4;
 girl2.visible = false;

 ground.addImage("image",groundimg);


 button = createButton("Submit"); 
 box = createInput()
 button.position (50,50);
 box.position (50,20)

obstaclesgroup = new Group(); 
// riddlesgroup = new Group();
coinsgroup = new Group (); 
}

function draw() { 
background(255,255,255);
    
 player.collide(ground);   

 
//console.log(frameCount)


 if (gameState === PLAY) { 
 
   ground.velocityX = -10; 

 if(choose === 0){ 
  background("yellow");  
  fill("black")
  textSize(20); 
text("Choose your character",300,50);

  girl1.visible = true ;   
  girl2.visible = true ; 

  player.visible = false; 
  ground.visible = false; 

 }  

 if(mousePressedOver(girl1)) {
   player.addImage("player",playerimg); 
   player.setCollider("rectangle",0,0,200,350);
   player.scale = 0.4; 
   choose = 1;
 } 

 if(mousePressedOver(girl2)) {
   player.addImage("player2",girl2img); 
   player.setCollider("rectangle",0,0,250,350);
   player.scale = 0.4;
   choose = 1;
 }
 
 if (choose === 1) { 
   background(backgroundimg); 

   player.visible = true;
   girl1.visible = false ;
   girl2.visible = false; 
   ground.visible = true; 

   spawnObstacles();
   //riddles();
   coins();  
 } 
  
 if(coinsgroup.isTouching(player)) {
 score = score + 5;
 coinsgroup.destroyEach();
}

 if(keyDown("space")){
   player.velocityY = -12;  
  }
  player.velocityY = player.velocityY+1;

  
  if(ground.x<0){
  ground.x = ground.width/2 
   } 
   if(frameCount===300){ 
     rid1=createSprite(400,200); 
     rid1.lifetime=300;
      rid1.addImage(r1); 
      ans='carrot'; 
      if(rid1.isTouching(player)){ 
        gameState=RESUME; 
        count = 1; 
       } 
     }

     if(frameCount=== 900){ 
       rid2=createSprite(400,200); 
       rid2.lifetime=300;
        rid2.addImage(r2); 
        ans='clock'; 
        if(rid2.isTouching(player)){ 
          gameState=RESUME; 
          count = 2; 
        } 
       }
  
       if(frameCount=== 1800){ 
         rid3=createSprite(350,200);  
         rid3.scale = 2;
         rid3.lifetime=300;
          rid3.addImage(r3); 
          ans='breath'; 
          if(rid3.isTouching(player)){ 
            gameState=RESUME; 
            count = 3; 
          } 
         }

   if (obstaclesgroup.isTouching(player)) {
     gameState = END;
   }  

 }
 else if (gameState === END) {  
   background(backgroundimg); 
   ground.velocityX = 0;   
   if(c === 1) {
     b.addImage("b2",backgroundimg2);
     b.visible = true;
   }
   player.velocityY = 0; 
   obstaclesgroup.setVelocityXEach(0);
 coinsgroup.setVelocityXEach(0);   
 fill("black")
 textSize(30);
 text("Game Over :(",50,100);
 }; 

 if(gameState === RESUME) {
   ground.velocityX = 0;  
   player.velocityY = 0; 
   obstaclesgroup.setVelocityXEach(0);
 coinsgroup.setVelocityXEach(0);    

 button.mousePressed (()=>{
 a = box.value (); 
 console.log(a); 
 }) 
 if(ans === a) {
   gameState = PLAY ;
   obstaclesgroup.destroyEach ();  
   coinsgroup.destroyEach (); 
 } 
 if(ans != a ) {
   text("Wrong, Try Again",100,50);
 }
 } 
 if(a === "carrot" && count === 1) {  
  background(backgroundimg2); 
   fill("black") ;
   textSize(25);
   text("Level 2",200,50);   
  gameState = LEVEL2
 }  
 //level2

 if(gameState === LEVEL2) { 
  player.collide(ground); 
 if(gamestate===PLAY1){
   player.visible = true; 
   ground.visible = true; 
   
   ground.velocityX= -20; 
   if(ground.x<0) {
   ground.x = ground.width/2; 
   } 
 if(keyDown("space")){
  player.velocityY = -12;  
 } 
 player.velocityY = player.velocityY+1;
 spawnObstacles();
 coins();
   if(coinsgroup.isTouching(player)) {
    score = score + 5;
    coinsgroup.destroyEach();
   } 
   if(obstaclesgroup.isTouching(player)) {
    gamestate = END1;  
    console.log(gameState);
   }
  
    if(frameCount===820){ 
      plant1=createSprite(300,200); 
      plant1.lifetime=300;

      plant1.addImage(p1); 
       
       if(plant1.isTouching(player)){ 
         gamestate=RESUME1; 
         count1 = 1; 
        } 
      }
    }
      if(gamestate===RESUME1){
        ground.velocityX = 0;  
   player.velocityY = 0; 
   obstaclesgroup.setVelocityXEach(0);
 coinsgroup.setVelocityXEach(0);  
 if(count1===1){
   textSize(25);
   fill("black");
   text("this is an oxygen plant which is very essential these days",200,20);
  
 }
      }
   if (gamestate === END1) {   
    background(backgroundimg2);
    ground.velocityX = 0;   
    player.velocityY = 0; 
    obstaclesgroup.setVelocityXEach(0);
  coinsgroup.setVelocityXEach(0);   
  fill("black")
  textSize(30);
  text("Game Over :(",50,100);

  }; 
 } 
 drawSprites();  

 fill("black") 
 textSize(25)
text("SCORE :" + score,650,30);
 
} 
function spawnObstacles(){
if(frameCount % 60 === 0) { 
 var obstacle = createSprite(800,370,50,50);
 //obstacle.x = Math.round(random (200,600)); 
 obstacle.velocityX = -10;  
 obstaclesgroup.add(obstacle); 
 obstacle.addImage("i",obstacleimg); 
 obstacle.scale = 0.3 
 obstacle.debug = true; 
 obstacle.setCollider("rectangle",0,0,100,100);
} 
} 

function coins () {
 if(frameCount % 80 === 0) {
var coin1 = createSprite(400,370,50,50); 
coin1.shapeColor = "yellow";
coin1.y = Math.round(random(250,320)); 
coin1.velocityX= -10; 
coinsgroup.add(coin1); 
coin1.addImage("k",coinimg); 
coin1.scale = 0.5;
 }
} 