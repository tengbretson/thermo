var webpack = require('webpack');
var babel = require('gulp-babel');
var gulp = require('gulp');
var express = require('express');
var path = require('path');

var DevMiddleware = require('webpack-dev-middleware');
var HotMiddleware = require('webpack-hot-middleware');

var dev_config = require('./webpack.config.dev');
var prod_config = require('./webpack.config.prod');

gulp.task('presence-daemon', function () {
  return new Promise(function (resolve, reject) {
    var task = gulp.src('./presence-daemon/src/**/*.js')
      .pipe(babel({ presets: [ 'stage-0', 'es2015'] }))
      .pipe(gulp.dest('./presence-daemon/build'));
    task.on('error', reject);
    task.on('end', resolve);
  });
});

gulp.task('web-ui-server-build', function () {
  return new Promise(function (resolve, reject) {
    var task = gulp
      .src([ './web-ui/src/**/*.js', '!./web-ui/src/public/index.js' ])
      .pipe(babel({ presets: [ 'react', 'stage-0', 'es2015' ] }))
      .pipe(gulp.dest('./web-ui/build'));
    task.on('error', reject);
    task.on('end', resolve);
  });
});

gulp.task('web-ui-build', [ 'web-ui-server-build' ], function () {
  return new Promise(function (resolve, reject) {
    webpack(prod_config, function (error, stats) {
      if (error) reject(error);
      else resolve();
    });
  });
});

gulp.task('web-ui-dev-server', [ 'web-ui-server-build' ], function () {
  var router = require('./web-ui/build/router').router;
  var server = express();
  var compiler = webpack(dev_config);
  var publicPath = dev_config.output.publicPath;

  server.set('view engine', 'ejs');
  server.set('views', path.join(__dirname, 'web-ui', 'templates'));

  server.use(DevMiddleware(compiler, { publicPath }));
  server.use(HotMiddleware(compiler));
  server.use('/', router);

  server.listen(3000, function (error) {
    if (error) console.log(err);
    else console.log('Listening at http://localhost:3000');
  });
});
