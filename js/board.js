Array.prototype.includes = function(element){
  var result = false;
  this.forEach(function(arrElem){
    if (arrElem == element) {
      result =  true;
    }
  })
  return result;
}

function Board(state){
  this.availableMoves = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  var self = this
  this.currentState = state || []

  this.updateMoves = function(plMoves, cpuMoves){
    takenMoves = plMoves.concat(cpuMoves);
    this.availableMoves = this.availableMoves.filter(function(element){
      return !takenMoves.includes(element);
    })
  }

  this.newMove = function(move, symbol){
    var index = this.availableMoves.indexOf(move);
    this.availableMoves.splice(index, 1);
    this.currentState[move] = symbol;
  }
}