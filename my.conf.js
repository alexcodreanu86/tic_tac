module.exports = function(config) {
  config.set({
    basePath: 'js/',
    autoWatch: true,
    frameworks: ['jasmine'],
    files: [
      'arrayPrototypes.js',
      'gameState.js','treeGenerator.js', 
      '../test/spec/arrayPrototypesSpec.js',
      '../test/spec/gameStateSpec.js',
      '../test/spec/treeGeneratorSpec.js'
    ],
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    preprocessors: { '*.js': ['coverage'] },
    singleRun: false
  });
};
