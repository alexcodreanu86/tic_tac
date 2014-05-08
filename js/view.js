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