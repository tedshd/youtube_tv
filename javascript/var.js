/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-29 23:59:16
 * @version $Id$
 */


var CONSTANT = {
    apiKey: 'AIzaSyBolyD1KUN4g-LD7lPFw0hpTezo5xquFdc',
    clientId: '94391273708-nflbpcj18n0g988pgrrdah1iu0tjf4rk.apps.googleusercontent.com',
    callBack: 'https://tedshd.io/youtube_tv/oauth2callback.html',
    playList: [],
    videoList: [],
    localStorageData: false
},
player = false;
keyboardControlAllow = false;
