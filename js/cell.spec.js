// var Controller = require('./controller');
// var Board = require('./board');
var Cell = require('./cell');
// var AI = require('./ai');

describe("Cell", function() {
  var cell = new Cell(6);
  cell.initialize()

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
})


