/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-28 01:41:52
 * @version $Id$
 */


function node(selector) {
    if (selector.indexOf('.') === -1) {
        if (document.querySelectorAll(selector).length === 1) {
            return document.querySelector(selector);
        }
        return document.querySelectorAll(selector);
    }
    return document.querySelectorAll(selector);
}

function addClass(dom, className) {
    if (dom.classList) {
        dom.classList.add(className);
    } else {
        dom.className += ' ' + className;
    }
}

function removeClass(dom, className) {
    if (dom.classList) {
        dom.classList.remove(className);
    } else {
        var reg = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
        dom.className = dom.className.replace(reg, ' ');
    }
}

function hasClass(dom, className) {
    if (dom.classList) {
        return dom.classList.contains(className);
    } else {
        // dom.className = dom.className
    }
}

function transitionEnd() {
    var el = document.createElement('div'), //what the hack is bootstrap
        transEndEventNames = {
        WebkitTransition : 'webkitTransitionEnd',
        MozTransition    : 'transitionend',
        OTransition      : 'oTransitionEnd otransitionend',
        transition       : 'transitionend'
    };

    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return transEndEventNames[name];
        }
    }

    return false; // explicit for ie8 (  ._.)
}
/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2015-02-23 16:17:33
 * @version $Id$
 */


function browser() {
    var agent = navigator.userAgent;
    if (agent.search('MSIE 7') > 0) {
        return 'IE7';
    }
    if (agent.search('MSIE 8') > 0) {
        return 'IE8';
    }
    if (agent.search('MSIE 9') > 0) {
        return 'IE9';
    }
    if (agent.search('MSIE 10') > 0) {
        return 'IE10';
    }
    if (agent.search('like Gecko') > 0) {
        return 'IE11';
    }
    if (agent.search('MSIE') > 0) {
        return 'IE';
    }
    if (agent.search('OPR') > 0) {
        return 'Opera';
    }
    if (agent.search('Opera') > 0) {
        return 'Opera';
    }
    if (agent.search('Firefox') > 0) {
        return 'Firefox';
    }
    if (agent.search('Chrome') > 0) {
        return 'Chrome';
    }
    if (agent.search('Safari') > 0) {
        return 'Safari';
    }
    return 'unknown browser';
}

/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-29 23:59:16
 * @version $Id$
 */


var CONSTANT = {
    apiKey: 'AIzaSyDbLMkzM6NWdHw2mGbarKblI9iHDzufvEU',
    clientId: '94391273708-nflbpcj18n0g988pgrrdah1iu0tjf4rk.apps.googleusercontent.com',
    callBack: 'http://tedshd.io/youtube_tv/oauth2callback.html',
    playList: [],
    videoList: [],
    localStorageData: false
},
player = false;
keyboardControlAllow = false;

/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-28 02:57:59
 * @version $Id$
 */


function loadingView(status) {
    if (typeof(status) == 'undefined') {
        console.error('loadingView not set status');
        return;
    }
    var loadView = node('#loading_view');
    status = status || 'show';
    switch (status) {
        case 'show':
            removeClass(loadView, 'hide');
            addClass(loadView, 'loading');
            removeClass(loadView, 'hidden');
            break;
        case 'hide':
            addClass(loadView, 'hidden');
            break;
        default:
            console.error('loadingView status error');
    }
    loadView.addEventListener(transitionEnd(), function () {
        if (hasClass(loadView, 'hidden')) {
            removeClass(loadView, 'loading');
            addClass(loadView, 'hide');
        }
    });
}

function loadData() {
    // body...
}

/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2015-02-21 02:11:05
 * @version $Id$
 */


