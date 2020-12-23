import createComponent from '@framework/createComponent';
import createUniqueId from '@framework/createUniqueId';
import tpl from './dom.html';
import style from './style.less';

const Toast = (props) => {
    const toastBoxId = createUniqueId()

    const { message, time = 3000 } = props

    const data = {
        toastBoxId,
        message: message || ''
    }

    const events = {};

    let toastBox;

    if (!toastBox) {
        const component = createComponent(tpl, { data, style }, events);
        document.body.insertAdjacentHTML('afterbegin', component);
    } else {
        toastBox.style.opacity = 1;
        toastBox.style.display = 'flex';
    }

    setTimeout(() => {
        toastBox = !toastBox ? document.getElementById(toastBoxId) : toastBox
        toastBox.style.opacity = 0;
        setTimeout(() => {
            toastBox.style.display = 'none'
        }, 500)
    }, time)
}

export default Toast;