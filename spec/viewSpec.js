describe("View", function(){
  var view;
  var id;
  beforeEach(function(){
    view  = new View();
    setUpHTMLFixture();
    id = Math.floor(Math.random() * 9).toString();
  });
  
  describe("updateChoice", function(){
    it("updates the chosen position for player X", function(){
      view.updateChoice(id,'X');
      var element = document.getElementById(id).firstChild;
      var match = element.className.match('fa-times')
      expect(match).toBeTruthy();
    });

    it("updates the chosen position for player O", function(){
      view.updateChoice(id, 'O');
      var element = document.getElementById(id).firstChild;
      var match = element.className.match('fa-circle-o')
      expect(match).toBeTruthy();
    });
  });

  describe('resetBoard', function(){
    var element;
    beforeEach(function(){
      view.updateChoice(id,'X');
      view.resetBoard()
      element = document.getElementById(id)
    })

    it("resets font of each element on the board", function(){
      var match = element.firstChild.className.match('fa-square-o')
      expect(match).toBeTruthy();
    });

    it("resets the class of each div back to active", function(){
      var isActive = element.className.match('active')
      expect(isActive).toBeTruthy();
    });

    it("resets the onclick attribute for each element", function(){
      var match = element.getAttribute('onclick');
      expect(match).toEqual('controller.clicked(' + id + ')')
    })
  })

  describe('getCurrentBoard', function(){
    it('returns an empty board when it is empty', function(){
      var emptyBoard = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
      expect(view.getCurrentBoard()).toEqual(emptyBoard);
    })

    it('returns a board representing the current state of the game', function(){
      document.getElementById('reset').onclick()
      document.getElementById('cpu').onclick();
      document.getElementById('1').onclick()
      var numberOfMoves = view.getCurrentBoard().count("X") + view.getCurrentBoard().count("O")
      expect(numberOfMoves).toEqual(3);
    })
  })

  describe('end of game', function(){
    it('displayDraw, notifies the user of the game ending in a draw', function(){
      view.displayDraw();
      message = document.getElementById('game-over').innerHTML
      expect(message).toEqual('<h1>The Game Ended in a Draw</h1><p>Click Reset to try again!</p>')
    });

    it('displayWinner displays "X" when player is the winner', function(){
      view.displayWinner("X");
      message = document.getElementById('game-over').innerHTML
      expect(message).toEqual("<h1>This is unbelievable, You have won!</h1><p>Cheating is part of the game too... click Reset to try and win fair and square this time!</p>");
    });

    it('displayWinner displays "O" as the winner when it wins', function(){
      view.displayWinner("O");
      message = document.getElementById('game-over').innerHTML
      expect(message).toEqual('<h1>This is unbelievable, You lost!!!</h1><p>Click Reset to try again</p>');
    });

    it('displayWinner disables all the cells', function(){
      view.displayWinner("O")
      var actives = document.getElementsByClassName('active')
      expect(actives.length).toEqual(0);
    })
  })
})