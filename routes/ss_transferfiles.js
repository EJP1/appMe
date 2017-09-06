
var express = require('express');
var router = express.Router();
var path = require("path");
var fs = require('fs.extra');

/* GET home page. */
router.get('/', function (req, res) {

    console.log('////@Transfer Files-----------------------------------------------////');

    console.log('Conf:  ', req.query);

    var funcAr = [];
    var files = req.query.files;
    var pathto = req.query.path;
    var pathfrom = "/Users/espenjohanpedersen/Documents/FileTest/";


    for (var i = 0; i < files.length; i++) {
        var from = pathfrom + files[i];
        var to = pathto + "/" + files[i];

        console.log('Funcar: ', 'from: ', from, 'to: ', to);
        // funcAr.push(moveFile.bind(this, from, to));
        moveFile(from, to);
    }

    // async.parallel(
    //     funcAr,

    //     function (err, results) {
    //         console.log('Files moved:', results.length);

    //         // callback(null, results);
    //         res.send(results.length);
    //     }
    // );

    function moveFile(oldpath, newpath) {//, callback
        // fs.rename(oldpath, pnewpath, function (err) { callback(err, name); });

        console.log('moving file');

        fs.copy(oldpath, newpath, { replace: false }, function (err) {
            if (err) {
                // i.e. file already exists or can't write to directory 
                throw err;
            }

            // callback(err, newpath); 
        });

        res.send('Done');



    }




});

module.exports = router;
// module.exports = 'Hello world';

