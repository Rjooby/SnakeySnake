(function() {
  if (typeof Snakey === "undefined") {
    window.Snakey = {};
  }

  var Apple = Snakey.Apple = function (board) {
    this.board = board;
    this.replace();
  };

  Apple.prototype.replace = function () {
    var x = Math.floor(Math.random() * this.board.dim);
    var y = Math.floor(Math.random() * this.board.dim);

    if (this.board.snake.isOccupying([x,y])) {
      x = Math.floor(Math.random() * this.board.dim);
      y = Math.floor(Math.random() * this.board.dim);
    }

    this.position = new Snakey.Coord(x,y);
  };



})();
