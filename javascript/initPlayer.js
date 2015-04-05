/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-30 02:17:45
 * @version $Id$
 */


function initPlayer(channelCount) {

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
