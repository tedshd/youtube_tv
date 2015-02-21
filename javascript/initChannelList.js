/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-30 00:44:13
 * @version $Id$
 */


function initChannelList() {
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
