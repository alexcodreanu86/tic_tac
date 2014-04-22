var AI = function(board){
  var board = board;
  var self = this;
  var diagonals = ["top-left", "top-right"];
  
  this.move = function(possibleMoves){
    if (this.getWinning()){
      return this.getWinning();

    } else if (this.getDefending()){
      return this.getDefending();

    } else if (checkCenter()){
      return checkCenter();

    } else if(checkTakenCenter()){
      return checkTakenCenter();

    } else if (checkAttack()){
      return checkAttack();

    } else if (this.checkCorners()){

      return this.checkCorners();
    }  else {

      return getElementWithMostNeighbours(possibleMoves)
    }
  }

  var checkAttack = function(){
    var cellInEmptySection = checkSingled("empty", "O");
    var result = false

    if (cellInEmptySection) {
      var emptySection = getCellEmptySection(cellInEmptySection)
      var result = getElementWithMostNeighbours(emptySection);
    }
    return result
  }

  var getElementWithMostNeighbours = function(section){
    var theCell = false;
    var count = 0;

    section.forEach(function(cell){
      var neighbours = hasOpponentNeighbours(cell);
      if (cell.getValue() == "empty" && neighbours > count) {
        theCell = cell;
        count = neighbours;
      }
    })
    return theCell
  }

  var hasOpponentNeighbours = function(cell){
    return getRowNeighbours(cell) + getColNeighbours(cell);
  }

  var getRowNeighbours = function(cell){
    var count = 0;
    if (cell.row > 1){
      topNeighbour = board.cells[cell.number - 3]
      if (topNeighbour.getValue() == "X"){
        count++
      }
    }

    if (cell.row < 3){
      bottomNeighbour = board.cells[cell.number + 3]
      if (bottomNeighbour.getValue() == "X"){
        count++
      }
    }
    return count
  }

  var getColNeighbours = function(cell){
    var count = 0;
    if (cell.column > 1){
      leftNeighbour = board.cells[cell.number - 1]
      if (leftNeighbour.getValue() == "X"){
        count++
      }
    }

    if (cell.column < 3){
      rightNeighbour = board.cells[cell.number + 1]
      if (rightNeighbour.getValue() == "X"){
        count++
      }
    }
    return count
  }

  var getCellEmptySection = function(cell){
    var cellRow = checkForDoubles(board.getRowCells(cell.row), "empty")
    var cellCol = checkForDoubles(board.getColCells(cell.column), "empty")
    var topLeftDiag;
    var topRightDiag;
    
    if (cell.isDiagonal ){
      if (cell.diagonal.indexOf("top-left") != -1){
        topLeftDiag = checkForDoubles(board.getDiagonalCells("top-left"), "empty");
      } 
      if (cell.diagonal.indexOf("top-right") != -1){
        topRightDiag = checkForDoubles(board.getDiagonalCells("top-right"), "empty");
      }
    }
    return checkAttackingSections(cellRow, cellCol, topLeftDiag, topRightDiag, cell);
  }

  var checkAttackingSections = function(cellRow, cellCol, topLeftDiag, topRightDiag, cell){
    var emptyCells = []

    if (cellRow){
      emptyCells = emptyCells.concat(board.getRowCells(cell.row))
    } 

    if (cellCol){
      emptyCells = emptyCells.concat(board.getColCells(cell.column));
    } 

    if (topLeftDiag){
      emptyCells = emptyCells.concat(board.getDiagonalCells("top-left"));
    }

    if (topRightDiag){
      emptyCells = emptyCells.concat(board.getDiagonalCells("top-right"));
    }

    return (emptyCells.length != 0 && emptyCells)
    
  }

  var checkForDoubles = function(section, doubleValue){
    var countValue = hasCellsWithValue(section, doubleValue)
    var result = false
    if (countValue == 2){
      result = true;
    };
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