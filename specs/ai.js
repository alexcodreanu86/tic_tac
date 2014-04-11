describe ("AI", function(){
  describe("checking methods", function(){
    var board;
    var ai;
    beforeEach(function(){
      board =new Board()
      board.initialize();
      ai = new AI(board);
      board.cells[0].setValue("O");
    });

    it("findUnique returns the unique cell in a section", function(){
      board.cells[1].setValue("O")
      var row = board.getRowCells(1);
      var uniqueCell = ai.findUnique(row);

      expect(uniqueCell).toEqual(row[2]);
    })

    it("checkRowDoubles returns the unique cell in a row with two other identical cells",function(){
      board.cells[1].setValue("O");
      var winningCell = ai.checkRowDoubles(1, "O");
      expect(winningCell.number).toEqual(2);
    });

    it("checRowDoubles returns false if it doesn't find a match", function(){
      var result = ai.checkRowDoubles(3, "O");
      expect(result).toBe(false);
    })  

    it("checkColDoubles returns the unique cell in a collumn with two other identical cells", function(){
      board.cells[3].setValue("O");
      var winningCell = ai.checkColDoubles(1, "O");
      expect(winningCell.number).toEqual(6);
    });

    it("checkColDoubles returns false if it doesn't find a match", function(){
      var result = ai.checkColDoubles(3, "O");
      expect(result).toBe(false);
    });

    it("checkDiagDoubles returns the unique cell in a diagonal with two other identical cells", function(){
      board.cells[4].setValue("O");
      var winningCell = ai.checkDiagDoubles("top-left", "O");
      expect(winningCell.number).toEqual(8);
    })

    it("checkDiagDoubles returns false if it doesn't find a match", function(){
      var result = ai.checkDiagDoubles("top-right", "O");
      expect(result).toBe(false);
    });
  })


  describe("checkWinning",function(){
    var board;
    var ai;

    beforeEach(function(){
      board =new Board()
      board.initialize();
      ai = new AI(board);
      board.cells[0].setValue("O");
    });

    it("returns the winning cell in case of a row", function(){
      board.cells[1].setValue("O");
      var result = ai.getWinning();
      expect(result.number).toEqual(2);
    })

    it("returns false if there is no winning cell", function(){
      var result = ai.getWinning();
      expect(result).toBe(false);
    });

    it("returns the winning cell in case of a col", function(){
      board.cells[3].setValue("O");
      var result = ai.getWinning();
      expect(result.number).toEqual(6);
    });

    it("returns the winning cell in case of a diagonal", function(){
      board.cells[4].setValue("O");
      var result = ai.getWinning();
      expect(result.number).toEqual(8);
    });

    it("returns the defending cell in case of row", function(){
      board.cells[0].setValue("X");
      board.cells[1].setValue("X");
      var result = ai.getDefending();
      expect(result.number).toEqual(2);
    })

    it("returns the defending cell in case of diag", function(){
      board.cells[0].setValue("X");
      board.cells[4].setValue("X");
      var result = ai.getDefending();
      expect(result.number).toEqual(8);
    })

    it("returns the defending cell in case of col", function(){
      board.cells[0].setValue("X");
      board.cells[3].setValue("X");
      var result = ai.getDefending();
      expect(result.number).toEqual(6);
    })

    it ("returns false when there is no defending cell", function(){
      var result = ai.getDefending();
      expect(result).toBe(false);
    });


  })

  // describe("Move", function(){

  //   it("", function(){

  //   })    
  // })



})