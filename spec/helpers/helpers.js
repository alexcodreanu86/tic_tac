function changeElementsSymbol(container, player){
  if (player == "X"){   
    var symbol = "fa fa-5x fa-times"
  } else {
    var symbol = "fa fa-5x fa-circle-o"
  }

  container.forEach(function(id){
    document.getElementById(id).firstChild.className = symbol;
    document.getElementById(id).removeAttribute('onclick');
  });
}