function d4Channel() {
    var apiKey = CONSTANT.apiKey,
        part = 'snippet',
        maxResults = 50,
        playlistArray = [
            'PLjw-j0hh81Ic5ISTlNUtsra2g8QHPrb73',
            'PLnuf8iyXggLF1i0uDcAcfT5nVNp2zMetB',
            'PLwJU_HbYL0K-707IYgm7kE22xU3bg9d2R',
            'PLh5AEuNLTjzH-fV4Yl9xz_4pBJIckFORS',
            'PL63F0C78739B09958',
            'PL5N5Hv3klahFe5RCBsuZfsKpL469NyDlW',
            'PLIhwbtfyUlJo-BPWB-k2tW5EZA7wt3-Nq',
            'PLIhwbtfyUlJpPxTDFGUB-3nURclRn4HgU',
            'PLH_jrUYcerbrRxyNmjHxp36q3HUS7Mywx',
            'PLH_jrUYcerbo3bKdLrTT6ldtQGW_7t_1a',
            'PLH_jrUYcerbptnxynRbdJMMVTLJtO7P0t'
        ];
    // CONSTANT.playList
    // https://www.googleapis.com/youtube/v3/playlists?part=snippet&id=PL63F0C78739B09958&maxResults=50&key=AIzaSyDQTsG6yBEpOU-72s_JbG1u0j0o54U48cM
    // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=PL8CKkc4HozgooY_BBNRVFdUgru33K9AWI&key=AIzaSyDQTsG6yBEpOU-72s_JbG1u0j0o54U48cM
    getPlayList(0);
    function getPlayList(count) {
        node('#loading_hint').innerHTML = '取得播放清單';
        if (count >= playlistArray.length) {
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.googleapis.com/youtube/v3/playlists?part='+part+'&id='+playlistArray[count]+'&maxResults='+maxResults+'&key='+apiKey, true);
        xhr.onload = function(e) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText),
                    channel = {
                    id: response.items[0].id,
                    data: response.items[0].snippet
                };
                CONSTANT.playList.push(channel);
                getVideos(count);
            } else {
                console.error(xhr.status);
            }
        };
        xhr.send();
    }
    function getVideos(count) {
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.googleapis.com/youtube/v3/playlistItems?part='+part+'&maxResults='+maxResults+'&playlistId='+playlistArray[count]+'&key='+apiKey, true);
        xhr.onload = function(e) {
            if (xhr.status == 200) {
                var response = JSON.parse(xhr.responseText);
                CONSTANT.playList[count].videos = response.items;
                count++;
                if (playlistArray.length > count) {
                    getPlayList(count);
                } else {
                    initChannelList();
                }
            } else {
                console.error(xhr.status);
            }
        };
        xhr.send();
    }
}

/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-28 19:02:47
 * @version $Id$
 */


function oauth() {
    if (browser() === 'IE10' ||
        browser() === 'IE9' ||
        browser() === 'IE8' ||
        browser() === 'IE7'
    ) {
        setTimeout(function () {
            removeClass(node('#browser'), 'hide');
        }, 1000);
        return;
    }
    var OAUTH2_CLIENT_ID = CONSTANT.clientId,
        OAUTH2_SCOPES = [
            'https://www.googleapis.com/auth/youtube'
        ];

    googleApiClientReady = function() {
        gapi.auth.init(function() {
            window.setTimeout(checkAuth, 1);
        });
    };

    function checkAuth() {
        gapi.auth.authorize({
            client_id: OAUTH2_CLIENT_ID,
            scope: OAUTH2_SCOPES,
            immediate: true
        }, handleAuthResult);
    }

    function handleAuthResult(authResult) {
        if (authResult && !authResult.error) {
            if (authResult.status.method !== 'AUTO') {
                location.reload();
            }
            loadAPIClientInterfaces();
            addClass(node('#login_link'), 'hide');
            node('#logout_link').addEventListener('click', function () {
                ga('send', 'event', 'link', 'logout google');
                window.location = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://tedshd.io/youtube_tv';
            });
        } else {
            d4Channel();
            addClass(node('#logout_link'), 'hide');
            node('#login_link').addEventListener('click', function () {
                ga('send', 'event', 'link', 'oauth google');
                window.location = 'https://accounts.google.com/o/oauth2/auth?client_id=' +
                OAUTH2_CLIENT_ID +
                '&redirect_uri=' + CONSTANT.callBack +'' +
                '&scope=https://www.googleapis.com/auth/youtube&response_type=token';
            });
        }
    }
}

/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-29 23:18:28
 * @version $Id$
 */


