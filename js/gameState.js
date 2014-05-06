function GameState(currentState, currentPlayer){
  this.currentState = currentState;
  this.currentPlayer = currentPlayer;
  var self = this;

  this.nextPlayer  = function(){
    if(self.currentPlayer == "X"){
      return "O";
    } else {
      return "X";
    }
  }
}