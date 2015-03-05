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
    var OAUTH2_CLIENT_ID = '433333476764-0usm520i8e79f58gjph6l44jtru8eq9n.apps.googleusercontent.com',
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
                window.location = 'https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://tedshd.lionfree.net/youtube_tv';
            });
        } else {
            d4Channel();
            addClass(node('#logout_link'), 'hide');
            node('#login_link').addEventListener('click', function () {
                window.location = 'https://accounts.google.com/o/oauth2/auth?client_id=' +
                OAUTH2_CLIENT_ID +
                '&redirect_uri=http://tedshd.lionfree.net/oauth2callback' +
                '&scope=https://www.googleapis.com/auth/youtube&response_type=token';
            });
        }
    }
}
