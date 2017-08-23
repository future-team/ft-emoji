'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _templateEmojicontentHtml = require('./template/emojicontent.html');

var _templateEmojicontentHtml2 = _interopRequireDefault(_templateEmojicontentHtml);

var _templateEmojiContainerHtml = require('./template/emojiContainer.html');

var _templateEmojiContainerHtml2 = _interopRequireDefault(_templateEmojiContainerHtml);

require('../css/index.less');

var _utilsDelegateJs = require('./utils/delegate.js');

var _utilsDelegateJs2 = _interopRequireDefault(_utilsDelegateJs);

var emojiConfig = require('./emoji.json');
function strToDom(htmlStr) {
    var wrapper = document.createElement('div');
    wrapper.innerHTML = htmlStr;
    return wrapper.firstChild;
}

var Emoji = (function () {
    function Emoji() {
        _classCallCheck(this, Emoji);
    }

    Emoji.prototype.init = function init() {
        console.log(emojiConfig);
        var activeIndex = 1,
            emoji = emojiConfig.emoji,
            activeEmojiPackage = emoji[activeIndex],
            activeEmojiList = activeEmojiPackage.list,
            activeEmojiEntry = activeEmojiPackage.entry,
            emojiContent = _templateEmojicontentHtml2['default']({
            entry: activeEmojiEntry,
            emojiList: activeEmojiList
        }),
            emojiId = new Date() - 0 + parseInt(Math.random() * 1000, 10),
            entryList = emoji.map(function (config) {
            return config.entry;
        }),
            $emojiContainer = strToDom(_templateEmojiContainerHtml2['default']({
            emojiId: emojiId,
            entryList: entryList }));
        this.emojiId = emojiId;
        document.body.appendChild($emojiContainer);
        var $emojiList = document.querySelector('#emojiContainer' + emojiId + ' .emoji-list');
        this.$emojiList = $emojiList;
        $emojiList.innerHTML += emojiContent;
        this.bindListener();
    };

    Emoji.prototype.changeEmojiPackage = function changeEmojiPackage(e) {
        console.log(e);
    };

    Emoji.prototype.bindListener = function bindListener() {
        var _this = this,
            $container = document.getElementById('emojiContainer' + this.emojiId),
            delegate = new _utilsDelegateJs2['default']($container);
        delegate.on('click', '.tabbar-item', this.changeEmojiPackage);
    };

    return Emoji;
})();

exports['default'] = Emoji;
module.exports = exports['default'];