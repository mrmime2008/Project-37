class Game {
    constructor(){
  
    }
  
    getState(){
      var gameStateRef  = database.ref('gameState');
      gameStateRef.on("value",function(data){
         gameState = data.val();
      })
  
    }
  
    update(state){
      database.ref('/').update({
        gameState: state
      });
    }
  
    async start(){
      if(gameState === 0){
        player = new Player();
        var playerCountRef = await database.ref('playerCount').once("value");
        if(playerCountRef.exists()){
          playerCount = playerCountRef.val();
          player.getCount();
        }
        form = new Form()
        form.display();
      }
  
      player1 = createSprite(100,200);
      player2 = createSprite(300,200);
      player3 = createSprite(500,200);
      player4 = createSprite(700,200);
      players = [player1, player2, player3, player4];
    //   player1.addImage();
    //   player2.addImage();
    //   player3.addImage();
    //   player4.addImage();
    }
  
    play(){
      form.hide();
  
      Player.getPlayerInfo();
      player.getRank();
      
      if(allPlayers !== undefined){
        background(ground);
        image(track,0,-displayHeight * 4, displayWidth, displayHeight * 5);
        //var display_position = 100;
        
        //index of the array
        var index = 0;
  
        //x and y position of the cars
        var x = 165;
        var y;
  
        for(var plr in allPlayers){
          //add 1 to the index for every loop
          index = index + 1 ;
  
          //position the cars a little away from each other in x direction
          x = x + 240;
          //use data form the database to display the cars in y direction
          y = displayHeight - allPlayers[plr].distance;
          players[index-1].x = x;
          players[index-1].y = y;
  
          if (index === player.index){
            players[index - 1].shapeColor = "red";
            camera.position.x = displayWidth/2;
            camera.position.y = cars[index-1].y
          }
         
          //textSize(15);
          //text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        }
  
      }
  
      if(keyIsDown(UP_ARROW) && player.index !== null){
        player.distance +=10;
        player.update();
      }
      if(player.distance > 4200){
        gameState = 2;
        player.rank = player.rank + 1;
        Player.updateRank(player.rank);
      }
      drawSprites();
    }
    end(){
      console.log("Game Has Ended For" + player.name);
      console.log(player.rank);
      var message = createElement('h2');
      message.html("Congratulations " + player.name + "! Your Rank is " + player.rank);
      message.position(displayWidth/2 - 70, displayHeight/4);
    }
  }
  