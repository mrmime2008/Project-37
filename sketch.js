var player1, player2, player3, player4, database;
var position;
var game, form, player;
var players;
var allPlayers;
var gameState = 0;
var distance = 0;
var playerCount;

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight - 30);
  database = firebase.database();
  game = new Game;
  game.getState();
  game.start();  
}

function draw(){
  background("lightgray");
    
  if(playerCount === 4){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
  drawSprites();
}

