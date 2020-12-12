function _extend() {
    let i = 0;
    const result = {};
    for (; i < arguments.length; i++) {
        const attributes = arguments[i];
        for (let key in attributes) {
            result[key] = attributes[key];
        }
    }
    return result;
}

function _decode(s) {
    return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
}

function _init() {

    function api() { }

    function set(key, value, attributes) {
        if (typeof document === 'undefined') {
            return;
        }

        attributes = _extend({
            path: '/'
        }, api.defaults, attributes);

        if (typeof attributes.expires === 'number') {
            attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e+5);
        }

        attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

        try {
            const result = JSON.stringify(value);
            if (/^[\{\[]/.test(result)) {
                value = result;
            }
        } catch (e) { }

        value =
            encodeURIComponent(String(value))
                .replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);

        key = encodeURIComponent(String(key))
            .replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)
            .replace(/[\(\)]/g, escape);

        let stringifiedAttributes = '';
        for (let attributeName in attributes) {
            if (!attributes[attributeName]) {
                continue;
            }
            stringifiedAttributes += '; ' + attributeName;
            if (attributes[attributeName] === true) {
                continue;
            }

            stringifiedAttributes += '=' + attributes[attributeName].split(';')[0];
        }

        return (document.cookie = key + '=' + value + stringifiedAttributes);
    }

    function get(key, json) {
        if (typeof document === 'undefined') {
            return;
        }

        const jar = {};
        const cookies = document.cookie ? document.cookie.split('; ') : [];
        let i = 0;

        for (; i < cookies.length; i++) {
            const parts = cookies[i].split('=');
            let cookie = parts.slice(1).join('=');

            if (!json && cookie.charAt(0) === '"') {
                cookie = cookie.slice(1, -1);
            }

            try {
                const name = _decode(parts[0]);
                cookie = _decode(cookie);

                if (json) {
                    try {
                        cookie = JSON.parse(cookie);
                    } catch (e) { }
                }

                jar[name] = cookie;

                if (key === name) {
                    break;
                }
            } catch (e) { }
        }

        return key ? jar[key] : jar;
    }

    api.set = set;
    api.get = function (key) {
        return get(key, false /* read as raw */);
    };
    api.getJSON = function (key) {
        return get(key, true /* read as json */);
    };
    api.remove = function (key, attributes) {
        set(key, '', _extend(attributes, {
            expires: -1
        }));
    };

    api.defaults = {};

    return api;
}

const createCookie = () => {
    return _init();
}

export default createCookie;