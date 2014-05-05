function Controller() {
  var view = new View()
  this.clicked = function(id){
    view.updateChoice(id, "X")
    
  }

  this.resetGame = function(){
    view.resetBoard();
  }

  
}