/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-29 23:15:39
 * @version $Id$
 */


// oauth();
// loadAPIClientInterfaces();
d4Channel();
initChannelList();


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
