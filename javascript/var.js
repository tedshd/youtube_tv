/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-29 23:59:16
 * @version $Id$
 */


var CONSTANT = {
    apiKey: 'AIzaSyDbLMkzM6NWdHw2mGbarKblI9iHDzufvEU',
    clientId: '94391273708-1170981f357m9jn2akr5vgjscrirfl19.apps.googleusercontent.com',
    playList: [],
    videoList: [],
    localStorageData: false
},
player = false;
keyboardControlAllow = false;