function loadAPIClientInterfaces() {
    gapi.client.load('youtube', 'v3', function() {
        handleAPILoaded();
    });
    var playlistId, nextPageToken, prevPageToken, playlistL, count = 1;

    // After the API loads, call a function to get the uploads playlist ID.
    function handleAPILoaded() {
        requestUserUploadsPlaylistId();
    }

    function requestUserUploadsPlaylistId() {
    // var request = gapi.client.youtube.channels.list({
        var request = gapi.client.youtube.playlists.list({
                mine: true,
                part: 'snippet',
                maxResults: 50
            });
        request.execute(function(response) {
            var playlists = response.items;
            playlistL = playlists.length;
            for (var i = 0; i < playlists.length; i++) {
                var channel = {
                    id: playlists[i].id,
                    data: playlists[i].snippet
                };
                CONSTANT.playList.push(channel);
                requestVideoPlaylist(CONSTANT.playList[i]);
            }
        });
    }

    // Retrieve the list of videos in the specified playlist.
    function requestVideoPlaylist(playlist, pageToken) {
        node('#loading_hint').innerHTML = '取得播放清單';
        var requestOptions = {
                playlistId: playlist.id,
                part: 'snippet',
                maxResults: 50
            };
        if (pageToken) {
            requestOptions.pageToken = pageToken;
        }
        var request = gapi.client.youtube.playlistItems.list(requestOptions);
        request.execute(function(response) {
            var nextVis = nextPageToken ? 'visible' : 'hidden';
            var prevVis = prevPageToken ? 'visible' : 'hidden';

            var playlistItems = response.result.items;
            if (playlistItems) {
                playlist.videos = playlistItems;
            } else {
                console.log('Sorry you have no uploaded videos');
            }
            count++;
            if (count == playlistL) {
                initChannelList();
            }
        });
    }

    function nextPage() {
        requestVideoPlaylist(playlistId, nextPageToken);
    }

    function previousPage() {
        requestVideoPlaylist(playlistId, prevPageToken);
    }
}

/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-30 00:44:13
 * @version $Id$
 */


function initChannelList() {
    node('#loading_hint').innerHTML = '初始化播放清單';
    var channelList = CONSTANT.playList,
        ul = document.createElement('ul');
    for (var i = 0; i < channelList.length; i++) {
        var li = document.createElement('li');
        li.setAttribute('class', 'channels');
        li.setAttribute('id', 'ch_' + i + '');
        li.innerHTML = '<div>' +
            '<img src="' + channelList[i].data.thumbnails.medium.url + '" width="160" height="90">' +
            '<span class="channel_list_channel_name">' + channelList[i].data.title + '</span>' +
            '<span class="channel_list_channel_num">' + '' + '</span>' +
            '</div>';
        ul.setAttribute('id', 'channel_list');
        ul.appendChild(li);
    }
    node('#player_channel_menu_list').appendChild(ul);
    addClass(document.querySelectorAll('.channels')[0], 'active');
    tmpArr = node('.channels');
    loadChannelVideos();

    var channels = document.querySelectorAll('#player_channel_menu_list li');
}

/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-30 01:54:31
 * @version $Id$
 */


function loadChannelVideos(count) {
    var channelVideo, channelTitle, video,
        channelCount = count || 0;
    if (CONSTANT.localStorageData) {
        var data = loadData();
    }
    channelVideo = CONSTANT.playList[channelCount].videos;
    channelTitle = CONSTANT.playList[channelCount].data.title;
    function initVideoList(channel) {
        node('#miiitv_video_list_container').innerHTML = '';
        node('#video_list_info').innerHTML = '';
        CONSTANT.videoList = [];
        var videosList = document.createElement('ul');
        for (var i = 0; i < channel.length; i++) {
            if (channel[i].snippet.description === 'This video is unavailable.') {
                continue;
            }
            CONSTANT.videoList.push(channel[i].snippet);
console.log(channel[i]);
            var videoTitle = channel[i].snippet.title,
                videoId = channel[i].snippet.resourceId.videoId,
                videoCover = channel[i].snippet.thumbnails.medium.url,
                videoCoverW = channel[i].snippet.thumbnails.medium.width,
                videoCoverH = channel[i].snippet.thumbnails.medium.height,
                li = document.createElement('li'),
                img = document.createElement('img'),
                div = document.createElement('div');
            videosList.setAttribute('id', 'video_list_ul');
            li.setAttribute('data-video-list-count', i);
            addClass(li, 'videos_grid');
            img.setAttribute('id', videoId);
            img.setAttribute('src', videoCover);
            img.setAttribute('width', videoCoverW);
            img.setAttribute('height', videoCoverH);
            div.setAttribute('class', 'video_title ellipsis');
            div.innerHTML = videoTitle;
            li.appendChild(img);
            li.appendChild(div);
            videosList.appendChild(li);
        }
        node('#video_list_info').innerHTML = channelTitle + '('+ channel.length +')';
        initPlayer(channelCount);
        node('#miiitv_video_list_container').appendChild(videosList);
        addClass(node('.videos_grid')[0], 'focus');
        addClass(node('.videos_grid')[0], 'playing');
    }
    initVideoList(channelVideo);
}

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


