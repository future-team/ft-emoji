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

var _utilsClassOperationJs = require('./utils/class-operation.js');

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

    Emoji.prototype.getDimension = function getDimension(el) {
        var elemRect = el.getBoundingClientRect();
        return {
            top: elemRect.top + window.scrollY,
            left: elemRect.left + window.scrollX,
            width: el.clientWidth,
            height: el.clientHeight
        };
    };

    Emoji.prototype.init = function init() {
        var _this2 = this;

        var opts = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

        console.log(emojiConfig);
        var emoji = emojiConfig.emoji,
            emojiId = new Date() - 0 + parseInt(Math.random() * 1000, 10),
            entryList = emoji.map(function (config) {
            return config.entry;
        }),
            $emojiContainer = strToDom(_templateEmojiContainerHtml2['default']({
            emojiId: emojiId,
            entryList: entryList }));
        this.$triggerEle = document.getElementById(opts.triggerEle);
        this.emojiId = emojiId;
        this.$triggerEle.appendChild($emojiContainer);
        this.$emojiContainer = $emojiContainer;
        this.$emojiContent = document.querySelector('#emojiContainer' + emojiId + ' .emoji-content');
        this.emojiClickCallback = opts.emojiClickCallback || function () {};
        this.packageLabelMap = {};
        this.emojiLabelMap = {};
        emoji.forEach(function (pac, index) {
            var entry = pac.entry;
            var emjList = pac.list;
            var packageLabelMap = _this2.packageLabelMap;
            var emojiLabelMap = _this2.emojiLabelMap;
            var curEmojiLabelMap = {};
            emjList.forEach(function (emj, emjIndex) {
                curEmojiLabelMap[emj.label] = emjIndex;
            });
            packageLabelMap[entry.label] = index;
            emojiLabelMap[index] = curEmojiLabelMap;
        });
        this.bindListener();
        this.activeEmojiPackage(0);
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
            activeEmojiEntry = activeEmojiPackage.entry,
            emojiContent = _templateEmojicontentHtml2['default']({
            entry: activeEmojiEntry,
            emojiList: activeEmojiList
        });
        var $emojiList = document.querySelector('#emojiContainer' + emojiId + ' .emoji-list');
        $emojiList.innerHTML = emojiContent;
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

    Emoji.prototype.bindListener = function bindListener() {
        var _this = this,
            $container = document.getElementById('emojiContainer' + this.emojiId),
            delegate = new _utilsDelegateJs2['default']($container);
        delegate.on('click', '.tabbar-item', this.changeEmojiPackage.bind(this));
        delegate.on('click', '.emoji-icon', this.emojiClick.bind(this));
        delegate.on('click', '.emoji-content', function (e) {
            e.stopPropagation();
        });
        document.addEventListener('click', function (e) {
            if (_this.openStatus && e.target !== _this.$triggerEle) {
                _this.close();
            }
        });
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
            emjIndex = emojiLabelMap[pacIndex][arr.pop()];
            console.log(pacIndex, emjIndex);
            return '<i class="emoji-icon emoji-icon-' + pacIndex + ' emoji-icon-' + pacIndex + '-' + emjIndex + '"></i>';
        });
    };

    Emoji.prototype.open = function open() {
        var $triggerEle = this.$triggerEle,
            $emojiContent = this.$emojiContent,
            emojiContentWidth = 384,
            emojiContentStyle = $emojiContent.style;
        this.openStatus = true;
        if (!$triggerEle) {
            return;
        }
        var triggerEleDim = this.getDimension($triggerEle);
        console.log(triggerEleDim);
        // let emojiContentLeft=triggerELeOffsetX-emojiContentWidth/2
        // if(emojiContentLeft<0){
        //     emojiContentLeft=0
        // }
        // let body = document.body,
        //     html = document.documentElement;

        // let docHeight = Math.max( body.scrollHeight, body.offsetHeight,
        //                html.clientHeight, html.scrollHeight, html.offsetHeight ),
        //     emojiContentBottom=docHeight-triggerEleDim.top+10
        emojiContentStyle.bottom = triggerEleDim.height + 15 + 'px';
        emojiContentStyle.left = (triggerEleDim.width - emojiContentWidth) / 2 + 'px';
        _utilsClassOperationJs.addClass(this.$emojiContainer, 'show');
    };

    return Emoji;
})();

exports['default'] = Emoji;
module.exports = exports['default'];