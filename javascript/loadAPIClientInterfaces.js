/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-29 23:18:28
 * @version $Id$
 */


function loadAPIClientInterfaces() {
    console.log('loadAPIClientInterfaces');
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
            console.log('PLAYLISTS', response);
            var playlists = response.items;
            playlistL = playlists.length;
            console.log(playlistL);
            for (var i = 0; i < playlists.length; i++) {
                var channel = {
                    id: playlists[i].id,
                    data: playlists[i].snippet
                };
                // console.log(playlists[i].id);
                // console.log(playlists[i].snippet);
                // console.log(playlists[i].snippet.title);
                // requestVideoPlaylist(playlists[i].id);
                CONSTANT.playList.push(channel);
                console.log(CONSTANT);
                requestVideoPlaylist(CONSTANT.playList[i]);
            }
            // playlistId = response.result.items[0].id;
            // playlistId = response.result.items[0].contentDetails.relatedPlaylists.uploads;
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
            // console.log(response);
            // nextPageToken = response.result.nextPageToken;
            // prevPageToken = response.result.prevPageToken;
            var nextVis = nextPageToken ? 'visible' : 'hidden';
            // $('#next-button').css('visibility', nextVis);
            var prevVis = prevPageToken ? 'visible' : 'hidden';
            // $('#prev-button').css('visibility', prevVis);

            var playlistItems = response.result.items;
            if (playlistItems) {
                console.log(playlistItems);
                playlist.videos = playlistItems;
                console.log(CONSTANT);
                // for (var i = 0; i < playlistItems.length; i++) {
                //     displayResult(playlistItems[i].snippet);
                // }
            } else {
                console.log('Sorry you have no uploaded videos');
            }
            // console.log(count);
            count++;
            if (count == playlistL) {
                initChannelList();
            }
        });
    }

    // Create a listing for a video.
    // function displayResult(videoSnippet) {
    // var title = videoSnippet.title;
    // var videoId = videoSnippet.resourceId.videoId;
    // console.log(title);
    // $('#video-container').append('<p>' + title + ' - ' + videoId + '</p>');
    // }

    function nextPage() {
        requestVideoPlaylist(playlistId, nextPageToken);
    }

    function previousPage() {
        requestVideoPlaylist(playlistId, prevPageToken);
    }
}