function Player(symbol, isCpu, moves){
  this.symbol = symbol;
  this.isCpu = isCpu;
  this.pastMoves = moves || [];

  this.setMove = function(position){
    this.pastMoves.push(+position);
  };
}