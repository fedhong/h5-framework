import createComponent from '../../../../framework/createComponent';
import tpl from './dom.html';
import style from './style.less';

const Move = (props) => {

    function defaultEvent(e) {
        e.preventDefault();
    }
    let canMove = false;
    let oW;
    let oH;

    const data = {};
    const events = {
        touchstart: function (e) {
            canMove = true;
            //阻止页面的滑动默认事件
            document.addEventListener("touchmove", defaultEvent, false);

            const touches = e.touches ? e.touches[0] : e;
            oW = touches.clientX - e.target.offsetLeft;
            oH = touches.clientY - e.target.offsetTop;
        },
        touchmove: function (e) {
            if (canMove) {
                const touches = e.touches ? e.touches[0] : e;
                let oLeft = touches.clientX - oW;
                let oTop = touches.clientY - oH;
                // 边界判断
                if (oLeft < 0) {
                    oLeft = 0;
                } else if (oLeft > document.documentElement.clientWidth - e.target.offsetWidth) {
                    oLeft = (document.documentElement.clientWidth - e.target.offsetWidth);
                }
                if (oTop < 0) {
                    oTop = 0;
                } else if (oTop > document.documentElement.clientHeight - e.target.offsetHeight) {
                    oTop = (document.documentElement.clientHeight - e.target.offsetHeight);
                }
                e.target.style.left = oLeft + "px";
                e.target.style.top = oTop + "px";
            }
        },
        touchend: function (e) {
            canMove = false;
            document.removeEventListener("touchmove", defaultEvent, false);
        }
    };

    const component = createComponent(tpl, { data, style }, events);
    return component;
}

export default Move;