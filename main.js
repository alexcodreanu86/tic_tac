Array.prototype.includes = function(element){
  var result = false;
  for(var i = 0; i < this.length; i++ ){
    if (this[i] == element) {
      result =  true;
    }
  }
  return result;
}

Array.prototype.clone = function(){
  var copy = []
  for(var i = 0; i < this.length; i++ ){
    copy[i] = this[i];
  }
  return copy
}

Array.prototype.count = function(element){
  var count = 0;

  for(var i = 0; i < this.length; i++){
    if(this[i] == element){
      count++;
    };
  };
  return count;
}

Array.prototype.min = function(){
  var min = this[0];
  for(var i = 0; i < this.length; i++){
    if (min > this[i]){
      min = this[i];
    }
  }
  return min;
}

Array.prototype.max = function(){
  var max = this[0];
  for(var i = 0; i < this.length; i++){
    if (max < this[i]){
      max = this[i];
    }
  }
  return max;
}

Array.prototype.equals = function(other){
  var result = this.length == other.length;
  if (result){
    for(var i = 0; i < this.length; i++){
      if(this[i] != other[i]){
        result = false;
      }
    }
  }
  return result;
}


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
    result  = currentState.haveWinner()
    if (!result && currentState.isBoardFull()){
      result = 'draw'
    }
    return result
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

function View(){
  this.updateChoice = function(position, player){
    var element = document.getElementById(String(position));
    element.firstChild.className = "fa fa-5x " + getPlayerFavicon(player)
    disableElement(element)
  }

  this.resetBoard = function(){
    var elements = document.getElementsByClassName('cell')
    document.getElementById('game-over').innerHTML = ""
    for(var i = 0; i < elements.length; i++){
      resetElement(elements[i], i);
    };
  }

  this.getCurrentBoard = function(){
    var container = [];
    var cells = document.getElementsByClassName('cell');
    for(var i = 0; i < cells.length; i++){
      container.push(matchPlayerCell(cells[i]));
    };
    return container;
  }

  this.displayWinner = function(winner){
    if (winner == "X"){
      message = "<h1>This is unbelievable, You have won!</h1><p>Cheating is part of the game too... click Reset to try and win fair and square this time!</p>"
    } else {
      message = "<h1>This is unbelievable, You lost!!!</h1><p>Click Reset to try again</p>"
    } 
    document.getElementById('game-over').innerHTML = message;
    var elements = document.getElementsByClassName('cell')
    for(var i = 0; i < elements.length; i++){
      disableElement(elements[i]);
    }
  }

  this.displayDraw = function(){
    document.getElementById('game-over').innerHTML = "<h1>The Game Ended in a Draw</h1><p>Click Reset to try again!</p>"
  }

  var matchPlayerCell = function(cell){
    var className = cell.firstChild.className
    if(className.match('fa-times')){
      return "X";
    } else if(className.match('fa-circle-o')){
      return "O";
    }
  }

  function getPlayerFavicon(player){
    if (player == "X"){
      return 'fa-times'
    } else {
      return 'fa-circle-o'
    }
  }

  function disableElement(element){
    element.removeAttribute('onclick')
    element.className = 'cell'
  }

  function resetElement(element, index){
    element.setAttribute('onclick', "controller.clicked(" + index + ")")
    element.className = 'cell active'
    element.firstChild.className = 'fa fa-square-o fa-5x'
  }
}