/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-30 02:17:45
 * @version $Id$
 */


function initPlayer(channelCount) {
    node('#loading_hint').innerHTML = '初始化播放器';
    if (!CONSTANT.player) {
        youTubePlayer = new window.youTubePlayer();
        CONSTANT.player = true;
        window.youTubePlayer = youTubePlayer;
    }
    youTubePlayer.PLAYERCONFIG.videosList = CONSTANT.videoList;
    youTubePlayer.PLAYERCONFIG.usersChannelsList = CONSTANT.playList;
    initSize();
    youTubePlayer.loadChannel(CONSTANT.videoList, channelCount);
    youTubePlayer.PLAYERCONFIG.init = true;
    keyboardControlAllow = true;
    loadingView('hide');
}

/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2015-02-18 23:27:59
 * @version $Id$
 */


function gridDPad() {
    var focusCount = 0,
        gridSum,
        domList,
        viewW,
        viewH,
        viewXCount,
        viewYCount,
        viewCount,
        scrollCount;
    function initView() {
        viewW = window.document.documentElement.clientWidth;
        viewH = window.document.documentElement.clientHeight - 42;
        viewXCount = Math.floor(viewW/gridW);
        viewYCount = Math.floor(viewH/gridH);
        viewCount = viewXCount*viewYCount;
    }
    function resetCount(count) {
        focusCount = count || 0;
    }
    function moveUp() {
        focusCount = focusCount - viewXCount;
        if (0 >= focusCount) {
            focusCount = 0;
        }
        domList[focusCount].classList.add('focus');
    }
    function moveDown() {
        focusCount = focusCount + viewXCount;
        if (focusCount >= gridsSum - 1) {
            focusCount = gridsSum - 1;
        }
        domList[focusCount].classList.add('focus');
    }
    function moveLeft() {
        focusCount--;
        if (0 >= focusCount) {
            focusCount = 0;
        }
        domList[focusCount].classList.add('focus');
    }
    function moveRight() {
        focusCount++;
        if (focusCount >= gridsSum) {
            focusCount = gridsSum - 1;
        }
        domList[focusCount].classList.add('focus');
    }
    function move(type, currentCount) {
        domList = document.querySelectorAll('.videos_grid');
        gridsSum = domList.length;
        // focusCount = currentCount;
        domList[focusCount].classList.remove('focus');
        switch (type) {
            case 'up':
                moveUp();
                break;
            case 'down':
                moveDown();
                break;
            case 'left':
                moveLeft();
                break;
            case 'right':
                moveRight();
                break;
            default:
                console.error('gridDPad move type error');
                break;
        }
        scrollCount = Math.floor(focusCount/viewCount);
        node('#video_list_ul').style.top = - gridH*viewYCount*scrollCount + 'px';
    }
    initView();
    this.initView = initView;
    this.move = move;
    this.resetCount = resetCount;
}

/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-29 23:15:39
 * @version $Id$
 */


oauth();
// loadAPIClientInterfaces();
// initChannelList();


