var gulp = require('gulp');
var tslint = require('gulp-tslint');
var exec = require('child_process').exec;
var jasmine = require('gulp-jasmine');
var gulp = require('gulp-help')(gulp);
var tsconfig = require('gulp-tsconfig-files');
var path = require('path');
var inject = require('gulp-inject');
var gulpSequence = require('gulp-sequence');
var del = require('del');
var dtsGenerator = require('dts-generator');
require('dotbin');

var tsFilesGlob = (function(c) {
    return c.filesGlob || c.files || '**/*.ts';
})(require('../../tsconfig.json'));

var appName = (function(p) {
    return p.name;
})(require('../../package.json'));

gulp.task('update-tsconfig', 'Update files section in tsconfig.json', function() {
    gulp.src(tsFilesGlob).pipe(tsconfig());
});

gulp.task('clean', 'Cleans the generated js files from lib directory', function() {
    return del([
        'lib/**/*'
    ]);
});

gulp.task('tslint', 'Lints all TypeScript source files', function() {
    return gulp.src(tsFilesGlob)
        .pipe(tslint())
        .pipe(tslint.report('verbose'));
});

gulp.task('_build', 'INTERNAL TASK - Compiles all TypeScript source files', function(cb) {
    exec('tsc', function(err, stdout, stderr) {
        console.log('TypeScript ', stdout);
        if (stderr) {
            console.log(stderr);
        }
    });

    return exec('tsc', function(err, stdout, stderr) {
        console.log(stdout);
        if (stderr) {
            console.log(stderr);
        }
        cb(err);
    });
});

//run tslint task, then run update-tsconfig and gen-def in parallel, then run _build
gulp.task('build', 'Compiles all TypeScript source files and updates module references', function(callback) {
    gulpSequence(/*'tslint',*/'update-tsconfig', '_build')(callback);
});

gulp.task('test', 'Runs the Jasmine test specs', function() {
    return gulp.src('spec/**/*.js')
        .pipe(jasmine());
});

gulp.task('watch', 'Watches ts source files and runs build on change', function() {
    gulp.watch(['tsconfig.json', 'src/**/*.ts', 'spec/**/*.ts'], ['build']);
});
