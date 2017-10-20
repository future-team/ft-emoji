import EmojiBase from './index.js'
import '../css/app.less'
import Delegate from './utils/delegate.js'
import {addClass,removeClass,hasClass} from './utils/class-operation.js'
import {emptyNode,strToDom} from './utils/dom.js'
import EmojiContent from './template/emojicontent.html'
var swiper=require ('./swiper/swiper.min.js')
class Emoji extends EmojiBase{
    generateSwiper(entry,list,pageSize){
        let pageTotalNum=Math.ceil(list.length/pageSize),
            contentList=[]
        for(let pageNo=0;pageNo<pageTotalNum;pageNo++){
            let arr=[]
            for(let index=pageNo*pageSize;index<(pageNo+1)*pageSize;index++){
                if(index==list.length){
                    break;
                }
                arr.push(list[index])
            }
            contentList.push(EmojiContent({
                entry,
                emojiList:arr
            }))
        }
        let domStr=  `<div class='swiper-container'>
                <div class="swiper-wrapper">
                    ${
                        contentList.map(cont=>`<div class="swiper-slide"><div class="emj-padding-wrapper">${cont}</div></div>`).join('')
                    }
                </div>
            <div class="swiper-pagination"></div>
       </div>`      
        return strToDom(domStr)
    }
    renderEmojiContent(entry,list){
        let emojiId=this.emojiId,
            $container=document.querySelector(`#emojiContainer${emojiId} .emoji-list`),
            emojiPageNo=entry.prefix==0?24:8,
            $listContent=this.generateSwiper(entry,list,emojiPageNo)
        emptyNode($container)
        $container.appendChild($listContent)
        setTimeout(()=>{
            var mySwiper = new Swiper (`#emojiContainer${emojiId} .emoji-list .swiper-container`, {
                pagination: '.swiper-pagination',
                paginationClickable:'true'
            })  
       },0)
    }
    bindListener(){
        let _this=this,
            $container=document.getElementById('emojiContainer'+this.emojiId),
            delegate=new Delegate($container)
        delegate.on('click','.tabbar-item',this.changeEmojiPackage.bind(this))
        delegate.on('click','.emoji-icon',this.emojiClick.bind(this))
        delegate.on('click','.emoji-content',function(e){e.stopPropagation()})
    }
}
export default Emoji