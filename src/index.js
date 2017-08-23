import EmojiContent from './template/emojicontent.html'
import EmojiContainer from './template/emojiContainer.html'
import '../css/index.less'
import Delegate from './utils/delegate.js';

var emojiConfig=require('./emoji.json')
function strToDom(htmlStr){
    var wrapper= document.createElement('div');
    wrapper.innerHTML= htmlStr;
    return wrapper.firstChild;
}
class Emoji{
    init(){
        console.log(emojiConfig)
        let activeIndex=3,
            emoji = emojiConfig.emoji,
            activeEmojiPackage=emoji[activeIndex],
            activeEmojiList=activeEmojiPackage.list,
            activeEmojiEntry=activeEmojiPackage.entry,
            emojiContent=EmojiContent({
                entry:activeEmojiEntry,
                emojiList:activeEmojiList
            }),
            emojiId=new Date()-0+parseInt(Math.random()*1000,10),
            entryList=emoji.map(config=>config.entry),
            $emojiContainer=strToDom(EmojiContainer({
                emojiId,
                entryList}))
        this.emojiId=emojiId
        document.body.appendChild($emojiContainer)
        let $emojiList=document.querySelector(`#emojiContainer${emojiId} .emoji-list`)
        this.$emojiList=$emojiList
        $emojiList.innerHTML+=emojiContent
        this.bindListener()
    }
    changeEmojiPackage(e){
        console.log(e)
    }
    bindListener(){
        let _this=this,
            $container=document.getElementById('emojiContainer'+this.emojiId),
            delegate=new Delegate($container)
        delegate.on('click','.tabbar-item',this.changeEmojiPackage)
    }
}
export default Emoji