(function() {
  if (typeof Snakey === "undefined") {
    window.Snakey = {};
  }

  var Snake = Snakey.Snake = function (board) {
    this.dir = "N";
    // this.turning = false;
    this.board = board;
    this.sound = new Audio("../media/crunch.wav");
    this.score = 0;
    var center = new Snakey.Coord(Math.floor(board.dim/2), Math.floor(board.dim/2));
    this.segments = [center];
    this.symbol = "S";
    this.growTurns = 0;
  };

  Snake.DIFFS = {
    "N" : new Snakey.Coord(-1,0),
    "E" : new Snakey.Coord(0,1),
    "S" : new Snakey.Coord(1,0),
    "W" : new Snakey.Coord(0,-1)
  };

  Snake.prototype.isValid = function () {
    var head = this.head();
    if (!this.board.validPosition(this.head())) {
      return false;
    }

    for (var i = 0; i < this.segments.length - 1; i++) {
      if (this.segments[i].equals(head)) {
        return false;
      }
    }
    return true;
  };

  Snake.prototype.move = function () {
    this.segments.push(this.head().plus(Snake.DIFFS[this.dir]));
    this.turning = false;

    if (this.eatApple()){
      console.log("eaten");
      this.board.apple.replace();
    }

    if (this.growTurns > 0) {
      this.growTurns -= 1;
    } else {
      this.segments.shift();
    }

    if (!this.isValid()) {
      this.segments = [];
    }
  };

  Snake.prototype.turn = function (dir) {
    if (Snake.DIFFS[this.dir].isOpposite(Snake.DIFFS[dir]) || this.turning) {
      return
    } else {
      this.turning = true;
      this.dir = dir;
    }
  };

  Snake.prototype.isOccupying = function (array) {
    var result = false;
    this.segments.forEach(function (segment) {
      if (segment.i === array[0] && segment.j === array[i]) {
        result = true;
        return result;
      }
    })
  };

  Snake.prototype.head = function () {
    return this.segments[this.segments.length - 1];
  };

  Snake.prototype.eatApple = function () {
    if (this.head().equals(this.board.apple.position)) {
      this.sound.play();
      this.growTurns += 1;
      this.score += 1;
      return true;
    } else {
      return false;
    }
  };


})();
