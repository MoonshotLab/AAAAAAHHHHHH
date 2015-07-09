var Obstacle = function(opts) {
  var y = utils.random(0, utils.settings.HEIGHT - 20);
  this.sprite = opts.game.add.sprite(utils.settings.WIDTH, y, 'obstacle');

  opts.game.physics.enable(this.sprite, Phaser.Physics.ARCADE);
  this.sprite.body.velocity.x = opts.speed;

  return this;
};
