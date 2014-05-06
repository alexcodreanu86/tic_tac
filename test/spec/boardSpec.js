describe("Board", function(){
  var board;
  beforeEach(function(){
    board = new Board;
  });

  it('has 9 available moves on initialization', function(){
    expect(board.availableMoves.length).toEqual(9);
  });

  it('has an empty state on initialization', function(){
    expect(board.currentState).toEqual([]);
  });

  it('updateMoves is updating current available moves', function(){
    plMoves = [1, 2];
    cpuMoves = [0, 6];
    board.updateMoves(plMoves, cpuMoves);
    expect(board.availableMoves).toEqual([3, 4, 5, 7, 8]);
  });

  it('newMove updates current available moves', function(){
    board.newMove(2, "X");
    expect(board.availableMoves).toEqual([0, 1, 3, 4, 5, 6, 7, 8]);
  });

  it('newMove updates current state', function(){
    board.newMove(1, "X");
    expect(board.currentState).toEqual([undefined, "X"])
  })
});