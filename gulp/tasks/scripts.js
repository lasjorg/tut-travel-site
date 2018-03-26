const gulp = require('gulp'),
webpack = require('webpack');

gulp.task('scripts', function(callback) {
  webpack(require('../../webpack.config.js'), function(err, stats) {
    if(err) {
      console.log('Error message: ', err.toString());
    }
    console.log('Stats message: ', stats.toString());
    callback();
  });
});