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
      document.getElementById('reset').onclick();
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

  describe('playerToStart', function(){
    it('doesn\'t permit click events on the board before player choice', function(){
      document.getElementById(id).onclick()
      var element = document.getElementById(id);
      var match = element.className.match('active')
      expect(match).toBeTruthy();
    })

    it('triggers computers move when cpu is asked to start', function(){
      document.getElementById('cpu').onclick()
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
      document.getElementById(id).onclick()
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