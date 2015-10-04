var gulp = require('gulp'),
    compass = require('gulp-compass'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch');

gulp.task('default', function() {
    gulp.run('compass');

    gulp.watch([
        './sass/**',
        './img/**'
        ], function(event) {
        gulp.run('compass');
    });
});

gulp.task('compass', function() {
    gulp.src('./sass/*.scss')
    .pipe(compass({
        comments: false,
        css: 'css', // css folder
        sass: 'sass', // scss folder
        image: 'img' // image folder
    }));
});

gulp.task('w', function (cb) {
    var options = {};
    watch('./sass/*', options, function (e) {
        console.log('e:'+JSON.stringify(e));
        console.log('\n');
        console.log(new Date() + ' -- ' + e.history[0].replace(e.base, ''));
        gulp.run('compass');
    });
    watch('./javascript/*', options, function (e) {
        console.log('e:'+JSON.stringify(e));
        console.log('\n');
        console.log(new Date() + ' -- ' + e.history[0].replace(e.base, ''));
        gulp.src(['javascript/lib.js',
            'javascript/browser.js',
            'javascript/var.js',
            'javascript/util.js',
            'javascript/d4Channel.js',
            'javascript/oauth.js',
            'javascript/loadAPIClientInterfaces.js',
            'javascript/initChannelList.js',
            'javascript/loadChannelVideos.js',
            'javascript/player.js',
            'javascript/initPlayer.js',
            'javascript/gridDPad.js',
            'javascript/main.js'
        ]).pipe(concat('youtube_tv.js', {newLine: '\n'}))
        .pipe(gulp.dest('dist/'));
    });
});
