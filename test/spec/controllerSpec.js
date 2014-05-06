describe("Controller", function(){
  var controller;
  var id;
  
  beforeEach(function(){
    controller = new Controller();
    setUpHTMLFixture();
    id = Math.floor(Math.random() * 9).toString();
  })

  describe("resetGame", function(){
    it("brings game to initial state when reset button is clicked", function(){
      $('#' + id).trigger('click');
      $('#reset').trigger('click');
      element = document.getElementById(id);
      expect(element).toBeMatchedBy('.active');
    })
  })

  describe('players', function(){
    it('has a human player', function(){
      expect(controller.player.isCpu).toBe(false);
      expect(controller.player.symbol).toBe("X");
    });

    it('has a cpu player', function(){
      expect(controller.cpu.isCpu).toBe(true);
      expect(controller.cpu.symbol).toBe("O");
    })
  });

  describe("clicked", function(){
    beforeEach(function(){
      controller = new Controller();
      $('#reset').trigger('click');
      $('#' + id).trigger('click');
    })

    afterEach(function() {
      controller.player.pastMoves = [];
    });


    it("disables the div that is clicked", function(){
      element = document.getElementById(id);
      expect(element.className).toEqual('cell');
    });

    it("updates the clicked div with the X class", function(){
      element = document.getElementById(id).firstChild;
      expect(element).toBeMatchedBy('.fa-times');
    });

    it("updates the player's moves container", function(){
      controller.clicked(id);
      expect(controller.player.pastMoves).toEqual([+id])
    })
  })
  
})