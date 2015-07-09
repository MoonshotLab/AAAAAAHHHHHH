var Ahhh = function() {
  return this;
};


Ahhh.prototype.init = function(opts) {
  var self = this;

  this.game = new Phaser.Game(
    800, 400, Phaser.CANVAS, 'game', {
      preload: function() {
        self.preload(self, opts);
      },
      create: function() {
        self.create(self, opts);
      },
      update: function() {
        self.update(self, opts);
      }
    });
};


Ahhh.prototype.preload = function(self, opts) {
  self.game.load.image('obstacle', '/img/obstacle.png', 20, 20);
  self.game.load.image('player', '/img/player.png', 100, 40);
};


Ahhh.prototype.create = function(self, opts) {
  self.game.physics.startSystem(Phaser.Physics.ARCADE);

  // setup player collisions
  self.player = self.game.add.sprite(100, 40, 'player');
  self.game.physics.enable(self.player, Phaser.Physics.ARCADE);
  self.player.body.collideWorldBounds = true;
  self.player.body.bounce.setTo(1, 0.2);
  self.player.body.gravity.y = 400;

  // create an obstacle container and setup hit detection
  self.obstacles = self.game.add.group();
  self.obstacles.enableBody = true;
  self.obstacles.physicsBodyType = Phaser.Physics.ARCADE;
  self.game.physics.enable(self.obstacles, Phaser.Physics.ARCADE);

  self.generateObstacle(self);
};


Ahhh.prototype.generateObstacle = function(context, timeout) {
  var obstacle = new Obstacle({
    game: context.game,
    group: context.obstacles,
    speed: -1 * ((2000 - timeout * .9) + 50)
  });

  if (!timeout) timeout = 2000;

  timeout -= 20;
  if (timeout < 100) timeout = 100;

  setTimeout(function() {
    context.generateObstacle(context, timeout)
  }, timeout);
};


Ahhh.prototype.update = function(self, opts) {
  // listen to your damnded screaming
  self.player.body.velocity.y -= (meter.volume * 100);

  // do hit detection for each group
  self.game.physics.arcade.collide(self.player, self.obstacles,
    function() {
      alert('YOU LOSE!')
      location.reload();
    });
};
