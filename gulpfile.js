var gulp = require('gulp')
  , browserify = require('gulp-browserify')
  , uglify = require('gulp-uglify')
  , concat = require('gulp-concat')

var paths = {
  scripts: ['./client/src/js/**/*.js'],
  css: ['./client/src/css/**/*.css']
}


gulp.task('scripts', function() {
    // Single entry point to browserify
    gulp.src('./client/src/js/app.js')
        .pipe(browserify({
          insertGlobals : true,
          // shim: {
          //   jQuery: {
          //       path: './client/src/js/vendor/jquery-2.1.0.min.js',
          //       exports: 'jQuery'
          //   },
          //   backbone: {
          //       path: './client/src/js/vendor/backbone-1.1.2.js',
          //       exports: 'backbone'
          //   },
          //   underscore: {
          //       path: './client/src/js/vendor/underscore-1.6.0.min.js',
          //       exports: 'underscore'
          //   }
          // }
          // debug : !gulp.env.production
        }))
        // .pipe(uglify())
        // TODO a consolidated build directory would probably be better
        .pipe(gulp.dest('./client/js'))
})

gulp.task('css', function() {
    // Single entry point to browserify
    gulp.src(paths.css)
        // .pipe(uglify())
        // TODO a consolidated build directory would probably be better
        .pipe(concat('app.css'))
        .pipe(gulp.dest('./client/css'))
})

gulp.task('default', function(){
  // place code for your default task here
  console.log('default task test')
})

// Rerun the task when a file changes
gulp.task('watch', function () {
  gulp.watch(paths.scripts, ['scripts']);
  gulp.watch(paths.css, ['css']);
})