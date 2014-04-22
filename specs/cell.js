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

  describe ("isDiagonal", function(){
    it ("returns true if it is diagonal", function(){
      var cell = new Cell(0)
      cell.initialize();
      expect(cell.isDiagonal).toBe(true);
    });

    it ("returns false if it isn't a diagonal", function(){
      var cell = new Cell(1);
      cell.initialize();
      expect(cell.isDiagonal).toBe(false);
    })

  })


  describe("cell type", function(){
    it ("returns corner type when is initialized as corner", function(){
      var cell = new Cell(0);
      cell.initialize();
      expect(cell.type).toEqual("corner");      
    });

    it ("returns edge type when is initialized as edge", function(){
      var cell = new Cell(3);
      cell.initialize();
      expect(cell.type).toEqual("edge"); 
    });

    it ("returns center type when is initialized as center", function(){
      var cell = new Cell(4);
      cell.initialize();
      expect(cell.type).toEqual("center");
    });
  });
});
