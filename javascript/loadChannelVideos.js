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
