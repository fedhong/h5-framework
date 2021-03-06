const createRouter = (config) => {
    let begin = Date.now();
    Object.keys(config).forEach((key, i) => {
        const container = document.getElementById(key);
        if (container) {
            container.innerHTML = config[key];
            container.style.display = 'none';
        }
    })

    function initHash() {
        let curKey = location.hash.replace('#', '');
        curKey = curKey || 'index';

        Object.keys(config).forEach((key, i) => {
            const container = document.getElementById(key);
            if (container) {
                if (curKey === key) {
                    container.style.display = '';
                } else {
                    container.style.display = 'none';
                }
            }
        })
    }

    if (!window.onhashchange) {
        window.onhashchange = initHash;
    }

    initHash();
    console.log(`渲染耗时：${Date.now() - begin} ms`)
};

export default createRouter