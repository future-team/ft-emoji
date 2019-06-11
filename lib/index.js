'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _templateEmojicontentHtml = require('./template/emojicontent.html');

var _templateEmojicontentHtml2 = _interopRequireDefault(_templateEmojicontentHtml);

var _templateEmojicontainerHtml = require('./template/emojicontainer.html');

var _templateEmojicontainerHtml2 = _interopRequireDefault(_templateEmojicontainerHtml);

var _utilsClassOperationJs = require('./utils/class-operation.js');

var _utilsDomJs = require('./utils/dom.js');

require('../css/index.less');

var emojiConfig = require('./emoji.json');

var Emoji = (function () {
    function Emoji() {
        var _this = this;

        _classCallCheck(this, Emoji);

        var emoji = emojiConfig.emoji;
        this.packageLabelMap = {};
        this.emojiLabelMap = {};
        emoji.forEach(function (pac, index) {
            var entry = pac.entry;
            var emjList = pac.list;
            var packageLabelMap = _this.packageLabelMap;
            var emojiLabelMap = _this.emojiLabelMap;
            var curEmojiLabelMap = {};
            emjList.forEach(function (emj, emjIndex) {
                emj.index = emjIndex;
                curEmojiLabelMap[emj.label] = emjIndex;
            });
            packageLabelMap[entry.label] = index;
            emojiLabelMap[index] = curEmojiLabelMap;
        });
    }

    Emoji.prototype.init = function init() {
        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        var emoji = emojiConfig.emoji,
            emojiId = new Date() - 0 + parseInt(Math.random() * 1000, 10),
            entryList = emoji.map(function (config) {
            return config.entry;
        }),
            $emojiContainer = _utilsDomJs.strToDom(_templateEmojicontainerHtml2['default']({
            app: opts.type == 'app' ? true : false,
            emojiId: emojiId,
            entryList: entryList }));
        this.$triggerEle = document.getElementById(opts.containerId);
        this.emojiId = emojiId;
        this.$triggerEle.appendChild($emojiContainer);
        this.$emojiContainer = $emojiContainer;
        this.$emojiContent = document.querySelector('#emojiContainer' + emojiId + ' .emoji-content');
        this.emojiClickCallback = opts.emojiClickCallback || function () {};
        this.bindListener();
        this.activeEmojiPackage(0);
        if (opts.type == 'app') {
            _utilsClassOperationJs.addClass(this.$emojiContainer, 'show');
        }
    };

    Emoji.prototype.activeEmojiPackage = function activeEmojiPackage(activeIndex) {
        var emojiId = this.emojiId,
            perActiveIndex = this.activeIndex;
        if (perActiveIndex !== undefined) {
            var $activeTabItem = document.querySelector('#emojiContainer' + emojiId + ' .tabbar-item[data-entry="' + perActiveIndex + '"]');
            _utilsClassOperationJs.removeClass($activeTabItem, 'active');
        }
        this.activeIndex = activeIndex;
        var $tabItem = document.querySelector('#emojiContainer' + emojiId + ' .tabbar-item[data-entry="' + activeIndex + '"]');
        _utilsClassOperationJs.addClass($tabItem, 'active');
        var emoji = emojiConfig.emoji,
            activeEmojiPackage = emoji[activeIndex],
            activeEmojiList = activeEmojiPackage.list,
            activeEmojiEntry = activeEmojiPackage.entry;
        this.renderEmojiContent(activeEmojiEntry, activeEmojiList);
    };

    Emoji.prototype.changeEmojiPackage = function changeEmojiPackage(e) {
        e.stopPropagation();
        var target = e.target;
        if (!_utilsClassOperationJs.hasClass(target, 'tabbar-item')) {
            target = target.parentElement;
        }
        var packageIndex = target.dataset.entry;
        this.activeEmojiPackage(packageIndex);
    };

    Emoji.prototype.emojiClick = function emojiClick(e) {
        e.stopPropagation();
        var target = e.target,
            dataset = target.dataset,
            result = dataset.paclabel == "" ? '[' + dataset.label + ']' : '[' + dataset.paclabel + '_' + dataset.label + ']';
        this.emojiClickCallback(result);
    };

    Emoji.prototype.close = function close() {
        this.openStatus = false;
        _utilsClassOperationJs.removeClass(this.$emojiContainer, 'show');
    };

    Emoji.prototype.parse = function parse() {
        var str = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
        var packageLabelMap = this.packageLabelMap;
        var emojiLabelMap = this.emojiLabelMap;

        return str.replace(/\[(.*?)\]/g, function (a, b) {
            var arr = b.split('_'),
                pacIndex = 0,
                emjIndex = 0;
            if (arr.length == 2) {
                pacIndex = packageLabelMap[arr[0]];
            }
            if (pacIndex === undefined) {
                return '[' + b + ']';
            }
            emjIndex = emojiLabelMap[pacIndex][arr.pop()];
            if (emjIndex === undefined) {
                return '[' + b + ']';
            }
            return '<i class="emoji-icon emoji-icon-' + pacIndex + ' emoji-icon-' + pacIndex + '-' + emjIndex + '"></i>';
        });
    };

    return Emoji;
})();

exports['default'] = Emoji;
module.exports = exports['default'];