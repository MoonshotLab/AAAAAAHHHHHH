var Ahhh = function() {
  this.score = 0;
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


Ahhh.prototype.addScore = function() {
  this.score += 1;
  var $pts = document.getElementById('points-val');
  $pts.textContent = this.score;
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

  // ground
  self.ground = self.game.add.sprite(0, 380, 'obstacle');
  self.game.physics.enable(self.ground, Phaser.Physics.ARCADE);
  self.ground.width = 800;

  self.generateObstacle(self);
};


Ahhh.prototype.generateObstacle = function(context, timeout) {
  if (!timeout) timeout = 2000;

  var speed = (2000 - timeout * .9) + 50;
  var $speed = document.getElementById('speed-val');
  $speed.textContent = speed + ' px/sec';

  var obstacle = new Obstacle({
    context: context,
    speed: -1 * speed
  });

  timeout -= 20;
  if (timeout < 100) timeout = 100;

  setTimeout(function() {
    context.generateObstacle(context, timeout)
  }, timeout);
};


Ahhh.prototype.update = function(self, opts) {
  // listen to your damnded screaming
  self.player.body.velocity.y -= (meter.volume * 100);

  // do hit detections
  self.game.physics.arcade.collide(self.player, self.obstacles, self.collision);
  self.game.physics.arcade.collide(self.player, self.ground, self.collision);

  self.obstacles.children.forEach(function(obstacle) {
    obstacle.controller.checkDone();
  })
};


Ahhh.prototype.collision = function() {
  alert('YOU LOSE!')
  location.reload();
};
