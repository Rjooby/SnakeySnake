(function() {
  if (typeof Snakey === "undefined") {
    window.Snakey = {};
  }

  var Coord = Snakey.Coord = function (i, j) {
    this.i = i;
    this.j = j;
    this.turning = false;
  };

  Coord.prototype.equals = function (coord2) {
    return (this.i == coord2.i) && (this.j == coord2.j);
  };

  Coord.prototype.plus = function (coord2) {
    return new Coord(this.i + coord2.i, this.j + coord2.j);
  };

  Coord.prototype.isOpposite = function (coord2) {
    return (this.i == (-1 * coord2.i)) && (this.j == (-1 * coord2.j));
  };

})();
