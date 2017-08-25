# FT-EMOJI

表情包项目，目前支持四套表情：emoji、小团、流氓兔、欢乐兔
功能有：表情包弹出层的渲染、emoji对象提供的parse方法可以解析含有表情的格式化文字


## 接口说明

- init 用于Emoji的初始化
- open 打开Emoji弹出层
- close 关闭Emoji弹出层
- parse 用于解析含有emoji的格式化文字，该接口会返回如下富文本
```html
<i class="emoji-icon emoji-icon-3 emoji-icon-3-15"></i>
```
- init(opts) opts为初始化配置对象，以下为opts属性
- triggerEle 锚点element的id，该id用于点击弹出层以外区域自动关闭的逻辑判断 
- emojiClickCallback 点击表情的回调，会传入该表情对应的文字，如果需要点击之后关闭弹出层可以在该方法里手动调用close方法
- platform 针对pc还是app得到表情包。目前支持了pc，可先不传

```js
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
result.innerHTML=emoji.parse('[OK][小团_OK]小团_OK[流氓兔_再见]流氓兔_再见[欢乐兔_走开]欢乐兔_走开')
```
## 注意事项

全局只应该有一个emoji对象，请勿多次实例化

## 安装

```
	#测试	
	npm run test	
	#打包	
	npm run build	
	#例子演示	
	npm start
```


