var fs = require('fs');
var path='./css/img/3/'
 fs.readdir(path, function (err, files) {
    files.forEach(function (file) {

      var oldPath = path + file;

      fs.stat(oldPath, function (err, stats) {
          var newPath=oldPath.replace(/[［］\[\]欢乐兔_]/g,'')
        fs.rename(oldPath, newPath, function (e) {
        });
      });
    });
  });