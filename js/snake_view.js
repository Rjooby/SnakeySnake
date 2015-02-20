(function() {
  if (typeof Snakey === "undefined") {
    window.Snakey = {};
  }

  var View = Snakey.View = function ($el) {
    this.$el = $el;
    var that = this;
    this.setupGrid();

    $("form").submit(function(event) {
      event.preventDefault();
      that.players = $("input[type='checkbox'][name='playercount']:checked").val() || 1;
      var speed = $("input[type='radio'][name='difficulty']:checked").val();
      console.log(that.players);
      that.board = new Snakey.Board(60, that.players);
      that.intervalId = window.setInterval( that.step.bind(that), speed)
      });

    $(window).on("keydown", this.handleKeyEvent.bind(this));

  };

  View.KEYS2 = {
    38: "N",
    39: "E",
    40: "S",
    37: "W"
  };

  View.KEYS = {
    87: "N",
    68: "E",
    83: "S",
    65: "W"
  }

  View.prototype.handleKeyEvent = function (event) {
    event.preventDefault();
    if (View.KEYS[event.keyCode]) {
      this.board.snake.turn(View.KEYS[event.keyCode]);
    } else {

    }
    if(this.board.snake2){
      if (View.KEYS2[event.keyCode]) {
        this.board.snake2.turn(View.KEYS2[event.keyCode]);
      }
    }
  };

  View.prototype.render = function () {
    this.updateClasses([this.board.apple.position], "apple");
    this.updateClasses(this.board.snake.segments, "snake");
    if (this.board.snake2) {
      this.updateClasses(this.board.snake2.segments, "snake2");
    }
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
    for (var i = 0; i <60; i++){
      html += "<ul class='group'>";
      for (var j = 0; j < 60; j++) {
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

    if (this.board.snake2) {

      if (this.board.snake.segments.length > 0 && this.board.snake2.segments.length > 0) {
        this.board.snake.move();
        this.board.snake2.move();
        this.render();
      } else if (this.board.snake2.segments.length === 0 && this.board.snake.segments.length === 0) {
        alert ("You both lose");
        window.clearInterval(this.intervalId);
        window.location.reload(false);
      } else if (this.board.snake2.segments.length === 0) {
        alert ("Player 2 loses");
          window.clearInterval(this.intervalId);
          window.location.reload(false);
      } else if (this.board.snake.segments.length === 0) {
        alert ("Player 1 loses");
          window.clearInterval(this.intervalId);
          window.location.reload(false);
      }

    } else {
      if (this.board.snake.segments.length > 0) {
        this.board.snake.move();
        this.render();
      } else {
      alert("You lose! Your score:" + this.board.snake.score);
      var that = this;
      window.clearInterval(this.intervalId);
      window.location.reload(false);
      }
    }





    // }
  };

})();
