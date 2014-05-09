Array.prototype.includes = function(element){
  var result = false;
  for(var i = 0; i < this.length; i++ ){
    if (this[i] == element) {
      result =  true;
    }
  }
  return result;
}

Array.prototype.clone = function(){
  var copy = []
  for(var i = 0; i < this.length; i++ ){
    copy[i] = this[i];
  }
  return copy
}

Array.prototype.count = function(element){
  var count = 0;

  for(var i = 0; i < this.length; i++){
    if(this[i] == element){
      count++;
    };
  };
  return count;
}

Array.prototype.min = function(){
  var min = this[0];
  for(var i = 0; i < this.length; i++){
    if (min > this[i]){
      min = this[i];
    }
  }
  return min;
}

Array.prototype.max = function(){
  var max = this[0];
  for(var i = 0; i < this.length; i++){
    if (max < this[i]){
      max = this[i];
    }
  }
  return max;
}

Array.prototype.equals = function(other){
  var result = this.length == other.length;
  if (result){
    for(var i = 0; i < this.length; i++){
      if(this[i] != other[i]){
        result = false;
      }
    }
  }
  return result;
}
