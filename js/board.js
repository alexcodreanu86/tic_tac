

var Board = function(){
  this.cells = [];
  var diagonals = ["top-left", "top-right"]

  var self = this;
  
  this.initialize = function(){
    for (i = 0; i < 9; i++) {
      var cell = new Cell(i);
      cell.initialize();
      self.cells.push(cell);
    };
  };

  this.getCell = function(number){
    var cell = this.cells.filter(function(cell){
      return cell.number == number
    })
    return cell[0]
  }

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

  this.getCellsWithValue = function(requestedValue){
    var neededCells = this.cells.filter(function(cell){
      return cell.getValue() == requestedValue;
    });
    return neededCells;
  }


  this.checkGameOver = function(){
    var isOver = checkAllRows(); 
    
    if (!isOver){
      isOver = checkAllCols();
      if (!isOver){
        isOver = checkAllDiagonals();
      }
    }

    return isOver;
  }

  var checkAllRows = function(){
    isOver = false;
    for (i = 1 ; i < 4; i++){
      var row = self.getRowCells(i);
      if (row[0].getValue() == row[1].getValue() && row[0].getValue() == row[2].getValue() && row[0].getValue() != "empty"){
        isOver = row[0].getValue();
      };
    } 
    return isOver;
  }

  var checkAllCols = function(){
    isOver = false;
    for (i = 1 ; i < 4; i++){
      var col = self.getColCells(i);
      if (col[0].getValue() == col[1].getValue() && col[0].getValue() == col[2].getValue() && col[0].getValue() != "empty"){
        isOver = col[0].getValue();
      };
    } 
    return isOver;
  }

  var checkAllDiagonals = function(){
    isOver = false;
    $(diagonals).each(function(index, name){
      var diag = self.getDiagonalCells(name);
      if (diag[0].getValue() == diag[1].getValue() && diag[0].getValue() == diag[2].getValue() && diag[0].getValue() != "empty"){
        isOver = diag[0].getValue();
      };
    })
    return isOver;
  }

  this.numberOfEmptyCorners = function(){
    var corners = self.cells.filter(function(cell){
      return (cell.type == "corner" && cell.getValue() == "empty")
    })
    return corners.length
  }

  this.numberOfTakenCorners = function(){
    var corners = self.cells.filter(function(cell){
      return (cell.type == "corner" && cell.getValue() != "empty")
    })
    return corners.length
  }

  this.getCorners = function(){
    var corners = self.cells.filter(function(cell){
      return (cell.type == "corner")
    });
    return corners;
  }

  this.getEdge = function(){
    var result = false;
    var edges = self.cells.filter(function(cell){
      return (cell.type == "edge" && cell.getValue() == "empty")
    })

    if(edges[0]){
      result = edges[0];
    }

    return result
  }



}

