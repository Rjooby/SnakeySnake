(function() {
  if (typeof Snakey === "undefined") {
    window.Snakey = {};
  }

  var Board = Snakey.Board = function (dim, players) {
    this.dim = dim;
    this.snake = new Snakey.Snake(this);
    this.apple = new Snakey.Apple(this);

    if (players === 2) {
      this.snake2 = new Snakey.Snake(this);
    }

  };

  //========//

  Board.prototype.validPosition = function (coord) {
    return (coord.i >= 0) && (coord.i < this.dim) && (coord.j >= 0) && (coord.j < this.dim);
  };



})();
