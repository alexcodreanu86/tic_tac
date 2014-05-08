function TreeGenerator(gs){
  this.gameState = gs;
  var self = this;
  var generateMoves = function(gameSt){
    for(var i = 0; i < gameSt.board.length; i++){
      var move = gameSt.board[i];
      if (move != "X" && move != "O"){
        var nextBoard = gameSt.board.clone();
        nextBoard[i] = gameSt.currentPlayer;
        nextGameState = new GameState(nextBoard, gameSt.nextPlayer());
        gameSt.possibleMoves.push(nextGameState);
        generateMoves(nextGameState);
      };
    };
  };
  generateMoves(self.gameState);
}