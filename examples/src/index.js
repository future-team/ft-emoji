import Emoji from '../../src/index.js'
var emoji=new Emoji()
emoji.init({
        triggerEle:'emojiTrigger',
        emojiClickCallback:function(str){
            console.log(str)
        }
    })
var emojiTrigger=document.getElementById('emojiTrigger')
emojiTrigger.addEventListener('click',function(){
    emoji.open()
})
var $result=document.getElementById('result')
result.innerHTML=emoji.parse('[OK][小团_OK]test[流氓兔_再见]fuck[欢乐兔_走开]')