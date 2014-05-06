module.exports = function(config) {
  config.set({
    basePath: 'js/',
    autoWatch: true,
    frameworks: ['jasmine'],
    files: [
      'board.js', 'player.js', 'gameState.js',
      '../test/spec/boardSpec.js',
      '../test/spec/playerSpec.js',
      '../test/spec/gameStateSpec.js'
    ],
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    preprocessors: { '*.js': ['coverage'] },
    singleRun: false
  });
};
