var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var nodemon = require('gulp-nodemon');

var jsFiles = [ '*.js', 'src/**/*.js'];

gulp.task('style', function () {
  return gulp.src(jsFiles)
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish', {
      verbose: true
    }))
    .pipe(jscs());
});

gulp.task('inject', function () {
  var wiredep = require('wiredep').stream;

  // Injection of project files
  var injectSrc = gulp.src(['./public/css/*.css', './public/js/*.js'], {read: false});
  var injectOptions = {
      ignorePath: '/public'
  };

  // Injection of Bower
  var inject = require('gulp-inject');
  var options = {
    bowerJson: require('./bower.json'),
    directory: './public/lib',
    ignorePath: '../../public'
  };

  return gulp.src('./src/views/*.html')
    .pipe(wiredep(options))
    .pipe(inject(injectSrc, injectOptions))
    .pipe(gulp.dest('./src/views'));
});

gulp.task('serve', ['style', 'inject'], function () {
  var options = {
    // When nodemon, execute script
    script: 'app.js',
    // Delay between restarts
    delayTime: 1,
    env: {
      'PORT': 3000
    },
    // What the files nodemon will monitor
    watch: jsFiles
  };
  return nodemon(options)
    .on('restart', function (ev) {
      console.log('Restarting...');
    });
});
