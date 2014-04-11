var AI = function(board){
  var board = board;
  var self = this;
  var diagonals = ["top-left", "top-right"];
  
  this.move = function(possibleMoves){
    var winning = this.getWinning();
    var defending = this.getDefending();
    var possible;
    // getOther(possibleMoves)
  }

  this.getWinning = function(){
    return checkSingled("O", "empty");
  }

  this.getDefending = function(){
    return checkSingled("X", "empty");
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