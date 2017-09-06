

module.exports = {
    parseData: function (res, callback) {

        var Papa = require('babyparse');
        var lodash = require('lodash');
        var async = require('async');

        var fs = require("fs");
        var path = require("path");

        //Get file
        var allText = [];
        allText = fs.readFileSync(path.join(__dirname, "./setup.csv"), "utf8");

        //CSV to JSON
        var parseConf = {
            delimiter: ";",	// auto-detect
            newline: "",	// auto-detect
            header: true,
            dynamicTyping: true,
            preview: 0,
            encoding: "",
            worker: false,
            comments: false,
            step: undefined,
            complete: undefined,
            error: undefined,
            download: false,
            skipEmptyLines: false,
            chunk: undefined,
            fastMode: undefined,
            beforeFirstChunk: undefined,
            withCredentials: undefined
        };

        var parsedText = Papa.parse(allText, parseConf);
        console.log('parsedtext:  ', parsedText );

        /*Sort and filter*/
        var key = "IP";
        var reg = "Register";
        var data = parsedText.data;

        // console.log('data:  ', data.length );

        var sort1 = lodash.sortBy(data, ['IP', 'Register']);

        //Group all with same IP
        var filtered = lodash.groupBy(sort1, key);

        // console.log('filtered:  ', filtered);

        return filtered;

        callback(null, 'done');

    },
 

};

