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
      $('#' + id).trigger('click');
      $('#reset').trigger('click');
      element = document.getElementById(id);
      expect(element).toBeMatchedBy('.active');
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
      $('#' + id).trigger('click');
      var element = document.getElementById(id);
      expect(element).toBeMatchedBy('.active');
    })

    it('triggers computers move when cpu is asked to start', function(){
      $('#cpu').trigger('click');
      var element = $(".fa-circle-o");
      expect(element).toBeMatchedBy(".fa-circle-o");
    })
  })

  describe("clicked", function(){
    beforeEach(function(){
      controller = new Controller();
      $('#reset').trigger('click');
      $('#cpu').trigger('click');
      if (!$('#' + id).attr('onclick')){
        id = 1;
      };
      $('#' + id).trigger('click');
    })

    it("disables the div that is clicked", function(){
      var element = document.getElementById(id);
      expect(element.className).toEqual('cell');
    });

    it("updates the clicked div with the X class", function(){
      var element = document.getElementById(id).firstChild;
      expect(element).toBeMatchedBy('.fa-times');
    });
  })
})