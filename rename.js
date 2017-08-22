var fs = require('fs');
var path='./css/img/0/'
 fs.readdir(path, function (err, files) {
    files.forEach(function (file) {

      var oldPath = path + file;

      fs.stat(oldPath, function (err, stats) {
          var newPath=oldPath.replace(/[［］\[\]]/g,'')
        fs.rename(oldPath, newPath, function (e) {
        });
      });
    });
  });