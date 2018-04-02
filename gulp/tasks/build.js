const gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
del = require('del'),
usemin = require('gulp-usemin'),
rev = require('gulp-rev'),
cssnano = require('gulp-cssnano'),
uglify = require('gulp-uglify'),
browserSync = require("browser-sync").create();

gulp.task('previewDist', function() {
  browserSync.init({
    notify: false,
    server: {
      baseDir: 'docs'
    }
  });
});

gulp.task('deleteDistFolder', ['icons'], function() {
  return del('./docs');
});

gulp.task('copyGeneralFiles', ['deleteDistFolder'], function() {
  const pathToCopy = [
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**',
  ]
  return gulp.src(pathToCopy)
    .pipe(gulp.dest('./docs'));
});

gulp.task('optimizeImages', ['deleteDistFolder'], function() {
  return gulp
    .src([
      './app/assets/images/**/*',
      '!./app/assets/images/icons',
      '!./app/assets/images/icons/**/*'
    ])
    .pipe(imagemin())
    .pipe(gulp.dest('./docs/assets/images'));
});

gulp.task('useminTrigger', ['deleteDistFolder'], function() {
  gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], function() {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [function() {return rev()}, function() {return cssnano()}],
      js: [function() {return rev()}, function() {return uglify()}]
    }))
    .pipe(gulp.dest('./docs'))
});

gulp.task('build', ['deleteDistFolder', 'copyGeneralFiles', 'optimizeImages', 'useminTrigger']);

/* imagemin settings info:

The custom plugin options does not seem to improve the compression over the defaults in my test.
The result may well vary dependent on the files being optimized.
The settings is also using an older implicit syntax, which does still work, but i just wanted to note it.
Below is some more info.

1. Tutorial settings: gulp-imagemin: Minified 51 images (saved 321 kB - 8.3%)
.pipe(imagemin({
	interlaced: true,
	progressive: true,
	multipass: true 
}))

2. Default settings: gulp-imagemin: Minified 51 images (saved 321 kB - 8.3%)
.pipe(imagemin())

3. Custom plugin options from the github page: gulp-imagemin: Minified 51 images (saved 362 kB - 9.4%)

https://github.com/sindresorhus/gulp-imagemin
Custom plugin options
…
.pipe(imagemin([
	imagemin.gifsicle({interlaced: true}),
	imagemin.jpegtran({progressive: true}),
	imagemin.optipng({optimizationLevel: 5}),
	imagemin.svgo({
		plugins: [
			{removeViewBox: true},
			{cleanupIDs: false}
		]
	})
]))
…
Note that you may come across an older, implicit syntax. In versions < 3, the same was written like this:

…
.pipe(imagemin({
	interlaced: true,
	progressive: true,
	optimizationLevel: 5,
	svgoPlugins: [{removeViewBox: true}]
}))
…

https://github.com/svg/svgo/issues/775
Plugins are running in order, and some plugins are best to run after others.
Some plugins are best to run after each other in different order or even several times.
“Multipass” do the latter. It runs plugins several times until there is no change, capped by 10 times.
*/
