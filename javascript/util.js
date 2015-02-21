/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-28 02:57:59
 * @version $Id$
 */


function loadingView(status) {
    if (typeof(status) == 'undefined') {
        console.error('loadingView not set status');
        return;
    }
    var loadView = node('#loading_view');
    status = status || 'show';
    switch (status) {
        case 'show':
            removeClass(loadView, 'hide');
            addClass(loadView, 'loading');
            removeClass(loadView, 'hidden');
            break;
        case 'hide':
            addClass(loadView, 'hidden');
            break;
        default:
            console.error('loadingView status error');
    }
    loadView.addEventListener(transitionEnd(), function () {
        if (hasClass(loadView, 'hidden')) {
            removeClass(loadView, 'loading');
            addClass(loadView, 'hide');
        }
    });
}

function loadData() {
    // body...
}
