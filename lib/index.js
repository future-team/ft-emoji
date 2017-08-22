'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _templateEmojicontentHtml = require('./template/emojicontent.html');

var _templateEmojicontentHtml2 = _interopRequireDefault(_templateEmojicontentHtml);


var Emoji = (function () {
    function Emoji() {
        _classCallCheck(this, Emoji);
    }

    Emoji.prototype.init = function init() {
        var emojiList = [[{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        },{
            title: '撇嘴',
            'class': '0-piezui'
        }, {
            title: '微笑',
            'class': '0-weixiao'
        }]];
        var $emojiContent = _templateEmojicontentHtml2['default']({
            emojiList: emojiList[0]
        });
        document.body.innerHTML += $emojiContent;
    };

    return Emoji;
})();

exports['default'] = Emoji;
module.exports = exports['default'];