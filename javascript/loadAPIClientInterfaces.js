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
