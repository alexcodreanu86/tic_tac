describe('Player', function(){
  var pl
  beforeEach(function(){
    pl = new Player("X", false)
  })

  it('has a symbol reader', function(){
    expect(pl.symbol).toEqual("X")
  });

  it('knows if it is CPU or not', function(){
    expect(pl.isCpu).toBe(false);  
  });

  it('has no moves on creation', function(){
    expect(pl.pastMoves.length).toEqual(0);
  });

  it('updates the moves colection when a move', function(){
    pl.setMove(0);
    expect(pl.pastMoves.length).toEqual(1);
  });

  it('can be initialized with multiple moves', function(){
    var player = new Player("X", false, [1, 2, 3]);
    expect(player.pastMoves).toEqual([1, 2, 3]);
  })
})