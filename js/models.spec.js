// var Controller = require('./controller');
var Board = require('./board');
var Cell = require('./cell');
// var AI = require('./ai');

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

    it ("has 9 cells in it", function(){
      expect(board.cells.length).toEqual(9);
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
    })

    it("returns 3 cells when it requests a column", function(){
      expect(column.length).toEqual(3);
    })

    it("returns 3 cells from a given diagonal", function(){
      var diagonalName = ["top-left", "top-right"][Math.floor(Math.random(2))]
      var diagonal = board.getDiagonalCells(diagonalName)
      expect(diagonal.length).toEqual(3);
    })

    it("returns cells from a given diagonal", function(){
      var diagonalName = ["top-left", "top-right"][Math.floor(Math.random(2))]
      var diagonalCellName = board.getDiagonalCells(diagonalName)[index].diagonal
      expect(diagonalCellName.indexOf(diagonalName)).not.toEqual(-1);
    })
  })


  







})


