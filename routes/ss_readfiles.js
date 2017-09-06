
var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");

/* GET home page. */
router.get('/', function (req, res, next) {

  var filepath = "/Users/espenjohanpedersen/Documents/FileTest/"; //"/tmp/"

  console.log('Read files from path: ', filepath);

  var allfiles = fs.readdirSync(filepath);

  var fileList = [];

  for (var i = 0; i < allfiles.length; i++) {

    var stat = fs.statSync(filepath + allfiles[i]);
    //  var 
    // console.log(allfiles[i], stat.isFile());

    //Only if not Folder
    if (stat.isFile()){ //stat.isFile()
      var file = {
        name: allfiles[i],
        date: stat.birthtime
      };

      fileList.push(file);

    }

  }

  console.log('allfiles: ', fileList);

  res.send(JSON.stringify(fileList));

});

module.exports = router;
// module.exports = 'Hello world';