var menuOpenStatus = false;
if (hasClass(node('#player_channel_menu_list'), 'menu_open')) {
    menuOpenStatus = true;
}
function menuOpen(action) {
    switch (action) {
        case 'open':
            addClass(node('#player_channel_menu_list'), 'menu_open');
            menuOpenStatus = true;
            ga('send', 'event', 'operate', 'open menu');
            break;
        case 'close':
            removeClass(node('#player_channel_menu_list'), 'menu_open');
            menuOpenStatus = false;
            break;
    }
}

var infoOpenStatus = false;
if (hasClass(node('#player_video_info_container'), 'video_info_open')) {
    infoOpenStatus = true;
}
function infoOpen(action) {
    switch (action) {
        case 'open':
            addClass(node('#player_video_info_container'), 'video_info_open');
            infoOpenStatus = true;
            ga('send', 'event', 'operate', 'open video info');
            break;
        case 'close':
            removeClass(node('#player_video_info_container'), 'video_info_open');
            infoOpenStatus = false;
            break;
    }
}

var videoListOpenStatus = false;
function videoList(action) {
    switch (action) {
        case 'open':
            if (CONSTANT.player) {
                youTubePlayer.videoPause();
            }
            removeClass(node('#miiitv_video_list'), 'hide');
            videoListOpenStatus = true;
            ga('send', 'event', 'operate', 'open video list');
            break;
        case 'close':
            addClass(node('#miiitv_video_list'), 'hide');
            videoListOpenStatus = false;
            if (CONSTANT.player) {
                youTubePlayer.videoPlay();
            }
            break;
    }
}

var linkOpenStatus = false;
function linkView(action) {
    switch (action) {
        case 'open':
            if (CONSTANT.player) {
                youTubePlayer.videoPause();
            }
            removeClass(node('#miiitv_link'), 'hide');
            linkOpenStatus = true;
            break;
        case 'close':
            addClass(node('#miiitv_link'), 'hide');
            linkOpenStatus = false;
            if (CONSTANT.player) {
                youTubePlayer.videoPlay();
            }
            break;
    }
}

function controlSpace() {
    if (CONSTANT.player) {
        if (playerStatus) {
            youTubePlayer.videoPause();
            playerStatus = false;
        } else {
            youTubePlayer.videoPlay();
            playerStatus = true;
        }
    }
}
function controlChannelUp() {
    if (CONSTANT.player) {
        if (!menuOpenStatus) {
            menuOpen('open');
        }
        // removeClass(document.querySelectorAll('.channels')[youTubePlayer.PLAYERCONFIG.playingChannelCount], 'active');
        youTubePlayer.switchChannel('down');
        gridDPad.resetCount();
        // addClass(document.querySelectorAll('.channels')[youTubePlayer.PLAYERCONFIG.playingChannelCount], 'active');
    }
}
function controlChannelDown() {
    if (CONSTANT.player) {
        if (!menuOpenStatus) {
            menuOpen('open');
        }
        // removeClass(document.querySelectorAll('.channels')[youTubePlayer.PLAYERCONFIG.playingChannelCount], 'active');
        youTubePlayer.switchChannel('up');
        gridDPad.resetCount();
        // addClass(document.querySelectorAll('.channels')[youTubePlayer.PLAYERCONFIG.playingChannelCount], 'active');
    }
}

function controlVideo(action) {
    if (!infoOpenStatus) {
        infoOpen('open');
    }
    if (CONSTANT.player) {
        // removeClass(node('.videos_grid')[youTubePlayer.PLAYERCONFIG.playingVideoCount], 'focus');
        removeClass(node('.videos_grid')[youTubePlayer.PLAYERCONFIG.playingVideoCount], 'playing');
        switch(action) {
            case 'prev':
                youTubePlayer.switchVideo('prev');
            break;
            case 'next':
                youTubePlayer.switchVideo('next');
            break;
        }
        // addClass(node('.videos_grid')[youTubePlayer.PLAYERCONFIG.playingVideoCount], 'focus');
        addClass(node('.videos_grid')[youTubePlayer.PLAYERCONFIG.playingVideoCount], 'playing');
    }
}

var gridW = 320,
    gridH = 180;
