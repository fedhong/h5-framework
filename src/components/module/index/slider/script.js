import createComponent from '../../../../framework/createComponent';
import tpl from './dom.html';
import style from './style.less';

const Slider = (props) => {
    const data = {

    }

    let curPage = 1;
    let limit = 100;
    let startTranslateX = 0;
    let endTranslateX = 0;

    let canMove = false;
    let moveObj;
    let offsetX;
    let startX;

    function defaultEvent(e) {
        e.preventDefault();
    }

    const events = {
        touchstart: function (e) {

            if (!moveObj) {
                moveObj = document.getElementById('divMoveObj');
            }

            canMove = true;
            //阻止页面的滑动默认事件
            document.addEventListener("touchmove", defaultEvent, false);

            const transform = window.getComputedStyle(moveObj).transform;
            startTranslateX = transform != 'none' ? +transform.split(',')[4] : 0;

            const touches = e.touches ? e.touches[0] : e;
            offsetX = touches.clientX - startTranslateX;
            startX = touches.clientX;

            moveObj.style.transition = '';
        },
        touchmove: function (e) {
            if (canMove) {
                const touches = e.touches ? e.touches[0] : e;
                endTranslateX = touches.clientX - offsetX;

                if (touches.clientX > startX && curPage === 1) {
                    //向右滑
                    return;
                } else if (touches.clientX < startX && curPage === 4) {
                    //向左滑
                    return;
                }

                moveObj.style.transform = `translateX(${endTranslateX}px)`;
            }
        },
        touchend: function (e) {
            canMove = false;
            document.removeEventListener("touchmove", defaultEvent, false);

            if (Math.abs(endTranslateX - startTranslateX) > limit) {
                if (endTranslateX < startTranslateX && curPage < 4) {//TODO 总页数计算
                    curPage = curPage + 1;
                }
                if (endTranslateX > startTranslateX && curPage > 1) {
                    curPage = curPage - 1;
                }
            }

            moveObj.style.transform = `translateX(-${100 * curPage - 100}vw)`;
            moveObj.style.transition = "transform 0.5s ease-in-out";
        }
    };

    const component = createComponent(tpl, { data, style }, events);
    return component;
}

export default Slider;