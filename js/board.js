var Cell = require('./cell')

var Board = function(){
  this.cells = [];


  var self = this;
  
  this.initialize = function(){
    for (i = 0; i < 9; i++) {
      var cell = new Cell(i);
      cell.initialize();
      self.cells.push(cell);
    };
  };

  this.getRowCells = function(rowNumber){
    var row = this.cells.filter(function(cell){
      return (cell.row == rowNumber)
    });
    return row;
  }

  this.getColCells = function(colNumber){
    var column = this.cells.filter(function(cell){
      return(cell.column == colNumber);
    });
    return column;
  }

  this.getDiagonalCells = function(diagName){
    var diagonal = this.cells.filter(function(cell){
      var match;
      if (cell.isDiagonal){ 
        match = cell.diagonal.indexOf(diagName);
      };
      return (match != -1 && cell.isDiagonal);
    });
    return diagonal;  
  }

}



module.exports = Board;