var gridDPad = new gridDPad();
var Main = {menuCount: 0, channelsCount: 0};
var tmpArr = [];
var liViewH = 90,
    viewH = window.document.documentElement.clientHeight,
    viewCount = Math.floor(viewH/liViewH);
function channelSelect(status) {
    // document.querySelector('#error').innerHTML = 'channel select';
    var menuList = document.querySelectorAll('#channel_list li'),
        // menuView = 7;
        menuView = viewCount,
        view,
        viewList;
    // menuList[Main.menuCount].setAttribute('class', '');
    // Main.menuCount = youTubePlayer.PLAYERCONFIG.playingChannelCount;
    removeClass(document.querySelectorAll('.channels')[Main.menuCount], 'active');
    switch(status) {
        case 'up':
            Main.menuCount--;
            Main.channelsCount--;
            if (Main.menuCount < 0) {
                Main.menuCount = 0;
                if (Main.channelsCount < 0) {
                    Main.channelsCount = 0;
                    break;
                }
                view = document.createElement('ul');
                for (var i = Main.channelsCount; i < Main.channelsCount + (menuView + 1); i++) {
                    if (i === tmpArr.length) {
                        break;
                    }
                    viewList = tmpArr[i];
                    view.appendChild(viewList);
                }
                document.querySelector('#channel_list').innerHTML = view.innerHTML;
            }
            controlChannelUp();
        break;
        case 'down':
            Main.menuCount++;
            Main.channelsCount++;
            if (Main.menuCount > menuView - 1) {
                Main.menuCount = menuView - 1;
                if (Main.channelsCount >= tmpArr.length) {
                    Main.channelsCount = tmpArr.length - 1;
                    break;
                }
                view = document.createElement('ul');
                for (var f = Main.channelsCount - (menuView - 1); f < Main.channelsCount + 2; f++) {
                    if (f === tmpArr.length) {
                        break;
                    }
                    viewList = tmpArr[f];
                    view.appendChild(viewList);
                }
                document.querySelector('#channel_list').innerHTML = view.innerHTML;
            }
            controlChannelDown();
        break;
        case 'pgUp':
            if (Main.channelsCount >= tmpArr.length - 1) {
                Main.channelsCount = tmpArr.length - (2*menuView);
            } else {
                Main.channelsCount-= menuView;
                if (Main.channelsCount < 0) {
                    Main.channelsCount = 0;
                    Main.menuCount = 0;
                }
            }
            view = document.createElement('ul');
            for (var j = Main.channelsCount; j < Main.channelsCount + menuView; j++) {
                viewList = tmpArr[j];
                view.appendChild(viewList);
            }
            document.querySelector('#channel_list').innerHTML = view.innerHTML;
        break;
        case 'pgDn':
            Main.channelsCount+= menuView;
            if ((Main.channelsCount + menuView) > tmpArr.length - 1) {
                Main.channelsCount = tmpArr.length;
                Main.menuCount = menuView - 1;
                view = document.createElement('ul');
                for (var m = Main.channelsCount - menuView; m < Main.channelsCount; m++) {
                    viewList = tmpArr[m];
                    view.appendChild(viewList);
                }
            } else {
                view = document.createElement('ul');
                for (var n = Main.channelsCount; n < Main.channelsCount + menuView; n++) {
                    viewList = tmpArr[n];
                    view.appendChild(viewList);
                }
            }
            document.querySelector('#channel_list').innerHTML = view.innerHTML;
        break;
        default:
            Main.menuCount = 0;
    }
    // document.querySelectorAll('#channel_list li')[Main.menuCount].setAttribute('class', 'active');
    addClass(document.querySelectorAll('.channels')[Main.menuCount], 'active');
}
var playerStatus = true;
window.onkeydown = keyboardControl;
function keyboardControl(e) {
    if (!keyboardControlAllow || !CONSTANT.player) {
        return;
    }
    switch (e.keyCode) {
        case 13:
            // enter
            if (videoListOpenStatus) {
                if (CONSTANT.player) {
                    var count = parseInt(node('#miiitv_video_list .focus')[0].getAttribute('data-video-list-count'), 10);
                    removeClass(node('.videos_grid')[youTubePlayer.PLAYERCONFIG.playingVideoCount], 'focus');
                    removeClass(node('.videos_grid')[youTubePlayer.PLAYERCONFIG.playingVideoCount], 'playing');
                    youTubePlayer.loadVideo(count, 'updateCurrentCount');
                    addClass(node('.videos_grid')[count], 'focus');
                    addClass(node('.videos_grid')[count], 'playing');
                }
                videoList('close');
            }
        break;
        case 27:
            // esc
            if (videoListOpenStatus) {
                videoList('close');
            }
            if (linkOpenStatus) {
                linkView('close');
            }
        break;
        case 32:
            // space
            controlSpace();
        break;
        case 37:
            // left
            if (videoListOpenStatus) {
                gridDPad.move('left', youTubePlayer.PLAYERCONFIG.playingVideoCount);
            } else {
                controlVideo('prev');
                if (menuOpenStatus) {
                    menuOpen('close');
                }
            }
        break;
        case 38:
            // up
            // controlChannelUp();
            if (videoListOpenStatus) {
                gridDPad.move('up', youTubePlayer.PLAYERCONFIG.playingVideoCount);
            } else {
                channelSelect('up');
            }
        break;
        case 39:
            // right
            if (videoListOpenStatus) {
                gridDPad.move('right', youTubePlayer.PLAYERCONFIG.playingVideoCount);
            } else {
                controlVideo('next');
                if (menuOpenStatus) {
                    menuOpen('close');
                }
            }
        break;
        case 40:
            // down
            // controlChannelDown();
            if (videoListOpenStatus) {
                gridDPad.move('down', youTubePlayer.PLAYERCONFIG.playingVideoCount);
            } else {
                channelSelect('down');
            }
        break;
        case 66:
            // b
            if (menuOpenStatus) {
                menuOpen('close');
            } else {
                menuOpen('open');
            }
        break;
        case 71:
            // g
            if (infoOpenStatus) {
                infoOpen('close');
            } else {
                infoOpen('open');
            }
        break;
        case 76:
            // l
            if (videoListOpenStatus) {
                return;
            }
            if (linkOpenStatus) {
                linkView('close');
            } else {
                linkView('open');
            }
        break;
        case 82:
            // r
            if (linkOpenStatus) {
                return;
            }
            if (videoListOpenStatus) {
                videoList('close');
            } else {
                videoList('open');
            }
            if (menuOpenStatus) {
                menuOpen('close');
            }
        break;
    }
}

