import EmojiBase from './index.js'
import Delegate from './utils/delegate.js'
import {addClass,removeClass,hasClass} from './utils/class-operation.js'
import EmojiContent from './template/emojicontent.html'
import {emptyNode} from './utils/dom.js'
class Emoji extends EmojiBase{
    getDimension( el ) {
        var elemRect = el.getBoundingClientRect()
        return {
            top:elemRect.top+ window.scrollY,
            left: elemRect.left+ window.scrollX,
            width:el.clientWidth,
            height:el.clientHeight
        }
    }
    bindListener(){
        let _this=this,
            $container=document.getElementById('emojiContainer'+this.emojiId),
            delegate=new Delegate($container)
        delegate.on('click','.tabbar-item',this.changeEmojiPackage.bind(this))
        delegate.on('click','.emoji-icon',this.emojiClick.bind(this))
        delegate.on('click','.emoji-content',function(e){e.stopPropagation()})
        document.addEventListener('click',function(e){
            if(_this.openStatus&&e.target!==_this.$triggerEle){
                _this.close()
            }
        })
    }
    renderEmojiContent(entry,list){
        let emojiId=this.emojiId,
            $container=document.querySelector(`#emojiContainer${emojiId} .emoji-list`),
            contentStr=EmojiContent({
                entry,
                emojiList:list
            })
        emptyNode($container)
        $container.innerHTML=contentStr
    }
    open(){
        let $triggerEle=this.$triggerEle,
            $emojiContent=this.$emojiContent,
            emojiContentWidth=384,
            emojiContentStyle=$emojiContent.style
        this.openStatus=true
        if(!$triggerEle){
            return
        }
        let triggerEleDim=this.getDimension($triggerEle)
        emojiContentStyle.bottom=triggerEleDim.height+15+'px'
        emojiContentStyle.left=(triggerEleDim.width-emojiContentWidth)/2+'px'
        addClass(this.$emojiContainer,'show')
    }
}
export default Emoji