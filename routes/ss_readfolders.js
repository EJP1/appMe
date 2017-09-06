
var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");

/* GET home page. */
router.get('/', function (req, res) {

  console.log('////@read Folders-----------------------------------------------////');
  console.log('req:  ', req.query);

  var ob = req.query;
  var filepath = Object.keys(ob)[0]+"/";

  console.log('filepath  and dicks ', filepath);

  var allfiles = fs.readdirSync(filepath);

  var fileList = [];

  for (var i = 0; i < allfiles.length; i++) {

    var stat = fs.statSync(filepath + allfiles[i]);
    console.log(stat);

    //Only if is Folder
    if (!stat.isFile()){ 
      var file = {
        name: allfiles[i],
        date: stat.birthtime
      };

      fileList.push(file);
    }
  }

  res.send(JSON.stringify(fileList));
  // res.send('response!!!!');

});

module.exports = router;
// module.exports = 'Hello world';

