import Emoji from '../../src/app.js'
import PCEmoji from '../../src/pc.js'

var emoji=new Emoji()
emoji.init({
        containerId:'emojiContainer',
        type:'app',
        emojiClickCallback:function(str){
            console.log(str)
        }
    })
emoji=new PCEmoji()
emoji.init({
        containerId:'emojiTrigger',
        emojiClickCallback:function(str){
            console.log(str)
        }
    })
var emojiTrigger=document.getElementById('emojiTrigger')
emojiTrigger.addEventListener('click',function(){
    emoji.open()
})
emoji.open()
var $result=document.getElementById('result')
result.innerHTML=emoji.parse('[OK][小团_OK]小团_OK[流氓兔_再见]流氓兔_再见[欢乐兔_走开]欢乐兔_走开')

      