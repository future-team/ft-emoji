import EmojiContent from './template/emojicontent.html'
import EmojiContainer from './template/emojiContainer.html'
import '../css/index.less'
import Delegate from './utils/delegate.js';
import {addClass,removeClass,hasClass} from './utils/class-operation.js';

var emojiConfig=require('./emoji.json')
function strToDom(htmlStr){
    var wrapper= document.createElement('div');
    wrapper.innerHTML= htmlStr;
    return wrapper.firstChild;
}
class Emoji{
    getDimension( el ) {
        var elemRect = el.getBoundingClientRect()
        return {
            top:elemRect.top+ window.scrollY,
            left: elemRect.left+ window.scrollX,
            width:el.clientWidth,
            height:el.clientHeight
        }
    }
    init(opts={}){
        console.log(emojiConfig)
        let emoji = emojiConfig.emoji,
            emojiId=new Date()-0+parseInt(Math.random()*1000,10),
            entryList=emoji.map(config=>config.entry),
            $emojiContainer=strToDom(EmojiContainer({
                emojiId,
                entryList}))
        this.$triggerEle=document.getElementById(opts.triggerEle)
        this.emojiId=emojiId
        this.$triggerEle.appendChild($emojiContainer)
        this.$emojiContainer=$emojiContainer
        this.$emojiContent=document.querySelector(`#emojiContainer${emojiId} .emoji-content`)
        this.emojiClickCallback=opts.emojiClickCallback||function(){}
        this.packageLabelMap={}
        this.emojiLabelMap={}
        emoji.forEach((pac,index)=>{
            let entry=pac.entry,
                emjList=pac.list,
                {packageLabelMap,emojiLabelMap}=this,
                curEmojiLabelMap={}
                emjList.forEach((emj,emjIndex)=>{
                    curEmojiLabelMap[emj.label]=emjIndex
                })
                packageLabelMap[entry.label]=index
                emojiLabelMap[index]=curEmojiLabelMap
        })
        this.bindListener()
        this.activeEmojiPackage(0)
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
            activeEmojiEntry=activeEmojiPackage.entry,
            emojiContent=EmojiContent({
                entry:activeEmojiEntry,
                emojiList:activeEmojiList
            })
        let $emojiList=document.querySelector(`#emojiContainer${emojiId} .emoji-list`)
        $emojiList.innerHTML=emojiContent
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
            emjIndex=emojiLabelMap[pacIndex][arr.pop()]
            console.log(pacIndex,emjIndex)
            return `<i class="emoji-icon emoji-icon-${pacIndex} emoji-icon-${pacIndex}-${emjIndex}"></i>`;
        })
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
        let triggerEleDim=this.getDimension($triggerEle),
            triggerELeOffsetX=triggerEleDim.left+triggerEleDim.width/2
        console.log(triggerEleDim)
        // let emojiContentLeft=triggerELeOffsetX-emojiContentWidth/2
        // if(emojiContentLeft<0){
        //     emojiContentLeft=0
        // }
        // let body = document.body,
        //     html = document.documentElement;

        // let docHeight = Math.max( body.scrollHeight, body.offsetHeight, 
        //                html.clientHeight, html.scrollHeight, html.offsetHeight ),
        //     emojiContentBottom=docHeight-triggerEleDim.top+10
        emojiContentStyle.bottom=triggerEleDim.height+15+'px'
        emojiContentStyle.left=(triggerEleDim.width-emojiContentWidth)/2+'px'
        addClass(this.$emojiContainer,'show')
    }
}
export default Emoji