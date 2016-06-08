// browserify src/wrapper_API_v0-0-3.js -o dist/analytics_api.js

var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');
var AWS = require('aws-sdk');
var proxy = require('proxy-agent');
var fs = require('fs');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");

AWS.config.update({
  region: 'us-west-2',
  credentials: new AWS.SharedIniFileCredentials({profile: 'nordstrom-federated'}),
  httpOptions: { agent: proxy('http://webproxysea.nordstrom.net:8181') }
});
 
gulp.task('browserify', function() {
  return browserify('./src/wrapper_API_v0-0-3.js')
    .bundle()
    //Pass desired output filename to vinyl-source-stream
    .pipe(source('analytics_api.test.js'))
    // Start piping stream to tasks!
    .pipe(gulp.dest('./dist/'));
});

gulp.task('compress', function() {
  return gulp.src('./dist/analytics_api.js')
    .pipe(uglify())
    .pipe(rename('analytics_api.min.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('publish', function() {
  return fs.readFile('./dist/analytics_api.min.js', function(err, data) {
    if (err) { throw err; }

    var s3 = new AWS.S3();
    s3.putObject({
      Bucket: 'public-cxar-ato-opt', 
      Key: 'js/analytics_api.min.js', 
      Body: data, 
      ACL: 'public-read'
    }, function (err, data) {
      console.log(err, data);
    });
  });
});

gulp.task("default", ["browserify", "compress"]);
gulp.task("dev", ["browserify"]);