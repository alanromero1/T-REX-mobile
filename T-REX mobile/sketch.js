var trex, treximg, treximgstop

var pizo, ground1, pizoinvis
var nube, nubeimg

var checkpointsonido, jumpsonido, diesonido, sonidotemp
sonidotemp=1

var cactus, cactusimg1, cactusimg2, cactusimg3, cactusimg4, cactusimg5, cactusimg6

var score = 0, scoreadd

var estadodeljuego = "estadoinicial"

var grupoestadoinicial, grupocactusinicial, gruponubeinicial

var gameoverimg, gameoversprite, resetimg, resetsprite

var saltando

function preload(){
  treximg=loadAnimation("trex1.png", "trex3.png", "trex4.png");
  treximgstop=loadImage("trex_collided.png");
  ground1=loadAnimation("ground2.png");
  nubeimg=loadAnimation("cloud.png");
  cactusimg1=loadImage("obstacle1.png");
  cactusimg2=loadImage("obstacle2.png");
  cactusimg3=loadImage("obstacle3.png");
  cactusimg4=loadImage("obstacle4.png");
  cactusimg5=loadImage("obstacle5.png");
  cactusimg6=loadImage("obstacle6.png");
  gameoverimg=loadImage("gameOver.png");
  resetimg=loadImage("restart.png");

  checkpointsonido=loadSound("checkPoint.mp3")
  jumpsonido=loadSound("jump.mp3")
  diesonido=loadSound("die.mp3")
}

function setup(){
  createCanvas(windowWidth, windowHeight);

  grupoestadoinicial=createGroup();
  grupocactusinicial=createGroup();
  gruponubeinicial=createGroup();

  trex=createSprite(50,height-105,10,10);
  trex.addAnimation("trexrunning", treximg);
  trex.scale=(0.7);
  trex.addImage("treximgstop", treximgstop)

  pizoinvis=createSprite(50,height-85,10,10)
  grupoestadoinicial.add(pizoinvis);
  pizoinvis.visible=false

  pizo=createSprite(50,height-95,50,5)
  grupoestadoinicial.add(pizo);
  pizo.addAnimation("ground1img", ground1);

  gameoversprite=createSprite(width/ 2,height-175);
  gameoversprite.addImage("gameoverimg", gameoverimg);
  gameoversprite.visible=false
  gameoversprite.scale=0.5

  resetsprite=createSprite(width / 2,height-225)
  resetsprite.addImage("resetimg", resetimg)
  resetsprite.visible=false
  resetsprite.scale=0.5
}

function draw(){
  background("white");
  drawSprites();

  trex.collide(pizoinvis);

  if(estadodeljuego === "estadoinicial"){
    trex.visible=false
    textSize(15)
    text("PRESIONA ESPACIO PARA INICIAR", width / 2 - 129, height-200);
    if(keyDown("space")){
      estadodeljuego = "playing"
    }
  }

  if(estadodeljuego === "playing"){
    trex.visible=true
    nubescrear();
    nubescrear2();
    pizomover();
    cactuscrear();
    scoreaddfunction();

      if(estadodeljuego === "playing" && grupocactusinicial.isTouching(trex)){
        diesonido.play();
      }
    //console.log("estado del juego plainyg ha sido aplicado")
  }


  if(grupocactusinicial.isTouching(trex)){
    estadodeljuego = "gameover"


    if(estadodeljuego === "gameover"){
      trex.velocityY=0
      trex.changeAnimation("treximgstop", treximgstop);
      resetsprite.visible=true
      gameoversprite.visible=true

        grupoestadoinicial.setVelocityXEach(0);
        grupocactusinicial.setVelocityXEach(0);
    
        grupoestadoinicial.setLifetimeEach(-1);
        grupocactusinicial.setLifetimeEach(-1);
  
        estadodeljuego = "idle"
    }
  }

  if(estadodeljuego === "idle"){
    gruponubeinicial.setVelocityXEach(0);
    if(mousePressedOver(resetsprite)){
      //console.log("If de pressedOver resetsprite funciona")
      estadodeljuego = "reseting"
    }
  }

  if(estadodeljuego === "reseting"){
    grupocactusinicial.destroyEach();
    gruponubeinicial.destroyEach();
    resetsprite.visible=false
    gameoversprite.visible=false
    score = 0
    pizo.velocityX=0
    trex.changeAnimation("trexrunning", treximg);
    estadodeljuego = "estadoinicial"
  }
}


