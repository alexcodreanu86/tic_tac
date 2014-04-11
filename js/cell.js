var Cell = function(number){
  this.number = number;
  this.column = null;
  this.row = null;
  this.isDiagonal = false;
  var value = "empty";

  var self = this;

  this.initialize = function(){
    setColumn();
    setRow();
    checkDiagonal();
  }

  this.getValue = function(){
    return value;
  }

  this.setValue = function(newValue){
    value = newValue;
  }

  // private
  var setColumn = function(){
    self.column = self.number % 3  + 1
  }

  var setRow = function(){
    result = self.number / 3
    if (result < 1){
      self.row = 1;
    } else if (result < 2){
      self.row = 2;
    } else if (result < 3) {
      self.row = 3;
    }
  }

  var checkDiagonal = function(){
    var sum = self.column + self.row;
    if (sum % 2 == 0){
      self.isDiagonal = true;
      setDiagonal(sum);
    }
  }

  var setDiagonal = function(sum){
    if (sum == 4 && self.column == 2){
      self.diagonal = "top-left top-right";
    } else if (sum == 4){
      self.diagonal = "top-right";
    } else {
      self.diagonal = "top-left";
    }
  }

  


}


module.exports = Cell;
