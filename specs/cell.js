describe("Cell", function() {
  var cell;

  beforeEach(function(){
    cell = new Cell(6);
    cell2 = new Cell(8)
    cell3 = new Cell(4);

    cell.initialize()
    cell2.initialize();
    cell3.initialize();
  })

  it ("knows what number it has", function() {
    expect(cell.number).toEqual(6);
  });

  it ("knows what column it is in", function() {
    expect(cell.column).toEqual(1);
    expect(cell2.column).toEqual(3);
  });

  it ("knows what row it is part of", function(){
    expect(cell3.row).toEqual(2);
    expect(cell.row).toEqual(3);
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
      expect(cell.isDiagonal).toBe(true);
    });
    
    it ("knows what diagonal it is part of", function(){
      expect(cell.diagonal).toEqual("top-right");
      expect(cell2.diagonal).toEqual("top-left");
      expect(cell3.diagonal).toEqual("top-left top-right");
    });

    it ("returns false if it isn't a diagonal", function(){
      var cell = new Cell(1);
      cell.initialize();
      expect(cell.isDiagonal).toBe(false);
    });
  })


  describe("cell type", function(){
    it ("returns corner type when is initialized as corner", function(){
      expect(cell.type).toEqual("corner");      
    });

    it ("returns edge type when is initialized as edge", function(){
      var cell = new Cell(3);
      cell.initialize();
      expect(cell.type).toEqual("edge"); 
    });

    it ("returns center type when is initialized as center", function(){
      expect(cell3.type).toEqual("center");
    });
  });
});