window.onresize = initSize;
function initSize() {
    viewH = window.document.documentElement.clientHeight;
    viewCount = Math.floor(viewH/liViewH);
    if (CONSTANT.player) {
        var w = window.document.documentElement.clientWidth,
            h = window.document.documentElement.clientHeight;
        node('#player').style.width = w + 'px';
        node('#player').style.height = h + 'px';
        youTubePlayer.PLAYERCONFIG.width = w;
        youTubePlayer.PLAYERCONFIG.height = h;
    }
    gridDPad.initView();
}
node('#time_line').addEventListener('click', function (e) {
    var time = (e.clientX/window.document.documentElement.clientWidth)*10000;
    time = Math.round(time);
    time = time/100;
    youTubePlayer.timeJump(time);
});
node('#prev_channel').addEventListener('click', function () {
    controlChannelUp();
});
node('#next_channel').addEventListener('click', function () {
    controlChannelDown();
});
node('#prev_video').addEventListener('click', function () {
    controlVideo('prev');
});
node('#next_video').addEventListener('click', function () {
    controlVideo('next');
});
node('#space').addEventListener('click', function () {
    controlSpace();
});
node('#list_video').addEventListener('click', function () {
    if (videoListOpenStatus) {
        videoList('close');
    } else {
        videoList('open');
    }
});
node('#list_channel').addEventListener('click', function () {
    if (menuOpenStatus) {
        menuOpen('close');
    } else {
        menuOpen('open');
    }
});
node('#info_video').addEventListener('click', function () {
    if (infoOpenStatus) {
        infoOpen('close');
    } else {
        infoOpen('open');
    }
});
node('#link').addEventListener('click', function () {
    if (linkOpenStatus) {
        linkView('close');
    } else {
        linkView('open');
    }
});
