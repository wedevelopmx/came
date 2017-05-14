var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    git = require('gulp-git'),
    run = require('gulp-run'),
    clean = require('gulp-clean'),
    sass = require('gulp-sass');

// build resources
gulp.task('default', ['webpack'], function() {
  return gutil.log('Running webpack!');
});

// Getting project ready
gulp.task('init', ['vendor'], function() {
  return gutil.log('Gulp is running!');
});

// Clean all automated files
gulp.task('full-clean', ['clean', 'clean-flatkit'], function() {
  return gulp.src('node_modules', {read: false})
      .pipe(clean());
});

// Clean dist & vendor files
gulp.task('clean', ['clean-vendor'], function() {
  return gulp.src('dist', {read: false})
      .pipe(clean());
});

// Clean vendor -> Flatkit
gulp.task('clean-vendor', function() {
  return  gutil.log('Cleaning vendor folder!') &&
          gulp.src('src/vendor', {read: false})
            .pipe(clean());
});

// Download vendor -> Flatkit
gulp.task('vendor', ['clean-vendor'], function(){
  return  gutil.log('Downloading vendor UX!') &&
          git.clone('git@bitbucket.org:wedevelopmx/flatkit.git', {args: './src/vendor/flatkit'}, function (err) {
            if (err) throw err;
          });
});

// Generate vendor resources
gulp.task('vendor-resources', function() {
   return gulp.src([
            './src/images/**'
          ])
          .pipe(gulp.dest('./dist/images')) &&

          gulp.src([
            './src/vendor/flatkit/assets/styles/app.css'
          ])
          .pipe(gulp.dest('./dist/css')) &&

          gulp.src([
            './src/vendor/flatkit/assets/bootstrap/dist/css/**',
            './src/vendor/flatkit/assets/material-design-icons/**'
          ], {base: './src/vendor/flatkit/assets'})
          .pipe(gulp.dest('./dist/vendor')) &&

          gulp.src([
            './node_modules/bootstrap/dist/js/**',
            './node_modules/jquery/dist/**'
          ], { base: './node_modules'})
          .pipe(gulp.dest('./dist/vendor'));
});

//Webpack
gulp.task('build', ['vendor-resources'], function() {
  return run('webpack').exec()
    .pipe(gulp.dest('output'));
});

gulp.task('sass', function () {
  return gulp.src('./src/styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./src/styles/**/*.scss', ['sass']);
});
