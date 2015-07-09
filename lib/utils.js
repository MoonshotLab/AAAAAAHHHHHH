var utils = {
  settings: {
    WIDTH: 800,
    HEIGHT: 400
  },
  random: function(lo, hi) {
    return Math.floor(Math.random() * (1 + hi - lo)) + lo;
  }
}
