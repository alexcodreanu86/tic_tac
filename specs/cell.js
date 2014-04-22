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
