/**
 * Created by Donny on 17/3/15.
 */
var gulp = require('gulp');
var browserSync = require('browser-sync');
var nodemon = require('gulp-nodemon');

// we'd need a slight delay to reload browsers
// connected to browser-sync after restarting nodemon
var BROWSER_SYNC_RELOAD_DELAY = 500;

gulp.task('nodemon', function (cb) {
    var called = false;
    return nodemon({

        // nodemon our expressjs server
        script: 'app.js',

        // watch core server file(s) that require server restart on change
        watch: ['**/*.js']
    })
        .on('start', function onStart() {
            // ensure start only got called once
            if (!called) {
                cb();
            }
            called = true;
        })
        .on('restart', function onRestart() {
            // reload connected browsers after a slight delay
            setTimeout(function reload() {
                browserSync.reload({
                    stream: false
                });
            }, BROWSER_SYNC_RELOAD_DELAY);
        });
});

gulp.task('browser-sync', ['nodemon'], function () {
    browserSync({
        proxy: 'http://localhost:3010',
        port: 4000
    });
});

gulp.task('js', function () {
    return gulp.src('public/js/*.js');
    // do stuff to JavaScript files
    //.pipe(uglify())
    //.pipe(gulp.dest('...'));
});

gulp.task('default', ['browser-sync'], function () {
    gulp.watch('public/**/*.js', ['js', browserSync.reload]);
    gulp.watch('public/**/*.css', ['css']);
    gulp.watch('public/**/*.html', ['bs-reload']);
});