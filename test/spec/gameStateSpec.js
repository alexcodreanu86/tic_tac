describe('GameState',function(){
  var gs;
  beforeEach(function(){
    gs = new GameState([1,2,3,4,5,6,7,8,9], "X");
  })

  it('return the state that it is initialized with', function(){
    expect(gs.currentState).toEqual([1,2,3,4,5,6,7,8,9]);
  })

  it('has a current player', function(){
    expect(gs.currentPlayer).toBe("X");
  });

  it('nextPlayer returns "O" in case current player is "X"', function(){
    expect(gs.nextPlayer()).toBe("O");
  });

  it('nextPlayer returns "X" in case current player is "O"', function(){
    gs.currentPlayer = "O";
    expect(gs.nextPlayer()).toBe("X");
  });
})