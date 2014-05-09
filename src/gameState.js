var winningPossibilities = [
  [0, 1, 2],
  [3, 4, 5], 
  [6, 7, 8], 
  [0, 3, 6], 
  [1, 4, 7], 
  [2, 5, 8], 
  [0, 4, 8], 
  [2, 4, 6]
];

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
    };
  };

  this.bestCpuMove = function(){
    if (numberOfMoves() == 0){
      return randomStartingMove()
    }else {
      return generateMove();
    }
  }

  var randomStartingMove = function(){
    var options = [0, 2, 4, 6, 8]
    var index = Math.floor(Math.random() * options.length)
    return options[index]
  }

  var generateMove = function(){
    var bestScore = getNextRoundScore(0, "O")
    var nextState = self.possibleMoves[0];

    self.possibleMoves.forEach(function(gs){
      if (gs.score(0) < nextState.score(0)){
        nextState = gs;
      }
    })
    return getNextMove(nextState.board)
  }

  var getNextMove = function(board){
    var dif;
    self.board.forEach(function(elem, index){
      if( elem != board[index]){
        dif = index;
      }
    })
    return dif;
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

  this.score = function(depth){
    if (self.haveWinner() == "X"){
      return 10 - depth;
    } else if(self.haveWinner() == "O"){
      return depth -10;
    } else if(self.isBoardFull()){
      return 0;
    } else {
      return getNextRoundScore(depth + 1, self.nextPlayer());
    };
  };

  var getNextRoundScore = function(depth, player){
    var scores = self.possibleMoves.map(function(nextMove){
      return nextMove.score(depth);
    });
    if(player == "X"){
      return scores.min();
    } else {
      return scores.max();
    };
  };

  var numberOfMoves = function(){
    return self.board.count("X") +  self.board.count("O")
  }

  this.isBoardFull = function(){
    if(numberOfMoves() == 9){
      return true;
    }else{
      return false;
    };
  };
};