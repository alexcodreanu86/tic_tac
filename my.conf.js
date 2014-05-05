module.exports = function(config) {
  config.set({
    basePath: '',
    autoWatch: true,
    frameworks: ['jasmine'],
    files: [
      'js/board.js',
      'test/spec/boardSpec.js'
    ],
    browsers: ['Chrome'],
    reporters: ['progress', 'coverage'],
    preprocessors: { '*.js': ['coverage'] },
    singleRun: true
  });
};
