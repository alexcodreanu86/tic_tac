var Cell = require('./cell')

var Board = function(){
  this.cells = [];


  var self = this;
  
  this.initialize = function(){
    for (i = 0; i < 9; i++) {
      self.cells.push(new Cell(i));
    };
  };

  

}



module.exports = Board;