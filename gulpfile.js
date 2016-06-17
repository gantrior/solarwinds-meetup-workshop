var gulp = require('gulp');
var args = require('yargs').argv;
var config = require('./gulp.config.js')();
var emitError = true;

var $ = require('gulp-load-plugins')({lazy: true});

gulp.task('help', $.taskListing);
gulp.task('default', ['tslint', 'tscompile']);

gulp.task('tslint', function () {
  return gulp.src(config.tslint)
    .pipe($.tslint())
    .pipe($.tslint.report('verbose'));
});

gulp.task('tscompile', [], function () {
    // use tsc just because of correct generation of sourceMaps
    gulp.src(config.ts)
        .pipe($.tsc({
            tscPath: "node_modules/typescript/bin/tsc",
            target: "ES6",
            sourceMap: true,
            outDir: config.tests,
            module: "commonjs",
            noImplicitAny: false,
            emitError: emitError
        }))
        .pipe(gulp.dest(config.tests))
});

gulp.task('watch', ['tscompile'], function() {
    emitError = false;
    gulp.watch(config.watchts, ['tscompile']);
});

//////// FUNCTIONS

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}