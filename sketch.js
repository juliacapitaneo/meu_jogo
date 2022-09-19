var rua, ReM, Mae, Ricks, MadMorty, Bichinho, end;
var ruaImg, ReMImg, MaeMImg, RicksImg, MadMortyImg, BichinhoImg, endImg;
var pontuacao = 0;
var MaeG, RicksG, MadMortyG, BichinhoG;
//Estados do jogo
var PLAY = 1;
var END = 0;
var gameState = 1;

function preload() {
  ruaImg = loadImage("rua.png");
  ReMImg = loadAnimation("ReM2.png", "ReM1.png");
  MaeMImg = loadImage("Maemorty.png");
  RicksImg = loadImage("Ricks.png");
  MadMortyImg = loadImage("Madmorty.png");
  BichinhoImg = loadImage("Biazul.png");
  endImg = loadImage("gameOver.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // Movendo plano de fundo
  end = createSprite(800, 400);
  end.addImage(endImg);
  rua = createSprite(700, 500, 10, 10);
  rua.addImage(ruaImg);
  rua.scale = 1;
  rua.velocityY = 15;

  //criar menino correndo
  ReM = createSprite(500, 600, 20, 20);
  ReM.addAnimation("Running", ReMImg);
  ReM.scale = 0.15;

  endImg.scale = 1;

  MaeG = new Group();
  RicksG = new Group();
  MadMortyG = new Group();
  BichinhoG = new Group();
}

function draw() {
  if (gameState === PLAY) {
    background(0);
    if (keyWentDown("UP_ARROW")) {
      ReM.velocityY = -10;
    }
    if (keyWentDown("DOWN_ARROW")) {
      ReM.velocityY = 10;
    }
    if (keyWentDown("RIGHT_ARROW")) {
      ReM.velocityX = 10;
    }
    if (keyWentDown("LEFT_ARROW")) {
      ReM.velocityX = -10;
    }
    end.visible = false;
    edges = createEdgeSprites();
    ReM.collide(edges);

    //código para redefinir plano de fundo
    if (rua.y > 1000) {
      rua.y = height / 2;
    }

    createMae();
    createBichinho();
    createRicks();
    createMadMorty();

    if (MaeG.isTouching(ReM)) {
      MaeG.destroyEach();
      pontuacao = pontuacao + 100;
    } else if (BichinhoG.isTouching(ReM)) {
      BichinhoG.destroyEach();
      pontuacao = pontuacao + 150;
    } else if (RicksG.isTouching(ReM)) {
      RicksG.destroyEach();
      pontuacao = pontuacao - 150;
    } else if (MadMortyG.isTouching(ReM)) {
      MadMortyG.destroyEach();
      pontuacao = pontuacao - 200;
    } else if (pontuacao < 0) {
        gameState = END;
      }
      if (gameState === END) {
        end.visible = true;
        text("Pressione a tecla 'espaço' para reiniciar o jogo!", 800, 500);
        MaeG.destroyEach();
        BichinhoG.destroyEach();
        RicksG.destroyEach();
        MadMortyG.destroyEach();

        MaeG.setVelocityYEach(0);
        BichinhoG.setVelocityYEach(0);
        RicksG.setVelocityYEach(0);
        MadMortyG.setVelocityYEach(0);

        if (keyDown("SPACE")) {
          reset();
        }
    }

    drawSprites();
    textSize(20);
    fill(255);
    text("Pontuação: " + pontuacao, 50, 30);
  }
}

function createMae() {
  if (World.frameCount % 200 == 0) {
    var Mae = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    Mae.addImage(MaeMImg);
    Mae.scale = 0.07;
    Mae.velocityY = 10;
    Mae.lifetime = 200;
    MaeG.add(Mae);
  }
}

function createBichinho() {
  if (World.frameCount % 320 == 0) {
    var Bichinho = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    Bichinho.addImage(BichinhoImg);
    Bichinho.scale = 0.09;
    Bichinho.velocityY = 10;
    Bichinho.lifetime = 200;
    BichinhoG.add(Bichinho);
  }
}

function createRicks() {
  if (World.frameCount % 410 == 0) {
    var Ricks = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    Ricks.addImage(RicksImg);
    Ricks.scale = 0.07;
    Ricks.velocityY = 7;
    Ricks.lifetime = 200;
    RicksG.add(Ricks);
  }
}

function createMadMorty() {
  if (World.frameCount % 530 == 0) {
    var MadMorty = createSprite(Math.round(random(50, width - 50), 40, 10, 10));
    MadMorty.addImage(MadMortyImg);
    MadMorty.scale = 0.07;
    MadMorty.velocityY = 7;
    MadMorty.lifetime = 200;
    MadMortyG.add(MadMorty);
  }
}
function reset() {
  pontuacao = 0;
  gameState = PLAY;
}
