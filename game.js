var buttonColours = ["red","blue","green","yellow"];

var gamePattern=[];

var userClickedPattern = [];

var level =0;
var started = false;

$(document).keypress(function() {
  if(!started){
    $("#level-title").text("level:" + level);
    nextSequence();
    started=true;
  }

});

function nextSequence(){
  userClickedPattern = [];
  level++;

  $("#level-title").text("level:" + level);

  var randomNumber = Math.floor(Math.random()*4);

var randomChosenColour= buttonColours[randomNumber];

gamePattern.push(randomChosenColour);


$("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
// var audio = new Audio("sounds/" + randomChosenColour +".mp3");
// audio.play();
}


$(".btn").click(function(){
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  // console.log(userClickedPattern);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
})

function playSound(name){
  var audio = new Audio("sounds/" + name +".mp3");
  audio.play();
}

function animatePress(currentColour){

  $("#" + currentColour).addClass("pressed");

  setTimeout(function(){
    $("#" + currentColour).removeClass("pressed");
  },100);
}

function checkAnswer(currentLevel){
if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
  // console.log("success");

  if(gamePattern.length === userClickedPattern.length){
    setTimeout(function (){
      nextSequence();
    },1000);
  };
} else {
  playSound("wrong");
  // $("body").toggleClass("game-over", 20);
  $("body").addClass("game-over");
  setTimeout(function(){
    $("body").removeClass("game-over");
  },200);

  $("#level-title").text("Game Over, Press Any key to Restart");
  startOver();
}
}


function startOver(){
  started = false;
  gamePattern=[];
  level=0;
}
