 // class: "fa-circle-o" and "fa-times"

var TicTacView = function(){
  this.findClicked = function(element){
    return $(element).attr("id");
  }

  this.setSymbol = function(number, playerClass){
    $("#" + number + " i").removeClass("fa-square-o").addClass(playerClass);
    $("#" + number).removeClass("active")
  }

  this.endGame = function(winner){
    $(".active").removeClass("active");
    if (winner == "O"){
      $("#game-over").html("<h1>You LOST</h1>")
    } else {
      $("#game-over").html("<h1>Game Over</h1>")
    }
  }

  this.resetGame = function(){
    $(".active").removeClass("active");
    $(".cell").addClass("active");
    $(".fa-circle-o").removeClass("fa-circle-o").addClass("fa-square-o");
    $(".fa-times").removeClass("fa-times").addClass("fa-square-o");
    $("#game-over").html("");
  }

}