'use strict';

exports.__esModule = true;

require('../css/index.less');

var show = function show() {
    alert('demo test');
};
window.show = show;
exports['default'] = show;
module.exports = exports['default'];