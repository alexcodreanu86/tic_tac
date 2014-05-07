describe('GameState',function(){
  var gs;
  beforeEach(function(){
    gs = new GameState(new Array(9), "X");
  })

  describe('on initialization', function(){
    it('return the state that it is initialized with', function(){
      expect(gs.board).toEqual(new Array(9));
    })

    it('has no possible moves on initialization', function(){
      expect(gs.possibleMoves).toEqual([]);
    });

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
  });

  describe('isBoardFull', function(){
    it('returns false if there are moves left', function(){
      gs.board[1] = "X"
      gs.board[2] = "O"
      expect(gs.isBoardFull()).toBe(false);
    });

    it('returns true if there aren\'t any moves left', function(){
      gs.board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"]
      expect(gs.isBoardFull()).toBe(true);
    })
  });

  describe('haveWinner', function(){
    it('returns false if there is no winner', function(){
      // expect(gs.haveWinner()).toBe(false);
    });

    it('returns "X" when it wins', function(){
      gs.board[0] = "X";
      gs.board[4] = "X";
      gs.board[8] = "X";
      expect(gs.haveWinner()).toEqual("X")
    });

    it('returns "O" when it wins', function(){
      gs.board[0] = "O";
      gs.board[3] = "O";
      gs.board[6] = "O";
      expect(gs.haveWinner()).toEqual("O");
    })
  });

  describe('score', function(){
    it("returns 1 if 'X' wins", function(){
      var gs2 = new GameState(["X", "X", "X", "O", undefined, "O", undefined, undefined, undefined], "O")
      expect(gs2.score()).toEqual(1);
    });

    it('returns -1 if "O" wins', function(){
      var gs2 = new GameState(["X", "X", "O", "X", undefined, "O", undefined, undefined, "O"], "O")
      expect(gs2.score()).toEqual(-1);
    })

    it('return 0 if nobody won', function(){
      var gs2 = new GameState(["X", "O", "X",
                               "O", "O", "X", 
                               "X", "X", "O"])
      expect(gs2.score()).toEqual(0);
    })

    it('returns a number even if the game is not over yet', function(){
      var gs2 = new GameState(["X", "O", "X", undefined, undefined, undefined, undefined, undefined, undefined], "O")
      var tg = new TreeGenerator(gs2)
      expect(typeof gs2.score()).toEqual('number')
    })

  })
});