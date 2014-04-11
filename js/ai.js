var AI = function(board){
  var board = board;
  var self = this;
  var diagonals = ["top-left", "top-right"];
  
  this.move = function(possibleMoves){
    var winning = this.getWinning();
    var defending = this.getDefending();
    var possible = this.getPossible();
    var result = getOther(possibleMoves)
    
    if (winning){
      result = winning;
      console.log("winning")
    } else if(defending){
      result = defending;
      console.log("defending")
    } else if(possible){
      console.log("possible")
      result = possible;
    }

    return result;
  }

  this.getWinning = function(){
    return checkSingled("O", "empty");
  }

  var getOther = function(container){
    var index = Math.floor(Math.random() * container.length);
    return container[index]
  }

  this.getDefending = function(){
    return checkSingled("X", "empty");
  }

  this.getPossible = function(){
    var cell = checkSingled("empty", "O");
    var rowCell  = self.checkRowDoubles(cell.row, "empty")
    var colCell = self.checkColDoubles(cell.col, "empty")
    var diag1 = false;
    var diag2 = false;

    if(cell.diagonal.indexOf("top-left")){
      var diag1 = self.checkDiagDoubles("top-left", "empty");
    };

    if(cell.diagonal.indexOf("top-right")){
      var diag2 = self.checkDiagDoubles("top-right", "empty");
    };

    return checkPossible(cell, rowCell, colCell, diag1, diag2);
  }

  var checkPossible = function(cell, rowCell, collCell, diag1, diag2){
    var result = false;
    if (cell == rowCell){
      console.log("possible row")

      var row = board.getRowCells(cell.row)
      result = getCellWithValue(row,"empty");
    } else if (cell == collCell){
      console.log("possible col")

      var col = board.getColCells(cell.col)
      result = getCellWithValue(col,"empty");
    } else if (cell == diag1) {
      console.log("possible diag1")

      var diag = board.getColCells(diag1.diagonal)
      result = getCellWithValue(diag,"empty");
    } else if (cell == diag2){
      console.log("possible diag2")

      var diag = board.getColCells(diag2.diagonal)
      result = getCellWithValue(diag,"empty");
    }
    return result;
  }

  var getCellWithValue = function(section, value){
    var result;  
    if (section[0].getValue() == value){
      result = section[0].getValue();
    } else if(section[1].getValue() == value){
      result = section[1];
    } else {
      result = section[2];
    }
    return result;
  }

  var checkSingled = function(val, desiredValue){ 
    var rowCell = false;
    var colCell = false;
    var diagCell = false;

    for(i = 1; i < 4; i++){
      if(!rowCell) {
        rowCell = checkDesiredValue(desiredValue,self.checkRowDoubles(i, val));
      };

      if(!colCell){
        colCell = checkDesiredValue(desiredValue,self.checkColDoubles(i,val));
      };
    };
      
    $(diagonals).each(function(index,name){
      if (!diagCell){
        diagCell = checkDesiredValue(desiredValue, self.checkDiagDoubles(name, val))
      }
    });

    return chooseValid(rowCell, colCell, diagCell);
  }

  var checkDesiredValue = function(wantedValue, cell){
    var result = false;
    if (cell){
      cell.getValue() == wantedValue;
      result = cell
    }
    return result;
  }

  var chooseValid = function(row,col,diag){
    var choice;
    if(row){
      choice = row;
    } else if(col){
      choice = col;
    } else {
      choice = diag;
    };
    return choice;
  }

  this.checkRowDoubles = function(rowNumber, checkValue){
    var row = board.getRowCells(rowNumber);
    var theCell = false;
    var numberOfCells = hasCellsWithValue(row, checkValue);
    if(numberOfCells == 2){
      theCell = self.findUnique(row);
    }   
    return theCell
  }

  this.checkColDoubles = function(colNumber, checkValue){
    var col = board.getColCells(colNumber);
    var theCell = false;
    var numberOfCells = hasCellsWithValue(col, checkValue);
    if(numberOfCells == 2){
      theCell = self.findUnique(col);
    }   
    return theCell
  }

  this.checkDiagDoubles = function(diagName, checkValue){
    var diagonal = board.getDiagonalCells(diagName);
    var theCell = false;
    var numberOfCells = hasCellsWithValue(diagonal, checkValue);
    if(numberOfCells == 2){
      theCell = self.findUnique(diagonal);
    }  
    return theCell;
  }

  this.findUnique = function(section){
    var uniqueCell;
    if(section[0].getValue() == section[1].getValue()){
      uniqueCell = section[2];
    } else if (section[0].getValue() == section[2].getValue()){
      uniqueCell = section[1];
    } else {
      uniqueCell = section[0];
    }
    return uniqueCell;
  }

  var hasCellsWithValue = function(section, value){
    var count = 0;
    $(section).each(function(index, cell){
      if (cell.getValue() == value){
        count++;
      }
    })
    return count;
  }




}