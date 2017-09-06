
var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require("fs");

var usb = require('usb');
var drivelist = require('drivelist');

/* GET home page. */
router.get('/', function (req, res, next) {


  // var test = usb.getDeviceList();
  var devicelist = [];

  drivelist.list((error, drives) => {
    if (error) {
      throw error;
    }

    drives.forEach((drive) => {

      if (!drive.system) {

        devicelist.push(drive);
      }

    });

    console.log('deviceList: ', devicelist);

    res.send(devicelist);
  });



});

module.exports = router;
// module.exports = 'Hello world';

