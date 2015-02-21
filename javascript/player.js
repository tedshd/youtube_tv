/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2015-01-02 17:30:47
 * @version $Id$
 */

(function () {
    function youTubePlayer() {
        // handle time
        function toHHMMSS(sec_num) {
            var time,
                hours   = Math.floor(sec_num / 3600),
                minutes = Math.floor((sec_num - (hours * 3600)) / 60),
                seconds = Math.floor(sec_num - (hours * 3600) - (minutes * 60));

            if (hours < 10) {
                hours  = "0" + hours;
            }
            if (minutes < 10) {
                minutes = "0" + minutes;
            }
            if (seconds < 10) {
                seconds = "0" + seconds;
            }
            time = hours + ':' + minutes + ':' + seconds;
            return time;
        }

        var PLAYERCONFIG = {
                playingChannelCount: 0,
                playingVideoCount: 0,
                quality: '',
                width: 1280,
                height: 720,
                usersChannelsList: [],
                videosList: [],
                init: false
            },
            player,
            playingTimeUI = document.querySelector('#playing_time'),
            playingTotalTimeUI = document.querySelector('#playing_total_time'),
            TimeLineUI = document.querySelector('#time_line'),
            progressTimeUI = document.querySelector('#progress_time'),
            device;
        var switchChannelTimeout,
            switchVideoTimeout,
            updateCurrentTimeInterval,
            checkDMvideoReadyInterval;

        function bufferHandler() {
            // body...
        }

        function errorHandler() {
            // body...
        }

        function initPlayer(videoCount) {
            initYouTubePlayer(videoCount);
        }

        function initYouTubePlayer(videoCount) {
            function onYouTubeIframeAPIReady() {
                player = new YT.Player('player', {
                    width: PLAYERCONFIG.width,
                    height: PLAYERCONFIG.height,
                    videoId: PLAYERCONFIG.videosList[videoCount].resourceId.videoId,
                    playerVars: {
                        rel: 1,
                        autoplay: 0,
                        disablekb: 1,
                        showsearch: 0,
                        showinfo: 0,
                        controls: 0,
                        autohide: 0,
                        modestbranding: 0,
                        wmode: 'opaque',
                        hd: 1,
                        html5: 1,
                        iv_load_policy: 3,
                        playsinline: 1
                    },
                    events: {
                        'onReady'        : onPlayerReady,
                        'onStateChange'  : onPlayerStateChange,
                        'onError'        : onPlayerError
                    }
                });
            }
            function onPlayerReady(event) {
                if (PLAYERCONFIG.videosList.length !== 0) {
                    loadVideo(videoCount);
                    updateCurrentTime();
                }
            }
            function onPlayerStateChange(event) {
                switch(event.data) {
                case YT.PlayerState.ENDED:
                    playLoop();
                    break;
                case YT.PlayerState.PLAYING:
                case YT.PlayerState.PAUSED:
                    playingTotalTimeUI.innerHTML = toHHMMSS(videoTotalTime());
                    break;

                case YT.PlayerState.BUFFERING:
                    console.log('BUFFER');
                    // skipBufferTimeout = setTimeout(Main.skipBuffer, Main.bufferTime);
                    break;
                default:
                    console.log('onPlayerStateChange:', event.data);
                    break;
                }
            }
            function onPlayerError(event) {
                console.error('Youtube player ERROR:', event);
                if(event.data === 5) {
                    player.destroy();
                    PLAYERCONFIG.playingVideoCount++;
                    if (PLAYERCONFIG.playingVideoCount > (PLAYERCONFIG.videosList.length - 1)) {
                        PLAYERCONFIG.playingVideoCount = 0;
                    }
                    setTimeout(function() {
                        initYouTubePlayer(PLAYERCONFIG.playingVideoCount);
                    }, 3000);
                    return;
                }
                setTimeout(playLoop, 3000);
            }

            setTimeout(function() {
                onYouTubeIframeAPIReady();
            }, 1000);
        }

        function loadChannel(chData, channelCount) {
            PLAYERCONFIG.videosList = chData;
            PLAYERCONFIG.playingChannelCount = channelCount || 0;
            PLAYERCONFIG.playingVideoCount = 0;

            if (!PLAYERCONFIG.init) {
                initPlayer(0);
            } else {
                loadVideo(PLAYERCONFIG.playingVideoCount);
            }
        }
        // PLAYERCONFIG.usersChannelsList = [data, data_2];
        // loadChannel(PLAYERCONFIG.usersChannelsList[0]);

        function loadVideo(playingVideoCount, updateCurrentCount) {
            var currentVideo = PLAYERCONFIG.videosList[playingVideoCount].resourceId.videoId;
            player.loadVideoById(currentVideo, 0, PLAYERCONFIG.quality);
            updateInfo(playingVideoCount);
            updateCurrentTime();
            if (updateCurrentCount) {
                PLAYERCONFIG.playingVideoCount = playingVideoCount;
            }
            window.onkeydown = keyboardControl;
        }

        function playLoop() {
            PLAYERCONFIG.playingVideoCount++;
            if (PLAYERCONFIG.playingVideoCount > (PLAYERCONFIG.videosList.length - 1)) {
                PLAYERCONFIG.playingVideoCount = 0;
            }
            loadVideo(PLAYERCONFIG.playingVideoCount);
        }

        function resetPlayerTime() {
            clearInterval(updateCurrentTimeInterval);
            playingTimeUI.innerHTML = '00:00:00';
            playingTotalTimeUI.innerHTML = '00:00:00';
            progressTimeUI.style.width = 0;
        }

        function switchChannel(status) {
            videoPause();
            resetPlayerTime();
            clearTimeout(switchChannelTimeout);
            switch (status) {
            case 'down':
                PLAYERCONFIG.playingChannelCount--;
                if (PLAYERCONFIG.playingChannelCount < 0) {
                    PLAYERCONFIG.playingChannelCount = PLAYERCONFIG.usersChannelsList.length - 1;
                }
                break;
            case 'up':
                PLAYERCONFIG.playingChannelCount++;
                if (PLAYERCONFIG.playingChannelCount > (PLAYERCONFIG.usersChannelsList.length - 1)) {
                    PLAYERCONFIG.playingChannelCount = 0;
                }
                break;
            default:
                console.error('switchChannel parameter error');
                return;
            }
            updateInfo(PLAYERCONFIG.playingVideoCount);
            switchChannelTimeout = setTimeout(
                function () {
                    loadChannelVideos(PLAYERCONFIG.playingChannelCount);
                    // loadChannel(PLAYERCONFIG.usersChannelsList[PLAYERCONFIG.playingChannelCount], PLAYERCONFIG.playingChannelCount);
                },
                900
            );
        }

        function switchVideo(status) {
            videoPause();
            resetPlayerTime();
            clearTimeout(switchVideoTimeout);
            switch (status) {
            case 'prev':
                PLAYERCONFIG.playingVideoCount--;
                if (PLAYERCONFIG.playingVideoCount < 0) {
                    PLAYERCONFIG.playingVideoCount = PLAYERCONFIG.videosList.length - 1;
                }
                break;
            case 'next':
                PLAYERCONFIG.playingVideoCount++;
                if (PLAYERCONFIG.playingVideoCount > (PLAYERCONFIG.videosList.length - 1)) {
                    PLAYERCONFIG.playingVideoCount = 0;
                }
                break;
            default:
                console.error('switchVideo parameter error');
                return;
            }
            updateInfo(PLAYERCONFIG.playingVideoCount);
            switchVideoTimeout = setTimeout(
                function () {
                    loadVideo(PLAYERCONFIG.playingVideoCount);
                },
                900
            );
        }

        function timeJump(num) {
            var time = (num/100)*videoTotalTime();
            time = Math.round(time);
            player.seekTo(time, true);
        }

        function updateInfo(count) {
            var videoTitle = PLAYERCONFIG.videosList[count].title,
                channelTitle = PLAYERCONFIG.usersChannelsList[PLAYERCONFIG.playingChannelCount].data.title;
            document.querySelector('#channel_title').innerHTML = channelTitle;
            document.querySelector('#video_title').innerHTML = videoTitle;
        }
        function updateCurrentTime() {
            clearInterval(updateCurrentTimeInterval);
            var currentTime = parseInt(videoCurrentTime(), 10);
            if (toHHMMSS(currentTime) === 'NaN:NaN:NaN') {
                resetPlayerTime();
            } else {
                playingTimeUI.innerHTML = toHHMMSS(currentTime);
                progressTimeUI.style.width = (currentTime / videoTotalTime()) * 100 + '%';
            }
            updateCurrentTimeInterval = setInterval(
                function () {
                    var currentTime = parseInt(videoCurrentTime(), 10);
                    if (isNaN(currentTime)) {
                        resetPlayerTime();
                        return;
                    }
                    playingTimeUI.innerHTML = toHHMMSS(currentTime);
                    progressTimeUI.style.width = (currentTime / videoTotalTime()) * 100 + '%';
                },
                1000
            );
        }

        function videoCurrentTime() {
            return player.getCurrentTime();
        }

        function videoTotalTime() {
            return player.getDuration();
        }

        function videoPause() {
            player.pauseVideo();
        }

        function videoPlay() {
            player.playVideo();
        }
        this.videoCurrentTime = videoCurrentTime;
        this.videoTotalTime = videoTotalTime;
        this.videoPause = videoPause;
        this.videoPlay = videoPlay;
        this.switchVideo = switchVideo;
        this.switchChannel = switchChannel;
        this.timeJump = timeJump;
        this.loadVideo = loadVideo;
        this.loadChannel = loadChannel;
        this.PLAYERCONFIG = PLAYERCONFIG;

    }
    window.youTubePlayer = youTubePlayer;
})();

