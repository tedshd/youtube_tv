/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2015-02-21 02:11:05
 * @version $Id$
 */


function d4Channel() {
    var apiKey = 'AIzaSyDQTsG6yBEpOU-72s_JbG1u0j0o54U48cM',
        part = 'snippet',
        maxResults = 50,
        playlistArray = [
            'PLPphwZOAe2uQSH_OfY2yV-yX3OLL5mNiF',
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
        if (count >= playlistArray.length) {
            return;
        }
        var xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://www.googleapis.com/youtube/v3/playlists?part='+part+'&id='+playlistArray[count]+'&maxResults='+maxResults+'&key='+apiKey, true);
        xhr.onload = function(e) {
            if (xhr.status == 200) {
                // console.log(xhr.responseText);
                console.log(JSON.parse(xhr.responseText).items[0]);
                var response = JSON.parse(xhr.responseText),
                    channel = {
                    id: response.items[0].id,
                    data: response.items[0].snippet
                };
                console.log(channel);
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
                // console.log(xhr.responseText);
                // console.log(JSON.parse(xhr.responseText));
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