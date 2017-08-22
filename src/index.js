import EmojiContent from './template/emojicontent.html'
import EmojiContainer from './template/emojiContainer.html'
import '../css/index.less'

var emojiConfig=require('./emoji.json')
function strToDom(htmlStr){
    var wrapper= document.createElement('div');
    wrapper.innerHTML= htmlStr;
    return wrapper.firstChild;
}
class Emoji{
    init(){
        console.log(emojiConfig)
        let activeIndex=0,
            emoji = emojiConfig.emoji,
            activeEmojiPackage=emoji[activeIndex],
            activeEmojiList=activeEmojiPackage.list,
            activeEmojiEntry=activeEmojiPackage.entry,
            emojiContent=EmojiContent({
                entry:activeEmojiEntry,
                emojiList:activeEmojiList
            })
        let emojiId=new Date()-0+parseInt(Math.random()*1000,10)
        let $emojiContainer=strToDom(EmojiContainer({emojiId}))
        document.body.appendChild($emojiContainer)
        let $emojiList=document.querySelector(`#emojiContainer${emojiId} .emoji-list`)
        $emojiList.innerHTML+=emojiContent
    }
}
export default Emoji