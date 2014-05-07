var winningPossibilities = [
  [0, 1, 2],
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]
]

function GameState(board, currentPlayer){
  this.board = board;
  this.currentPlayer = currentPlayer;
  this.possibleMoves = [];

  var self = this;

  this.nextPlayer  = function(){
    if(self.currentPlayer == "X"){
      return "O";
    } else {
      return "X";
    }
  }

  this.haveWinner = function(){
    var winner = false;
    winningPossibilities.forEach(function(combination){
      var elem1 = combination[0];
      var elem2 = combination[1];
      var elem3 = combination[2];
      if( self.board[elem1] == self.board[elem2] && self.board[elem2] == self.board[elem3] && self.board[elem1] != undefined){
        winner = self.board[elem1];
      };
    });
    return winner;
  }

  this.score = function(){
    if (self.haveWinner() == "X"){
      return 1;
    } else if(self.haveWinner() == "O"){
      return -1;
    } else if(self.isBoardFull()){
      return 0;
    } else {
      return getNextRoundScore();
    }
  };

  var getNextRoundScore = function(){
    var scores = self.possibleMoves.map(function(nextMove){
      return nextMove.score();
    })

    if(self.currentPlayer == "X"){
      return scores.max();
    } else {
      return scores.min();
    }
  }

  this.isBoardFull = function(){
    if(self.board.count("X") +  self.board.count("O") == 9){
      return true;
    }else{
      return false;
    }
  }
}