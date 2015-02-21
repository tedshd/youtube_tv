/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2014-12-28 01:41:52
 * @version $Id$
 */


function node(selector) {
    if (selector.indexOf('.') === -1) {
        if (document.querySelectorAll(selector).length === 1) {
            return document.querySelector(selector);
        }
        return document.querySelectorAll(selector);
    }
    return document.querySelectorAll(selector);
}

function addClass(dom, className) {
    if (dom.classList) {
        dom.classList.add(className);
    } else {
        dom.className += ' ' + className;
    }
}

function removeClass(dom, className) {
    if (dom.classList) {
        dom.classList.remove(className);
    } else {
        var reg = new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');
        dom.className = dom.className.replace(reg, ' ');
    }
}

function hasClass(dom, className) {
    if (dom.classList) {
        return dom.classList.contains(className);
    } else {
        // dom.className = dom.className
    }
}

function transitionEnd() {
    var el = document.createElement('div'), //what the hack is bootstrap
        transEndEventNames = {
        WebkitTransition : 'webkitTransitionEnd',
        MozTransition    : 'transitionend',
        OTransition      : 'oTransitionEnd otransitionend',
        transition       : 'transitionend'
    };

    for (var name in transEndEventNames) {
        if (el.style[name] !== undefined) {
            return transEndEventNames[name];
        }
    }

    return false; // explicit for ie8 (  ._.)
}