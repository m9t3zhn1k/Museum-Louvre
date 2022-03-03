initComparisons();

function initComparisons() {

    const x = document.getElementsByClassName('compare__overlay');
    for (let item of x) {
        compareImages(item);
    }

    function compareImages(img) {
        let lineTop, sliderRound, lineBottom, clicked = 0, w, h;
        w = img.clientWidth;
        h = img.clientHeight;

        img.style.width = 0.6 * w + 'px';

        lineTop = document.createElement('DIV');
        sliderRound = document.createElement('DIV');
        lineBottom = document.createElement('DIV');

        lineTop.setAttribute('class', 'compare__verticall-line_top');
        sliderRound.setAttribute('class', 'compare__round');
        lineBottom.setAttribute('class', 'compare__verticall-line_bottom');

        img.parentElement.insertBefore(lineTop, img);
        img.parentElement.insertBefore(sliderRound, img);
        img.parentElement.insertBefore(lineBottom, img);

        lineTop.style.top = 0 + '%';
        sliderRound.style.top = (h / 2 - 5 - sliderRound.clientHeight / 2) / h * 100 + '%';
        lineBottom.style.bottom = 0 + '%';

        lineTop.style.left = (0.6 * w - lineTop.clientWidth / 2) / w * 100 + '%';
        sliderRound.style.left = (0.6 * w - (sliderRound.clientWidth) / 2 - lineTop.clientWidth) / w * 100 + '%';
        lineBottom.style.left = (0.6 * w - lineBottom.clientWidth / 2) / w * 100 + '%';
    
        sliderRound.addEventListener('mousedown', slideReady);
        lineTop.addEventListener('mousedown', slideReady);
        lineBottom.addEventListener('mousedown', slideReady);
        window.addEventListener('mouseup', slideFinish);
    
        sliderRound.addEventListener('touchstart', slideReady);
        lineTop.addEventListener('touchstart', slideReady);
        lineBottom.addEventListener('touchstart', slideReady);
        window.addEventListener('touchend', slideFinish);
    
        function slideReady(e) {
            e.preventDefault();
            clicked = 1;
            window.addEventListener('mousemove', slideMove);
            window.addEventListener('touchmove', slideMove);
        }
        function slideFinish() {
            clicked = 0;
        }
    
        function slideMove(e) {
            let pos;
            if (clicked == 0) return false;
            pos = getCursorPos(e);
            if (pos < 0) pos = 0;
            if (pos > w) pos = w;
            slide(pos);
        }
    
        function getCursorPos(e) {
            let a,
            x = 0;
            e = e.changedTouches ? e.changedTouches[0] : e;
            a = img.getBoundingClientRect();
            x = e.pageX - a.left;
            x = x - window.pageXOffset;
            return x;
        }
        function slide(x) {
            img.style.width = x + 'px';
            lineTop.style.left = (img.clientWidth - lineTop.clientWidth / 2) / w * 100 + '%';
            sliderRound.style.left = (img.clientWidth - (sliderRound.clientWidth) / 2 - lineTop.clientWidth) / w * 100 + '%';
            lineBottom.style.left = (img.clientWidth - lineBottom.clientWidth / 2) / w * 100 + '%';
        }
    }
}