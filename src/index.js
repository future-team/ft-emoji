import EmojiContent from './template/emojicontent.html'
import EmojiContainer from './template/emojiContainer.html'

import '../css/index.less'

function strToDom(htmlStr){
    var wrapper= document.createElement('div');
    wrapper.innerHTML= htmlStr;
    return wrapper.firstChild;
}
class Emoji{
    init(){
        let emojiList = [[{
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
        }]]
        let emojiContent=EmojiContent({
            emojiList:emojiList[0]
        })
        let emojiId=new Date()-0+parseInt(Math.random()*1000,10)
        let $emojiContainer=strToDom(EmojiContainer({emojiId}))
        document.body.appendChild($emojiContainer)
        let $emojiList=document.querySelector(`#emojiContainer${emojiId} .emoji-list`)
        $emojiList.innerHTML+=emojiContent
    }
}
export default Emoji