describe("Controller", function(){
  var controller;
  var id;
  beforeEach(function(){
    controller = new Controller();
    setUpHTMLFixture();
    id = Math.floor(Math.random() * 9).toString();
  })

  describe("clicked", function(){

    it("disables the div that is clicked", function(){
      $('#' + id).trigger('click');
      element = document.getElementById(id);
      expect(element.className).toEqual('cell');
    });

    it("updates the clicked div with the X class", function(){
      $('#' + id).trigger('click');
      element = document.getElementById(id).firstChild;
      expect(element).toBeMatchedBy('.fa-times');
    });
  })

  describe("resetGame", function(){
    it("brings game to initial state when reset button is clicked", function(){
      $('#' + id).trigger('click');
      $('#reset').trigger('click');
      element = document.getElementById(id);
      expect(element).toBeMatchedBy('.active');
    })
  })

  
})