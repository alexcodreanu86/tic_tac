describe('Helpers',function(){
  beforeEach(function(){
    setUpHTMLFixture();
  });

  describe('changeElementsSymbol', function(){
    it('updates the symbol of the given element with "X"', function(){
      changeElementsSymbol(['0', '1'], "X");
      ['0', '1'].forEach(function(id){
        var elemClass = document.getElementById(id).firstChild.className
        expect(elemClass.match('fa-times')).toBeTruthy();
      })
    });

    it('updates the symbol of the given element with "O"', function(){
      changeElementsSymbol(['0', '1'], "O");
      ['0', '1'].forEach(function(id){
        var elemClass = document.getElementById(id).firstChild.className
        expect(elemClass.match('fa-circle-o')).toBeTruthy();
      })
    });

    it('strips the elements of the onclick attribute', function(){
      changeElementsSymbol(['0', '1'], "X");
      ['0', '1'].forEach(function(id){
        var elemClass = document.getElementById(id).getAttribute('onclick')
        expect(elemClass).toBeFalsy();
      })
    })
  })

})