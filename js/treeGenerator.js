function TreeGenerator(gs){
  this.gameState = gs;
  var self = this;
  var generateMoves = function(gameState){
    for(var i = 0; i < gameState.board.length; i ++){
      var move = gameState.board[i];
      if (move != "X" && move != "O"){
        var nextBoard = gameState.board.clone();
        nextBoard[i] = gameState.currentPlayer;
        nextGameState = new GameState(nextBoard, gameState.nextPlayer());
        gameState.possibleMoves.push(nextGameState);
        generateMoves(nextGameState);
      };
    };
  };
  generateMoves(self.gameState);
}