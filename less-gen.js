var emojiConfig=require('./src/emoji.json')
var fs = require('fs');
var filePath="./css/icon.less"
fs.truncate(filePath, 0, function(){})
var stream = fs.createWriteStream(filePath);
stream.once('open', function(fd) {
    var emoji=emojiConfig.emoji;
    emoji.forEach((emojiPackage,pacIndex)=>{
        stream.write(
`.emoji-entry-${pacIndex}{
    background-image: url(./img/entry/${pacIndex}.png)
}
`)
        var {entry,list}=emojiPackage,
            fileType=entry.fileType||'png',
            entryPrefix=entry.prefix;
        list.forEach((emojiItem,index)=>{
            var emojiLabel=emojiItem.label
            stream.write(
`.emoji-icon-${entryPrefix}-${index}{
    background-image: url(./img/${entryPrefix}/${emojiLabel}.${fileType})
}
`)
        })

    })
    stream.end();
});
