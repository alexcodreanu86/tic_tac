function View(){
  this.updateChoice = function(position, player){
    var element = document.getElementById(position);
    disableElement(element)
    element.firstChild.className = "fa fa-5x " + getPlayerFavicon(player)
  }

  this.resetBoard = function(){
    var elements = document.getElementsByClassName('cell')
    for(var i = 0; i < elements.length; i++){
      resetElement(elements[i], i);
    };
  }

  function getPlayerFavicon(player){
    if (player == "X"){
      return 'fa-times'
    } else {
      return 'fa-circle-o'
    }
  }

  function disableElement(element){
    element.removeAttribute('onclick')
    element.className = 'cell'
  }

  function resetElement(element, index){
    element.setAttribute('onclick', "controller.clicked(" + index + ")")
    element.className = 'cell active'
    element.firstChild.className = 'fa fa-square-o fa-5x'
  }
}