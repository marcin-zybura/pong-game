const gulp = require('gulp');
const browserSync = require('browser-sync').create();

gulp.task('watch', ['browserSync'], () => {
  gulp.watch('./*.html', browserSync.reload);
  gulp.watch('./*.js', browserSync.reload);
});

gulp.task('browserSync', function() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
});