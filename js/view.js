 // class: "fa-circle-o" and "fa-times"

var TicTacView = function(){
  this.findClicked = function(element){
    return $(element).attr("id");
  }

  this.setSymbol = function(number, playerClass){
    $("#" + number + " i").removeClass("fa-square-o").addClass(playerClass);
    $("#" + number).removeClass("active")
  }

}