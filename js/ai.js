var AI = function(board){
  var board = board;
  var self = this;
  var diagonals = ["top-left", "top-right"];
  
  this.move = function(possibleMoves){

    var winning = this.getWinning();

    var defending = this.getDefending();

    var center = checkCenter();

    var takenCenter = checkTakenCenter();

    var corners = self.checkCorners();
    
    var result = getOther(possibleMoves)
    
    if (winning){
      result = winning;
    } else if(defending){
      result = defending;
    } else if(center){
      result = center;
    } else if(takenCenter) {
      result = takenCenter;
    }else if (corners){
      result = corners;
    }

    return result;
  }

  var checkTakenCenter = function(){
    var center = board.getCell(4);
    var corners = board.getCorners();
    var result = false

    if (center.getValue() == "X" && board.numberOfTakenCorners() <= 2){
      result = getEmptyCell(corners);
    }

    return result;
  }

  this.checkCorners = function(){
    var result = false;
    var emptyCorners = board.numberOfEmptyCorners();
    var takenCorners = board.numberOfTakenCorners();

    if (emptyCorners == takenCorners){
      result = board.getEdgeWithValue("empty");
    } else if(emptyCorners == 4){
      console.log("here")
      result = getBlockindCell();
    }

    return result
  }

  var getBlockindCell = function(){
    var takenEdge = board.getEdgeWithValue("X");
    var edgeCol = board.getColCells(takenEdge.column)
    var edgeRow = board.getRowCells(takenEdge.row)
    var blockingDiagonal;
    if (takenEdge.column == 2){
      blockingDiagonal = getCellWithValue(edgeRow, "empty")
    } else {
      blockingDiagonal = getCellWithValue(edgeCol, "empty")
    }
    return blockingDiagonal
  }



  var getEmptyCell = function(section){
    var emptyCells = section.filter(function(cell){
      return (cell.getValue() == "empty")
    })

    return emptyCells[Math.floor(Math.random() * emptyCells.length)]
  }

  var checkCenter = function(){
    var center = board.getCell(4);
    var result = false  
    if (center.getValue() == "empty"){
      var result = center;
    }
    return result
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

  
  var getCellWithValue = function(section, value){
    var result; 
    
    section.forEach(function(cell){
      if (cell.getValue() == value){
        result = cell;
      }
    }) 
    return result;
  }

  var checkSingled = function(val, desiredValue){ 
    var rowCell = false;
    var colCell = false;
    var diagCell = false;

    for(i = 1; i < 4; i++){
      if(!rowCell) {
        rowCell = checkDesiredValue(desiredValue,self.checkRowDoubles(i, val, desiredValue));
      };

      if(!colCell){
        colCell = checkDesiredValue(desiredValue,self.checkColDoubles(i,val, desiredValue));
      };
    };
      
    $(diagonals).each(function(index,name){
      if (!diagCell){
        diagCell = checkDesiredValue(desiredValue, self.checkDiagDoubles(name, val, desiredValue))
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

  this.checkRowDoubles = function(rowNumber, checkValue, desiredValue){
    var row = board.getRowCells(rowNumber);
    var theCell = false;
    var numberOfCells = hasCellsWithValue(row, checkValue);
    var unique = self.findUnique(row);
    if(numberOfCells == 2 && unique){
      if(desiredValue == unique.getValue()){
        theCell = unique;
      }
    }   
    return theCell
  }

  this.checkColDoubles = function(colNumber, checkValue, desiredValue){
    var col = board.getColCells(colNumber);
    var theCell = false;
    var numberOfCells = hasCellsWithValue(col, checkValue);
    var unique = self.findUnique(col);
    if(numberOfCells == 2 && unique){
      if (desiredValue == unique.getValue()){
        theCell = unique;
      }
    };   
    return theCell;
  }

  this.checkDiagDoubles = function(diagName, checkValue, desiredValue){
    var diagonal = board.getDiagonalCells(diagName);
    var theCell = false;
    var numberOfCells = hasCellsWithValue(diagonal, checkValue);
    var unique = self.findUnique(diagonal)
    if(numberOfCells == 2 && unique){
      if(desiredValue == unique.getValue()){
        theCell = unique;
      }
    };  
    return theCell;
  };

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
  };

  var hasCellsWithValue = function(section, value){
    var count = 0;
    $(section).each(function(index, cell){
      if (cell.getValue() == value){
        count++;
      }
    })
    return count;
  };

}