function scoreaddfunction(){
  if(frameCount % 100 === 0){
    //console.log(frameCount);
    score = score + 100
  }
  textSize(15)
  text("SCORE = " + score, 150, height-275); 

  if(frameCount % 500 === 0){
    checkpointsonido.play();
  }
}

function cactuscrear(){
  if(score >= 100 && score <= 400){
    if(frameCount % 150 === 0){
      cactus=createSprite(600,height-115,5,5);
      cactus.scale=0.5;
      cactus.velocityX=-(2 + 2 * score / 100)
      var numerorandom=Math.round(random(1,6));

      switch(numerorandom){
      case 1: cactus.addImage(cactusimg1);
      break
      case 2: cactus.addImage(cactusimg2);
      break
      case 3: cactus.addImage (cactusimg3);
      break
      case 4: cactus.addImage(cactusimg4);
      break
      case 5: cactus.addImage(cactusimg5);
      break
      case 6: cactus.addImage(cactusimg6);
      break
      default: break
    }

    grupocactusinicial.add(cactus);

    cactus.lifetime=300

    //console.log("If de cactuscrear funciona")
  }
 }

  if(score >= 401){
    if(frameCount % 75 === 0){
      cactus=createSprite(600,height-115,5,5);
      cactus.scale=0.5;
      cactus.velocityX=-(1.5 + 2 * score / 100)
      var numerorandom=Math.round(random(1,6));

      switch(numerorandom){
      case 1: cactus.addImage(cactusimg1);
      break
      case 2: cactus.addImage(cactusimg2);
      break
      case 3: cactus.addImage(cactusimg3);
      break
      case 4: cactus.addImage(cactusimg4);
      break
      case 5: cactus.addImage(cactusimg5);
      break
      case 6: cactus.addImage(cactusimg6);
      break
      default: break
    }

    grupocactusinicial.add(cactus);

    cactus.lifetime=200
    console.log("if de que aumenta la frecuencia de cactus funciona");
  }
  }

}

function nubescrear(){
  if(frameCount % 100 === 0){
    nube=createSprite(550,120,1,1);
    nube.y=Math.round(random(height-100, height-170));
    nube.velocityX=-(4 + 2 * score / 100)
    nube.addAnimation("nube", nubeimg);
    //console.log("If de nubescrear funciona")
    //console.log("Nube velocity es = " + nube.velocityX)
    nube.depth=trex.depth
    trex.depth+=1
    nube.lifetime=300
    gruponubeinicial.add(nube);

  }
}

function nubescrear2(){
  if(frameCount % 150 === 0){
    nube2=createSprite(650, 120, 1, 1);
    nube2.y=Math.round(random(height-190, height-220));
    nube2.velocityX=-(5.5 + 2 * score / 150);
    nube2.addAnimation("nube", nubeimg)
    nube2.depth=trex.depth
    trex.depth+=1
    nube2.lifetime=300
    gruponubeinicial.add(nube2);
  }
}

function pizomover(){
  pizo.velocityX=-6
  pizo.velocityX=-(1.5 + 2 * score / 100)
  if(pizo.x < 0){
    pizo.x=pizo.width / 2
  }

  if(touches.length>0 || trex.y >= height-130 && keyDown("space")){
    trex.velocityY=-10
    touches=[];
    jumpsonido.play();
  }
  trex.velocityY+=0.5
}