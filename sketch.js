var PLAY = 1;
var END = 0;
var gameState = PLAY;
var jet, jetImg;
var sky, skyImg;
var enemiesjetGroup, enemiesImg;
var gameState
var missile, missileGroup, missileImg;
var GameOver,GameOverImg;
var restart,restartImg;
var score;




function preload() {
  skyImg = loadImage("sky.jpg");
  jetImg = loadImage("jet.jpg");
  enemiesjetImg = loadImage("enemiesjet.png");
  missileImg = loadImage("missile.png");
  GameOverImg = loadImage("GameOver .png");
  restartImg=loadImage("restart .png");




}

function setup() {



  sky = createSprite(250, 220, 10, 10);
  sky.addImage(skyImg);
  sky.scale = 2;



  jet = createSprite(150, 365, 5, 5);
  jet.addImage(jetImg);
  jet.scale = 0.08;

  GameOver=createSprite(200,200,10,10);
  GameOver.addImage(GameOverImg);
  GameOver.scale=1.4;

restart=createSprite(200,330,10,10);
restart.addImage(restartImg);
restart.scale=0.2;


  enemiesjetGroup = new Group();
  missileGroup = new Group();



  score = 0;
  jet.setCollider("rectangle", 0, 0, jet.width, jet.height);
  jet.debug = false;

}



function draw() {
  background("white");

  if (gameState === PLAY) {

GameOver.visible=false;
restart.visible=false;

    sky.velocityY = 6;
    if (sky.y > 300) {
      sky.y = height / 10
    }

    
    


    if (keyDown("RIGHT_ARROW")) {
      jet.x = jet.x + 10
    }
    if (keyDown("LEFT_ARROW")) {
      jet.x = jet.x - 10

    }
    if (keyDown("SPACE")) {
      createMissile();
    }

    if (missileGroup.isTouching(enemiesjetGroup)) {
      enemiesjetGroup.destroyEach();
      missileGroup.destroyEach();
      score=score+1;
     
    }

    if (enemiesjetGroup.isTouching(jet)) {
      gameState = END
      jet.velocityX = 0;
      missileGroup.destroyEach();
       
      
      
    }


    spawnEnemiesjets()

  }


  else if (gameState === END) {



GameOver.visible=true;
restart.visible=true;
    sky.velocityY = 0;

    enemiesjetGroup.destroyEach();


    enemiesjetGroup.setLifetimeEach(-1);


    enemiesjetGroup.setVelocityYEach(0);

    if (mousePressedOver(restart)) {
      reset()
    }

  }





  drawSprites();
  textSize(20);
  stroke("black");
  fill("black");
  text("JET FIGHTER",120,20);
  textSize(20);
  stroke("black");
  fill("black");
  text("Score: " + score, 15, 50);
  textSize(15);
  stroke("black")
  fill("black");
  text("instructions:Space to Shoot", 15, 70);
  textSize(15);
  stroke("black");
  fill("black");
  text("Press left & right keys to move the jet",15,90);
}


function reset() {
  gameState=PLAY;
  score=0;
}




function spawnEnemiesjets() {
  if (frameCount % 50 === 0) {

    var enemiesjet = createSprite(600, 100, 40, 10);
    enemiesjet.velocityY = (6 + 2 * score / 100);

    enemiesjet.addImage(enemiesjetImg);
    enemiesjet.x = Math.round(random(50, 300))
    enemiesjet.scale = 0.09;

    enemiesjet.lifetime = 65;
    enemiesjetGroup.add(enemiesjet);

  }
}
  function createMissile() {

    missile = createSprite(100, 100, 60, 10);
    missile.addImage(missileImg);
    missile.y = 360;
    missile.velocityY = -8;
    missile.lifetime = 100;
    missile.x = jet.x;
    missile.scale = 0.04;
    missileGroup.add(missile);
  }























