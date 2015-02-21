/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-29 23:59:16
 * @version $Id$
 */


var CONSTANT = {
    playList: [],
    videoList: [],
    localStorageData: false
},
player = false;
keyboardControlAllow = false;