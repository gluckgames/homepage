/*eslint-env node */
"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var watchify = require("watchify");
var browserSync = require("browser-sync").create();
var source = require("vinyl-source-stream");
var less = require("gulp-less");
var gutil = require("gulp-util");
var notify = require("gulp-notify");
var htmlhint = require("gulp-htmlhint");
var path = require("path");
var sourcemaps = require("gulp-sourcemaps");
var fileinclude = require("gulp-file-include");
var runSequence = require("run-sequence");
var del = require("del");

gulp.task("server", function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        },
        open: false

    });
});

function bundleMainBrowserify(b) {
    return b.bundle()
        .on("error", function(err){
            console.log(err.message);
        })
        .pipe(source("main.js"))
        .pipe(gulp.dest("./dist/"));
}

function createMainBrowserify() {
    return browserify({
        entries: "./js/index.js",
        transform: [babelify],
        cache: {},        // for watchify
        packageCache: {}, // for watchify
        fullPaths: true
    });
}

gulp.task("js", function() {
    bundleMainBrowserify(createMainBrowserify());
});

gulp.task("js:watch", function() {
    var b = watchify(createMainBrowserify());
    b.on("log", gutil.log);
    bundleMainBrowserify(b); // run build when watch is started
    b.on("update", function() {
        bundleMainBrowserify(b)
        .pipe(browserSync.stream());
    });
});

gulp.task("less", function() {
    return gulp.src("./less/main.less")
    .pipe(sourcemaps.init())
    .pipe(less({
        paths: [
            path.normalize(__dirname + "/node_modules")
        ]
    }).on("error", gutil.log))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist"))
    .pipe(browserSync.stream());
});

gulp.task("html", function () {
    return gulp.src("*.html")
    .pipe(fileinclude({
      prefix: "@@",
      basepath: "@file"
    }))
    .pipe(htmlhint())
    //.pipe(htmlhint.failReporter())
    .on("error", notify.onError(function(err) {
        return err.message;
    }))
    .pipe(gulp.dest("dist/"))
    .pipe(browserSync.stream());
});

gulp.task("img", function () {
    gulp.src(["img/*.png", "img/*.jpg"])
    .pipe(gulp.dest("dist/img/"))
    .pipe(browserSync.stream());
});

gulp.task("download", function () {
    gulp.src("download/*")
    .pipe(gulp.dest("dist/download/"))
    .pipe(browserSync.stream());
});

gulp.task("clean", function (cb) {
  del([ "dist/**/*" ], cb);
});

gulp.task("watch", ["build", "js:watch"], function () {
    gulp.watch(["*.html", "partials/*.html"], ["html"]);
    gulp.watch("img/**", ["img"]);
    gulp.watch("download/**", ["download"]);
    gulp.watch("less/**", ["less"]);
});

gulp.task("build", [ "less", "js", "html", "img", "download"]);
gulp.task("jenkins", function(cb) {
    runSequence("clean", "build", cb);
});
gulp.task("default", ["build", "server", "watch"]);
