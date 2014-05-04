module.exports = function(config) {
  config.set({
    basePath: 'js/',
    autoWatch: true,
    frameworks: ['jasmine'],
    files: [
      'board.js',
      '../test/spec/*.js'
    ],
    browsers: ['Chrome'],

    reporters: ['progress', 'coverage'],
    preprocessors: { '*.js': ['coverage'] },

    singleRun: true
  });
};
