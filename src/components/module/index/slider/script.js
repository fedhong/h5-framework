import createComponent from '../../../../framework/createComponent';
import tpl from './dom.html';
import style from './style.less';

const List = (props) => {
    const data = {
        
    }

    let curPage = 1;
    let limit = 100;
    let startOffset = 0;

    let canMove = false;
    let startX;
    let moveObj;

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
            const offset = transform != 'none' ? +transform.split(',')[4] : 0;
            startOffset = offset;

            const touches = e.touches ? e.touches[0] : e;
            startX = touches.clientX - offset;

            moveObj.style.transition = '';
        },
        touchmove: function (e) {
            if (canMove) {
                const touches = e.touches ? e.touches[0] : e;
                let l = touches.clientX - startX;
                //TODO 边界判断
                moveObj.style.transform = `translateX(${l}px)`;
            }
        },
        touchend: function (e) {
            canMove = false;
            document.removeEventListener("touchmove", defaultEvent, false);


            const transform = window.getComputedStyle(moveObj).transform;
            const offset = transform != 'none' ? +transform.split(',')[4] : 0;
            console.log(startOffset);
            console.log(offset);
            
            if (Math.abs(offset - startOffset) > limit) {
                if (offset < startOffset && curPage < 4) {//TODO 3页（总页数计算）
                    curPage = curPage + 1;
                }
                if (offset > startOffset && curPage > 1) {
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

export default List;