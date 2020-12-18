let _count = -1;

const createUniqueId = (type = 'id') => {

    _count++;

    const CRC_TAB = ['F', '_', 'E', 'd', 'H', 'o', 'N', 'g', 'V', '5'];
    const byte = `${_count}`.split('');
    const res = [];
    for (let i = 0, l = byte.length; i < l; i++) {
        res.push(CRC_TAB[byte[i]]);
    }

    return `${type}_${res.join('_')}`;
}

export default createUniqueId;