describe("Board", function(){
  var board;
  beforeEach(function(){
    board = new Board;
  });

  it('has 9 available moves on initialization', function(){
    expect(board.availableMoves.length).toEqual(9)
  })
});