/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-28 19:02:47
 * @version $Id$
 */


function oauth() {
    var OAUTH2_CLIENT_ID = '209837194630-i4figase4bf4nbtjh9fuh5hop6nbu50l.apps.googleusercontent.com',
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
                window.location = "https://www.google.com/accounts/Logout?continue=https://appengine.google.com/_ah/logout?continue=http://localhost/develop/miiitv_1.0_redesign/";
            });
        } else {
            d4Channel();
            addClass(node('#logout_link'), 'hide');
            node('#login_link').addEventListener('click', function () {
                gapi.auth.authorize({
                    client_id: OAUTH2_CLIENT_ID,
                    scope: OAUTH2_SCOPES,
                    immediate: false
                }, handleAuthResult);
            });
        }
    }
}
