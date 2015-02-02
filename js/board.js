(function() {
  if (typeof Snakey === "undefined") {
    window.Snakey = {};
  }

  var Board = Snakey.Board = function (dim, players) {
    this.dim = dim;
    this.snake = new Snakey.Snake(this, 1);
    this.apple = new Snakey.Apple(this);

    if (players == 2) {
      this.snake2 = new Snakey.Snake(this, 2);
    };

  };

  //========//

  Board.prototype.validPosition = function (coord, snake) {
    if (this.snake2) {
      if (snake === this.snake2) {
        for (var i = 0; i < this.snake.segments.length; i++) {
          if (this.snake.segments[i].equals(coord)) {
            return false;
          }
        }
      }

      if (snake === this.snake) {
        for (var i = 0; i < this.snake2.segments.length; i++) {
          if (this.snake2.segments[i].equals(coord)) {
            return false;
          }
        }
      }
    }
    return (coord.i >= 0) && (coord.i < this.dim) && (coord.j >= 0) && (coord.j < this.dim);
  };



})();
