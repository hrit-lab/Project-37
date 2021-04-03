class Quiz {
  constructor(){}

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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
 question.hide();
    background("yellow");
    fill(0);
    textSize(35);
    text("RESULT OF THE QUIZ",200,50);
    Contestant.getPlayerInfo();
    if(allContestants !== undefined){
      var displayAnswers = 250;
      fill("orange");
      textSize(20);
      text("NOTE : Contestants who have answered correct are in green colour",130,230);
       for(var plr in allContestants){
         var correctAnswers = "2";
         if(correctAnswers === allContestants[plr].answer)
           fill("green");
           else  fill("red");
       }
       displayAnswers+= 20;
      textSize(20);
      text(allContestants[plr].name + ": " + allContestants[plr].answer,120,displayAnswers);
    }
  }

}
