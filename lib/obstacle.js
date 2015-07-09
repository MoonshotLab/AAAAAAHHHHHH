var Obstacle = function(opts) {
  var y = utils.random(0, utils.settings.HEIGHT - 20);

  this.sprite = new Phaser.Sprite(opts.game, utils.settings.WIDTH, y,
    'obstacle');
  opts.group.add(this.sprite);

  this.sprite.body.velocity.x = opts.speed;

  return this;
};
