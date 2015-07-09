var Obstacle = function(opts) {
  this.context = opts.context;
  var y = utils.random(0, utils.settings.HEIGHT - 20);

  this.sprite = new Phaser.Sprite(opts.context.game, utils.settings.WIDTH, y,
    'obstacle');

  opts.context.obstacles.add(this.sprite);

  this.sprite.body.velocity.x = opts.speed;
  this.sprite.controller = this;

  return this;
};


Obstacle.prototype.checkDone = function() {
  if (this.sprite.x < 0) {

    this.sprite.controller.context.addScore();
    this.sprite.destroy();
    delete this.sprite.controller;
  }
};
