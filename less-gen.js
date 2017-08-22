var emojiConfig=require('./src/emoji.json')
var fs = require('fs');
var filePath="./css/icon.less"
fs.truncate(filePath, 0, function(){})
var stream = fs.createWriteStream(filePath);
stream.once('open', function(fd) {
    var emoji=emojiConfig.emoji;
    emoji.forEach((emojiPackage)=>{
        var {entry,list}=emojiPackage;
        var entryPrefix=entry.prefix;
        list.forEach(emojiItem=>{
            var cssClass=emojiItem.class,
                emojiLabel=emojiItem.label
            stream.write(
`.icon-${entryPrefix}-${cssClass}{
    background-image: url(./img/${entryPrefix}/${emojiLabel}.png)
}
`)
        })

    })
    stream.end();
});
