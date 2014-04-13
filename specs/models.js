describe("Cell", function() {
  var cell;

  beforeEach(function(){
    cell = new Cell(6);
    cell.initialize()
  })

  it ("knows what number it has", function() {
    expect(cell.number).toEqual(6);
  });

  it ("knows what column it is in", function() {
    expect(cell.column).toEqual(1);
  });

  it ("knows what row it is part of", function(){
    expect(cell.row).toEqual(3);
  });

  it ("knows if it is in a diagonal", function(){
    expect(cell.isDiagonal).toBe(true);
  });

  it ("knows what diagonal it is part of", function(){
    expect(cell.diagonal).toEqual("top-right");
  });

  it ("has value of empty on initialization", function(){
    expect(cell.getValue()).toEqual("empty");
  });

  it ("updates value to desired value", function(){
    cell.setValue("X");
    expect(cell.getValue()).toEqual("X");
  })

})

describe("Board", function(){
  
  describe("before initializing", function(){
    var board = new Board();

    it ("has a container of cells", function() {
      expect(board.cells).toEqual(jasmine.any(Array));
    });

    it ("has no cells in the cells container", function() {
      expect(board.cells.length).toEqual(0);
    });  

  });

  describe("after initializing", function() {
    var board = new Board();
    board.initialize();

    it("has 9 cells in it", function(){
      expect(board.cells.length).toEqual(9);
    })

    it("returns a desired cell", function(){
      var cellNumber = Math.floor(Math.random() * 9);
      var cell = board.getCell(cellNumber);

      expect(cell.number).toEqual(cellNumber);
    })

    it("getEdge returns an emtpy edge when asked for one", function(){
      expect(board.getEdge().type).toEqual("edge")
      expect(board.getEdge().getValue()).toEqual("empty")
    })  

    it("getEdge returns false when no edges are available", function(){
      board.cells[1].setValue("O")
      board.cells[3].setValue("O")
      board.cells[5].setValue("O")
      board.cells[7].setValue("O")
  
      expect(board.getEdge()).toBe(false)
    }) 
    
    it("getCorners returns all corners", function(){
      var corners = board.getCorners();
      var randomNum = Math.floor(Math.random() * 4)

      expect(corners.length).toEqual(4);
      expect(corners[randomNum].type).toEqual("corner");
    }) 

  })


  describe("getting sections", function(){
    var board;
    var randSection;
    var index;

    beforeEach(function(){
      board = new Board();
      board.initialize();
      randSection = Math.floor(Math.random() * 3) + 1;
      index = Math.floor(Math.random() * 3);
      row = board.getRowCells(randSection);
      column = board.getRowCells(randSection);
    });


    
    it ("returns the cells of a row", function(){
      expect(row[index].row ==  randSection);
    });

    it("returns 3 cells when it requests a row", function(){
      expect(row.length).toEqual(3);
    });

    it ("returns cells from a given column", function(){
      expect(column[index].column == randSection);
    });

    it("returns 3 cells when it requests a column", function(){
      expect(column.length).toEqual(3);
    });

    it("returns 3 cells from a given diagonal", function(){
      var diagonalName = ["top-left", "top-right"][Math.floor(Math.random(2))];
      var diagonal = board.getDiagonalCells(diagonalName);
      expect(diagonal.length).toEqual(3);
    });

    it("returns cells from a given diagonal", function(){
      var diagonalName = ["top-left", "top-right"][Math.floor(Math.random(2))];
      var diagonalCellName = board.getDiagonalCells(diagonalName)[index].diagonal;
      expect(diagonalCellName.indexOf(diagonalName)).not.toEqual(-1);
    });
  });

  describe("numberOfCorners", function(){
    var board;
    beforeEach(function(){
      board = new Board();
      board.initialize();
      board.cells[0].setValue("X")
      board.cells[4].setValue("O")
      board.cells[8].setValue("X")
    })

    it("returns the proper number of empty corners", function(){
      expect(board.numberOfEmptyCorners()).toEqual(2);
    })

    it("returns the proper number of taken corners", function(){
      expect(board.numberOfTakenCorners()).toEqual(2);
    })

  })

  describe("getCellsWithValue", function(){
    var board = new Board();
    board.initialize();

    it("returns all empty cells", function(){
      emptyCells = board.getCellsWithValue("empty")
      playerCells = board.getCellsWithValue("X")
      expect(emptyCells.length).toEqual(9);
      expect(playerCells.length).toEqual(0);
    });
  })


  describe("checkGameOver", function(){
    var board;
    beforeEach(function(){
      board = new Board();
      board.initialize();
      board.cells[0].setValue("O");
    })

    it("returns false when there is no winner", function(){
      expect(board.checkGameOver()).toBe(false);
    })

    it("returns winner when a row is filled out", function(){
      board.cells[0].setValue("X");
      board.cells[1].setValue("X");
      board.cells[2].setValue("X");
      var winner = board.checkGameOver();

      expect(winner).toEqual("X");
    })

    it("returns winner when a col is filled out", function(){
      board.cells[3].setValue("O");
      board.cells[6].setValue("O");
      var winner = board.checkGameOver();

      expect(winner).toEqual("O");
    })

    it("returns winner when a diagonal is filled out", function(){
      board.cells[4].setValue("O");
      board.cells[8].setValue("O");
      var winner = board.checkGameOver();

      expect(winner).toEqual("O");
    })


  })

  







})


