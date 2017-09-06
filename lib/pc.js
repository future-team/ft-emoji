'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _indexJs = require('./index.js');

var _indexJs2 = _interopRequireDefault(_indexJs);

var _utilsDelegateJs = require('./utils/delegate.js');

var _utilsDelegateJs2 = _interopRequireDefault(_utilsDelegateJs);

var _utilsClassOperationJs = require('./utils/class-operation.js');

var _templateEmojicontentHtml = require('./template/emojicontent.html');

var _templateEmojicontentHtml2 = _interopRequireDefault(_templateEmojicontentHtml);

var _utilsDomJs = require('./utils/dom.js');

var Emoji = (function (_EmojiBase) {
    _inherits(Emoji, _EmojiBase);

    function Emoji() {
        _classCallCheck(this, Emoji);

        _EmojiBase.apply(this, arguments);
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

    Emoji.prototype.renderEmojiContent = function renderEmojiContent(entry, list) {
        var emojiId = this.emojiId,
            $container = document.querySelector('#emojiContainer' + emojiId + ' .emoji-list'),
            contentStr = _templateEmojicontentHtml2['default']({
            entry: entry,
            emojiList: list
        });
        _utilsDomJs.emptyNode($container);
        $container.innerHTML = contentStr;
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
        emojiContentStyle.bottom = triggerEleDim.height + 15 + 'px';
        emojiContentStyle.left = (triggerEleDim.width - emojiContentWidth) / 2 + 'px';
        _utilsClassOperationJs.addClass(this.$emojiContainer, 'show');
    };

    return Emoji;
})(_indexJs2['default']);

exports['default'] = Emoji;
module.exports = exports['default'];