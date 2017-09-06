'use strict';

exports.__esModule = true;
exports.strToDom = strToDom;
exports.emptyNode = emptyNode;

function strToDom(htmlStr) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = htmlStr;
    return wrapper.firstChild;
}

function emptyNode(node) {
    while (node.firstChild) {
        node.removeChild(node.firstChild);
    }
}