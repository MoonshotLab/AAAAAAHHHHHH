var Game = function() {
  return this;
};


Game.prototype.init = function(opts) {
  var self = this;

  this.interface = new Phaser.Game(
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


Game.prototype.preload = function(self, opts) {
  self.interface.load.image('obstacle', '/img/obstacle.png', 20, 20);
  self.interface.load.image('player', '/img/player.png', 100, 40);
};


Game.prototype.create = function(self, opts) {
  self.interface.physics.startSystem(Phaser.Physics.ARCADE);

  // setup player collisions
  self.player = self.interface.add.sprite(100, 40, 'player');
  self.interface.physics.enable(self.player, Phaser.Physics.ARCADE);
  self.player.body.collideWorldBounds = true;
  self.player.body.bounce.setTo(1, 0.2);
  self.player.body.gravity.y = 400;


  self.obstacles = self.interface.add.group();
  var obstacleContainerA = new Phaser.Group(self.interface, self.obstacles);
  var obstacleContainerB = new Phaser.Group(self.interface, self.obstacles);
  obstacleContainerB.x = -800;

  obstacleContainerA.enableBody = true;
  obstacleContainerA.physicsBodyType = Phaser.Physics.ARCADE;
  obstacleContainerB.enableBody = true;
  obstacleContainerB.physicsBodyType = Phaser.Physics.ARCADE;
  self.interface.physics.enable(obstacleContainerA, Phaser.Physics.ARCADE);
  self.interface.physics.enable(obstacleContainerB, Phaser.Physics.ARCADE);

  self.cursors = self.interface.input.keyboard.createCursorKeys();
};


Game.prototype.update = function(self, opts) {
  self.interface.physics.arcade.collide(self.player, self.obstacles.children[
      0],
    function(a) {
      alert('YOU LOSE!')
      location.reload();
    });
  self.interface.physics.arcade.collide(self.player, self.obstacles.children[
      1],
    function(a) {
      alert('YOU LOSE!');
      location.reload();
    });

  self.player.body.velocity.y -= (meter.volume * 100);
  self.obstacles.children.forEach(moveBackground);

  function moveBackground(background) {
    if (background.x <= -800) {
      background.x = 800;
      generateObstacles(background);
    }
    background.x -= 5;
  }

  function generateObstacles(background) {
    background.children.forEach(function(child, i) {
      child.destroy();
    });

    for (var i = 0; i < 3; i++) {
      var x = Math.floor(Math.random() * (1 + 800 - 0)) + 0;
      var y = Math.floor(Math.random() * (1 + 400 - 0)) + 0;
      var sprite = new Phaser.Sprite(self.interface, x, y, 'obstacle');
      background.add(sprite);
    }
  }
};
