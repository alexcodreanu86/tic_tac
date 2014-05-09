describe("Controller", function(){
  var controller;
  var id;
  
  beforeEach(function(){
    controller = new Controller();
    setUpHTMLFixture();
    id = Math.floor(Math.random() * 9).toString();
  });

  describe("resetGame", function(){
    it("brings game to initial state when reset button is clicked", function(){
      document.getElementById(id).onclick();
      controller.resetGame()
      element = document.getElementById(id);
      var match = element.className.match('active')
      expect(match).toBeTruthy();
    });
  });

  describe('players', function(){
    it('has a human player', function(){
      expect(controller.player).toBe("X");
    });

    it('has a cpu player', function(){
      expect(controller.cpu).toBe("O");
    })
  });

  describe('endTheGame', function(){
    it('draw is triggered when there it is a draw and cpu has the last move', function(){
      changeElementsSymbol(['6'], "O");
      controller.playerToStart('player');
      ['4', '3', '7', '2'].forEach(function(id){
        controller.clicked(id);      
      })
      var expectedMessage = "<h1>The Game Ended in a Draw</h1><p>Click Reset to try again!</p>";
      var actualMessage = document.getElementById('game-over').innerHTML;
      expect(actualMessage).toEqual(expectedMessage);
    })

    it('draw is triggered when there it is a draw and player has the last move',function(){
      changeElementsSymbol(['6', '5', '0'], "O");
      changeElementsSymbol(['4', '3', '1'], 'X')
      document.getElementById('player').onclick();
      ['8', '2'].forEach(function(id){
        controller.clicked(id);      
      });
      var expectedMessage = "<h1>The Game Ended in a Draw</h1><p>Click Reset to try again!</p>";
      var actualMessage = document.getElementById('game-over').innerHTML;
      expect(actualMessage).toEqual(expectedMessage);
    });

    it('it triggers the view to display that O won when cpu wins', function(){
      controller.endTheGame('O');
      var expectedMessage = "<h1>This is unbelievable, You lost!!!</h1><p>Click Reset to try again</p>";
      var actualMessage = document.getElementById('game-over').innerHTML;
      expect(actualMessage).toEqual(expectedMessage);
    });
  })

  describe('playerToStart', function(){
    it('doesn\'t permit click events on the board before player choice', function(){
      document.getElementById(id).onclick()
      var element = document.getElementById(id);
      var match = element.className.match('active')
      expect(match).toBeTruthy();
    })

    it('triggers computers move when cpu is asked to start', function(){
      controller.playerToStart('cpu');
      var element = document.getElementsByClassName("fa-circle-o")[0];
      var match = element.className.match('fa-circle-o')
      expect(match).toBeTruthy();
    })
  })

  describe("clicked", function(){
    beforeEach(function(){
      controller = new Controller();
      document.getElementById('reset').onclick()
      document.getElementById('cpu').onclick()
      id = "1";
      controller.clicked(id)
    })

    it("disables the div that is clicked", function(){

      var element = document.getElementById(id);
      expect(element.className).toEqual('cell');
    });

    it("updates the clicked div with the X class", function(){
      var element = document.getElementById(id).firstChild;
      var match = element.className.match('fa-times')
      expect(match).toBeTruthy();
    });
  })
})