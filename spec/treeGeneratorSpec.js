describe("TreeGenerator", function(){
  gs = new GameState(["X", undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined], "O")
  tg = new TreeGenerator(gs);
  var index;
  beforeEach(function(){
    index = Math.floor(Math.random() * 9)
  });

  it('initializes with a game state', function(){
    expect(tg.gameState.board.length).toEqual(9);
  });

  it('generates gameState tree of possible moves', function(){
    expect(tg.gameState.possibleMoves.length).toEqual(8);
  })
});