var TicTacController = function(){
  var board = new Board();
  var view = new TicTacView;
  var ai = new AI(board);

  this.initialize = function(){
    board.initialize();
    listenToReset();
    playerTurn();
  }


  var playerTurn = function(){
    $('body').on("click",".active", function(e){
      var cellNumber = view.findClicked(this);
      view.setSymbol(cellNumber, "fa-times");
      board.getCell(cellNumber).setValue("X");
      var nextPossibleMoves = board.getCellsWithValue("empty");

      if (nextPossibleMoves.length != 0){
        aiMove = ai.move(nextPossibleMoves);
        aiMove.setValue("O")
        view.setSymbol(aiMove.number, "fa-circle-o")

        var isOver = board.checkGameOver()
        if (isOver){
          view.endGame(isOver);
        }
      } else {
        view.endGame("tie")
      }
    })    
  }

  var listenToReset = function(){
    $("#reset").on("click", function(){
      board = new Board();
      board.initialize();
      ai = new AI(board);
      view.resetGame();
    })
  }

}