/*global $, jQuery, alert, console, angular*/
/**
 *
 * @authors Ted Shiu (tedshd@gmail.com)
 * @date    2015-02-18 23:27:59
 * @version $Id$
 */


function gridDPad() {
    var focusCount = 0,
        gridSum,
        domList,
        viewW,
        viewH,
        viewXCount,
        viewYCount,
        viewCount,
        scrollCount;
    function initView() {
        viewW = window.document.documentElement.clientWidth;
        viewH = window.document.documentElement.clientHeight - 42;
        viewXCount = Math.floor(viewW/gridW);
        viewYCount = Math.floor(viewH/gridH);
        viewCount = viewXCount*viewYCount;
        console.log('initView', viewXCount);
    }
    function resetCount(count) {
        focusCount = count || 0;
    }
    function moveUp() {
        focusCount = focusCount - viewXCount;
        if (0 >= focusCount) {
            focusCount = 0;
        }
        domList[focusCount].classList.add('focus');
    }
    function moveDown() {
        focusCount = focusCount + viewXCount;
        if (focusCount >= gridsSum - 1) {
            focusCount = gridsSum - 1;
        }
        console.log(focusCount);
        domList[focusCount].classList.add('focus');
    }
    function moveLeft() {
        focusCount--;
        if (0 >= focusCount) {
            focusCount = 0;
        }
        domList[focusCount].classList.add('focus');
    }
    function moveRight() {
        focusCount++;
        if (focusCount >= gridsSum) {
            focusCount = gridsSum - 1;
        }
        domList[focusCount].classList.add('focus');
    }
    function move(type, currentCount) {
        domList = document.querySelectorAll('.videos_grid');
        gridsSum = domList.length;
        // focusCount = currentCount;
        domList[focusCount].classList.remove('focus');
        switch (type) {
            case 'up':
                moveUp();
                console.log(focusCount);
                break;
            case 'down':
                moveDown();
                console.log(focusCount);
                break;
            case 'left':
                moveLeft();
                console.log(focusCount);
                break;
            case 'right':
                moveRight();
                console.log(focusCount);
                break;
            default:
                console.error('gridDPad move type error');
                break;
        }
        scrollCount = Math.floor(focusCount/viewCount);
        node('#video_list_ul').style.top = - gridH*viewYCount*scrollCount + 'px';
    }
    initView();
    this.initView = initView;
    this.move = move;
    this.resetCount = resetCount;
}