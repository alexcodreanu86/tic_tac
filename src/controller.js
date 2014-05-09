function Controller() {
  var view = new View();
  this.player = "X"
  this.cpu = "O"
  startGame = false;
  var currentState;
  var self = this;
  var firstMove = true;

  this.clicked = function(id){
    if(startGame){
      view.updateChoice(id, this.player);
      processClick(view.updateChoice);
    };
  };

  var processClick = function(callBack){
    if (firstMove){
      currentState = new GameState(view.getCurrentBoard(), "O");
      new TreeGenerator(currentState);
      firstMove = false;
    } else {
      updateCurrentState();
    }

    if (finish = isGameOver()){
      self.endTheGame(finish);
    }else {
      var move = currentState.bestCpuMove();
      callBack(move, self.cpu);
      updateCurrentState();
      if (finish = isGameOver()){
        self.endTheGame(finish);
      }
    }
  }

  this.endTheGame = function(result){
    if (result == 'draw'){
      view.displayDraw();
    } else {
      view.displayWinner(result);
    }
  }

  var isGameOver = function(){
    if(currentState.isBoardFull()){
      return 'draw'
    } else{
      return currentState.haveWinner()
    }
  }

  this.resetGame = function(){
    startGame = false;
    view.resetBoard();
    firstMove = true;
  };

  this.playerToStart = function(player){
    if(!startGame && player == "cpu"){
      currentState = new GameState(view.getCurrentBoard(), "O");
      var move = currentState.bestCpuMove();
      view.updateChoice(move, self.cpu);
    }
    startGame = true;
  }

  var updateCurrentState = function(){
    var state = currentState.possibleMoves.filter(function(state){
      return state.board.equals(view.getCurrentBoard());
    })[0]
    currentState = state;
  }
}