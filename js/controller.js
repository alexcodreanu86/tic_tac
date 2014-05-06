function Controller() {
  var view = new View();
  this.player = new Player("X", false, []);
  this.cpu = new Player("O", true, []);
  var self = this;

  this.clicked = function(id){
    self.player.setMove(id);
    view.updateChoice(id, "X");
  };

  this.resetGame = function(){
    view.resetBoard();
  }; 
}

