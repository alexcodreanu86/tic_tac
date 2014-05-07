module.exports = function(config) {
  config.set({
    basePath: 'js/',
    autoWatch: true,
    frameworks: ['jasmine'],
    files: [
      'arrayPrototypes.js',
      'board.js', 'player.js', 'gameState.js','treeGenerator.js', 
      '../test/spec/arrayPrototypesSpec.js',
      '../test/spec/boardSpec.js',
      '../test/spec/playerSpec.js',
      '../test/spec/gameStateSpec.js',
      '../test/spec/treeGeneratorSpec.js'
    ],
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    preprocessors: { '*.js': ['coverage'] },
    singleRun: false
  });
};
