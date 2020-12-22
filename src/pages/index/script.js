import createComponent from '@framework/createComponent';
import Header from '@components/common/header/script';
import Footer from '@components/common/footer/script';
import List from '@components/module/index/list/script'
import Slider from '@components/module/index/slider/script';
import tpl from './dom.html';

const header = Header({ data: { name: 'Fedhong' } });
const footer = Footer();
// TODO AJAX获取
const list = List({ data: [{ id: 1, name: 'AA,AAA,AA' }, { id: 2, name: 'BBBBBBBB' }, { id: 3, name: 'CCCCCCCC' }] });
const slider = Slider();

const Index = (props) => {
    const data = {
        header,
        list,
        slider,
        footer
    };

    const component = createComponent(tpl, { data });

    return component;
}

export default Index;