function Controller() {
  this.clicked = function(id){
    console.log("clicked " + id)
    var element = document.getElementById(id);
    element.removeAttribute('onclick')
    element.className = 'cell'
  }
}