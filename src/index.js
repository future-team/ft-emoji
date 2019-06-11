import EmojiContent from './template/emojicontent.html'
import EmojiContainer from './template/emojicontainer.html'
import {addClass,removeClass,hasClass} from './utils/class-operation.js'
import {strToDom} from './utils/dom.js'
import '../css/index.less'

var emojiConfig=require('./emoji.json')
class Emoji{
    constructor(){
        let emoji = emojiConfig.emoji
        this.packageLabelMap={}
        this.emojiLabelMap={}
        emoji.forEach((pac,index)=>{
            let entry=pac.entry,
                emjList=pac.list,
                {packageLabelMap,emojiLabelMap}=this,
                curEmojiLabelMap={}
                emjList.forEach((emj,emjIndex)=>{
                    emj.index=emjIndex
                    curEmojiLabelMap[emj.label]=emjIndex
                })
                packageLabelMap[entry.label]=index
                emojiLabelMap[index]=curEmojiLabelMap
        })
    }
    init(opts={}){
        let emoji = emojiConfig.emoji,
            emojiId=new Date()-0+parseInt(Math.random()*1000,10),
            entryList=emoji.map(config=>config.entry),
            $emojiContainer=strToDom(EmojiContainer({
                app:(opts.type=='app'?true:false),
                emojiId,
                entryList}))
        this.$triggerEle=document.getElementById(opts.containerId)
        this.emojiId=emojiId
        this.$triggerEle.appendChild($emojiContainer)
        this.$emojiContainer=$emojiContainer
        this.$emojiContent=document.querySelector(`#emojiContainer${emojiId} .emoji-content`)
        this.emojiClickCallback=opts.emojiClickCallback||function(){}
        this.bindListener()
        this.activeEmojiPackage(0)
        if(opts.type=='app'){
            addClass(this.$emojiContainer,'show')
        }
    }
    activeEmojiPackage(activeIndex){
        let emojiId=this.emojiId,
            perActiveIndex=this.activeIndex
        if(perActiveIndex!==undefined){
            let $activeTabItem=document.querySelector(`#emojiContainer${emojiId} .tabbar-item[data-entry="${perActiveIndex}"]`)
            removeClass($activeTabItem,'active')
        }
        this.activeIndex=activeIndex
        let $tabItem=document.querySelector(`#emojiContainer${emojiId} .tabbar-item[data-entry="${activeIndex}"]`)
        addClass($tabItem,'active')
        let emoji = emojiConfig.emoji,
            activeEmojiPackage=emoji[activeIndex],
            activeEmojiList=activeEmojiPackage.list,
            activeEmojiEntry=activeEmojiPackage.entry
        this.renderEmojiContent(activeEmojiEntry,activeEmojiList)
    }
    changeEmojiPackage(e){
        e.stopPropagation()
        let target=e.target
            if(!hasClass(target,'tabbar-item')){
                target=target.parentElement
            }
        let packageIndex=target.dataset.entry
        this.activeEmojiPackage(packageIndex)
    }
    emojiClick(e){
        e.stopPropagation()
        let target=e.target,
            dataset=target.dataset,
            result=(dataset.paclabel==""?`[${dataset.label}]`:`[${dataset.paclabel}_${dataset.label}]`)
        this.emojiClickCallback(result)
    }
    close(){
        this.openStatus=false
        removeClass(this.$emojiContainer,'show')
    }
    parse(str=""){ 
        let {packageLabelMap,emojiLabelMap}=this
        return str.replace(/\[(.*?)\]/g, function(a, b){
            let arr=b.split('_'),
                pacIndex=0,
                emjIndex=0
            if(arr.length==2){
                pacIndex=packageLabelMap[arr[0]]
            }
            if(pacIndex===undefined){
                return  `[${b}]`
            }
            emjIndex=emojiLabelMap[pacIndex][arr.pop()]
            if(emjIndex===undefined){
                return  `[${b}]`
            }
            return `<i class="emoji-icon emoji-icon-${pacIndex} emoji-icon-${pacIndex}-${emjIndex}"></i>`;
        })
    }
}
export default Emoji