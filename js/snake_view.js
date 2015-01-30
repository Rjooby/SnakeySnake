(function() {
  if (typeof Snakey === "undefined") {
    window.Snakey = {};
  }

  var View = Snakey.View = function ($el) {
    this.$el = $el;
    this.board = new Snakey.Board(60, 1);
    this.setupGrid();
    var that = this;

    $("form").submit(function(event) {
      event.preventDefault();
      var speed = $("input[type='radio'][name='difficulty']:checked").val();
      that.intervalId = window.setInterval( that.step.bind(that), speed)
      });

    $(window).on("keydown", this.handleKeyEvent.bind(this));

  };

  View.KEYS = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.prototype.handleKeyEvent = function (event) {
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    } else {

    }
  };

  View.prototype.render = function () {
    this.updateClasses([this.board.apple.position], "apple");
    this.updateClasses(this.board.snake.segments, "snake");
  };

  View.prototype.updateClasses = function (coords, className) {
    this.$p.html("Score:" + this.board.snake.score)
    this.$li.filter("." + className).removeClass();
    // this.$li.filter(".head").removeClass();

    coords.forEach(function(coord){
      var flatCoord = (coord.i * this.board.dim) + coord.j;
      this.$li.eq(flatCoord).addClass(className);
    }.bind(this));

  };

  View.prototype.setupGrid = function () {
    var html = "";
    for (var i = 0; i <this.board.dim; i++){
      html += "<ul class='group'>";
      for (var j = 0; j < this.board.dim; j++) {
        html += "<li></li>";
      }
      html+= "</ul>";
    }
    this.$el.html(html);

    this.$li = this.$el.find("li");
    this.$p = $("body").find("p");
    this.$easybutton = $("body").find("button.easy");
    this.$medbutton = $("body").find("button.medium");
    this.$hardbutton = $("body").find("button.difficult");
    this.$extremebutton = $("body").find("button.extreme");

  };

  View.prototype.step = function () {
    if (this.board.snake.segments.length > 0) {
      this.board.snake.move();
      this.render();
    } else {
      alert("You lose! Your score:" + this.board.snake.score);
      var that = this;
      window.clearInterval(this.intervalId);
      window.location.reload(false);
    }
  };

})();
