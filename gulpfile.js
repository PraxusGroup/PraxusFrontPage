// --------------------------------------------------------------------
// Plugins
// --------------------------------------------------------------------

var gulp        = require('gulp');
var concat      = require('gulp-concat');
var plumber     = require('gulp-plumber');
var uglify      = require('gulp-uglify');
var webserver   = require('gulp-webserver');
var sass        = require('gulp-sass');
var notify      = require('gulp-notify');
var neat        = require('node-neat').includePaths;
var path        = require('path');

// --------------------------------------------------------------------
// Error Handler
// --------------------------------------------------------------------

//the title and icon that will be used for the Grunt notifications
var notifyInfo = {
	title: 'Gulp',
	icon: path.join(__dirname, 'gulp.png')
};

var onError = {
  errorHandler: notify.onError({
		title: notifyInfo.title,
		icon: notifyInfo.icon,
		message: 'Error: <%= error.message %>'
	})
};

// --------------------------------------------------------------------
// Task: serve
// --------------------------------------------------------------------

gulp.task('serve', ['serve-watch'], function() {

  //watch .scss files
	gulp.watch('client/css/scss/*.scss', ['serve-watch']);

  return gulp.src('client')
    .pipe(webserver({
      livereload: {
        enable: true, // need this set to true to enable livereload
        filter: function(fileName) {
          if (fileName.match(/.scss$/)) { // exclude all sass
            return false;
          } else {
            return true;
          }
        }
      },
      open: false
    }));

});

gulp.task('serve-watch', function(){
  return gulp.src('client/css/scss/*.scss')
    .pipe(plumber(onError))
    .pipe(sass({
      includePaths: ['styles'].concat(neat)
    }))
    .pipe(gulp.dest('client/css'));
});
