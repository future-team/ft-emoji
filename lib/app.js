'use strict';

exports.__esModule = true;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _indexJs = require('./index.js');

var _indexJs2 = _interopRequireDefault(_indexJs);

require('../css/app.less');

var _utilsDelegateJs = require('./utils/delegate.js');

var _utilsDelegateJs2 = _interopRequireDefault(_utilsDelegateJs);

var _utilsClassOperationJs = require('./utils/class-operation.js');

var _utilsDomJs = require('./utils/dom.js');

var _templateEmojicontentHtml = require('./template/emojicontent.html');

var _templateEmojicontentHtml2 = _interopRequireDefault(_templateEmojicontentHtml);

var swiper = require('./swiper/swiper.min.js');

var Emoji = (function (_EmojiBase) {
    _inherits(Emoji, _EmojiBase);

    function Emoji() {
        _classCallCheck(this, Emoji);

        _EmojiBase.apply(this, arguments);
    }

    Emoji.prototype.generateSwiper = function generateSwiper(entry, list, pageSize) {
        var pageTotalNum = Math.ceil(list.length / pageSize),
            contentList = [];
        for (var pageNo = 0; pageNo < pageTotalNum; pageNo++) {
            var arr = [];
            for (var index = pageNo * pageSize; index < (pageNo + 1) * pageSize; index++) {
                if (index == list.length) {
                    break;
                }
                arr.push(list[index]);
            }
            contentList.push(_templateEmojicontentHtml2['default']({
                entry: entry,
                emojiList: arr
            }));
        }
        var domStr = '<div class=\'swiper-container\'>\n                <div class="swiper-wrapper">\n                    ' + contentList.map(function (cont) {
            return '<div class="swiper-slide"><div class="emj-padding-wrapper">' + cont + '</div></div>';
        }).join('') + '\n                </div>\n            <div class="swiper-pagination"></div>\n       </div>';
        return _utilsDomJs.strToDom(domStr);
    };

    Emoji.prototype.renderEmojiContent = function renderEmojiContent(entry, list) {
        var emojiId = this.emojiId,
            $container = document.querySelector('#emojiContainer' + emojiId + ' .emoji-list'),
            emojiPageNo = entry.prefix == 0 ? 24 : 8,
            $listContent = this.generateSwiper(entry, list, emojiPageNo);
        _utilsDomJs.emptyNode($container);
        $container.appendChild($listContent);
        setTimeout(function () {
            var mySwiper = new Swiper('#emojiContainer' + emojiId + ' .emoji-list .swiper-container', {
                pagination: '.swiper-pagination',
                paginationClickable: 'true'
            });
        }, 0);
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
    };

    return Emoji;
})(_indexJs2['default']);

exports['default'] = Emoji;
module.exports = exports['default'];