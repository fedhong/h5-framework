import createComponent from '@framework/createComponent';
import Header from '@components/common/header/script';
import Move from '@components/module/profile/move/script'
import Footer from '@components/common/footer/script';
import createCookie from '@framework/createCookie';

import tpl from './dom.html';
import style from './style.less';

const Cookie = createCookie();
Cookie.set('test', { "a": "aaaa", "b": 1232 });
console.log(Cookie.get('test'));

const header = Header({ data: { name: 'Fedhong' } });
const footer = Footer();

const Profile = (props) => {
    const data = {
        header,
        move: Move(),
        footer,
    };
    const events = {};
    const component = createComponent(tpl, { data, style }, events);

    return component;
}

export default Profile;