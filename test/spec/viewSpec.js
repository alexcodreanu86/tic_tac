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
      expect(element).toBeMatchedBy('.fa-times');
    });

    it("updates the chosen position for player O", function(){
      view.updateChoice(id, 'O');
      var element = document.getElementById(id).firstChild;
      expect(element).toBeMatchedBy('.fa-circle-o');
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
      expect(element.firstChild).toBeMatchedBy('.fa-square-o');
    });

    it("resets the class of each div back to active", function(){
      expect(element).toBeMatchedBy('.active');
    });

    it("resets the onclick attribute for each element", function(){
      expect(element).toHaveAttr('onclick', 'controller.clicked(' + id + ')')
    })
  })

  describe('getCurrentBoard', function(){
    it('returns an empty board when it is empty', function(){
      var emptyBoard = [undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined]
      expect(view.getCurrentBoard()).toEqual(emptyBoard);
    })

    it('returns a board representing the current state of the game', function(){
      $('#reset').trigger('click')
      $('#cpu').trigger('click');
      $('#1').trigger('click');
      var numberOfMoves = view.getCurrentBoard().count("X") + view.getCurrentBoard().count("O")
      expect(numberOfMoves).toEqual(3);
    })
  })

  describe('end of game', function(){
    it('displayDraw, notifies the user of the game ending in a draw', function(){
      view.displayDraw();
      message = $('#game-over').html()
      expect(message).toEqual('<h1>The Game Ended in a Draw</h1><p>Click Reset to try again!</p>')
    });

    it('displayWinner displays "X" when player is the winner', function(){
      view.displayWinner("X");
      message = $('#game-over').html();
      expect(message).toEqual("<h1>This is unbelievable, You have won!</h1><p>Cheating is part of the game too... click Reset to try and win fair and square this time!</p>");
    });

    it('displayWinner displays "O" as the winner when it wins', function(){
      view.displayWinner("O");
      message = $('#game-over').html();
      expect(message).toEqual('<h1>This is unbelievable, You lost!!!</h1><p>Click Reset to try again</p>');
    });

    it('displayWinner disables all the cells', function(){
      view.displayWinner("O")
      var actives = $('.active').attr('class')
      expect(actives).toBeFalsy();
    })
  })
})