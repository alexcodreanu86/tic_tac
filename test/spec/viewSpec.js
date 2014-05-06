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
})