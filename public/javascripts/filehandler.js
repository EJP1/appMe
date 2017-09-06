

$(document).ready(
    readFiles()
);
var files;
var tableRowHtml = '<tr id="idxx" >' +
    '<td class="tbr name" tdid="name">filenamexx</td>' +
    '<td class="tbr date" tdid="date">datexx</td>' +
    '<td class="tbr check" tdid="check" state="0" ></td> ' +
    '</tr>';
var pathtableRowHtml = '<tr id="idxx" >' +
    '<td class="tbr-path-exp" ><button id="idxx-exp" class="expbtn" type="button" state="0" datax="filenamexx" >+</button></td>' +
    '<td class="tbr-path-name" tdid="idxx-name">filenamexx</td>' +
    '<td class="tbr-path-choose" ><button id="idxx-choose" class="rowBtn" type="button" state="0" datax="filenamexx" >Use</button></td>' +
    '</tr>';


var checkBoxList = ['cb1', 'cb2'];

function readFiles() {
    // var filepath = "/Users/espenjohanpedersen/Documents/NRK/";

    console.log('get some files...');

    $.get("/readFiles", function (data) {

        // console.log('data: ',data);

        files = JSON.parse(data);
        // console.log('parsed files: ',files);

        for (var i = 0; i < files.length; i++) {
            files[i].checked = false;
        }

        //Sort by date:
        files = _.sortBy(files, ['date']);
        //Most recent date first:
        files = _.reverse(files);

        // console.log(files);

        for (var i = 0; i < files.length; i++) {
            var repret = repRow(tableRowHtml, files[i].name, moment(files[i].date).format('MM.DD.YYYY, HH:MM:SS'));
            $('#tbl-bd-files').append(repret.html);

            $("#" + repret.id).bind("click",
                // console.log(repret.id);
                chooseRow.bind(repret.id)
            );
        }
    });

    // console.log('We got files: ', files);

}

function getHd() {
    console.log('get  the path...');
    $('.loader').show();


    $.get("/getHd", function (data) {

        // files = JSON.parse(data);
        console.log('Data: ', data);

        cleanTable('tbl-bd-path');
        
        for (var i = 0; i < data.length; i++) {
            var devpath = data[i].mountpoints[0].path;
            var repret = repRow(pathtableRowHtml, devpath);

            $('#tbl-bd-path').append(repret.html);
            // console.log(repret.id);

            $("#" + repret.id + '-choose').bind("click",
                chooseRowPath.bind(repret.id)
            );
            $("#" + repret.id + '-exp').bind("click",
                readFolders.bind(repret.id)
            );
        }

        if (data.length > 0) {
            $('#pathlist').show();
        }
        else {
            alert('No external hard drives found!');
        }
        $('.loader').hide();
    });
}

function readFolders(id) {

    var getid = id.currentTarget.id;
    var getdata = $('#' + getid).attr('datax');

    var conf = getdata;
    console.log(getdata);

    $.get("/readFolders", conf)
        .done(function (data) {
            // alert("Data Loaded: " + data);
            var parsedata = JSON.parse(data);
            cleanTable('tbl-bd-path');


            for (var i = 0; i < parsedata.length; i++) {
                var devpath =conf+"/"+parsedata[i].name;
                console.log(devpath);

                var repret = repRow(pathtableRowHtml, devpath);

                $('#tbl-bd-path').append(repret.html);
                // console.log(repret.id);

                $("#" + repret.id + '-choose').bind("click",
                    chooseRowPath.bind(repret.id)
                );
                $("#" + repret.id + '-exp').bind("click",
                    readFolders.bind(repret.id)
                );
            }


            console.log(data);
        });
}

function transferFiles() {

    // var pathfrom = $('#pathto').text(); //in serverside
    var pathto;
    var files = [];


    if ($('#pathto').attr('data') === '1') {
        pathto = $('#pathto').text();
    }
    else {
        return alert('Choose a path first!');
    }

    //Get chosen filenames
    $('#tbl-bd-files tr').each(function () {
        var $tds = $(this).find('td'),
            name = $tds.eq(0).text(),
            date = $tds.eq(1).text(),
            state = $tds.eq(2).attr('state');

        if (state === '1') {
            files.push(name);

        }
    });

    if (files.length <= 0) {
        return alert('Choose files first!');
    }

    var conf = {
        path: pathto,
        files: files
    };
    //transfer files
    console.log('transferFiles', pathto, files);

    $.get("/transferFiles", conf)
        .done(function (data) {
            alert("Data Loaded: " + data);
        });

}

function cleanTable(id) {



    var allChildren = $('#' + id).children();

    console.log('clean table', allChildren);
    for (var i = 0; i < allChildren.length; i++) {
        $(allChildren[i]).remove();
    }
}

//---------------------------------------
function repRow(bod, name, date) {
    var id = generateUUID(); //moment();
    bod = bod.replace(/idxx/g, id);
    bod = bod.replace(/filenamexx/g, name);
    bod = bod.replace(/datexx/g, date);

    return {
        id: id,
        html: bod
    };
}

function toggleRow(ID) {

    console.log(ID);

    var state = $('tbr check ' + ID).attr('state');

    // console.log(ID, 'state: ', state);
}

function checkboxToggle(id) {

    var state = $("#" + id).attr('state');

    // console.log('State: ', state)
    if (state === '0') {

        $("#" + id).css('border-color', '#00adee');
        $("#" + id).attr('state', '1');
    }
    else {
        $("#" + id).css('border-color', '#cccccc');
        $("#" + id).attr('state', '0');
    }

    for (var i = 0; i < checkBoxList.length; i++) {

        var uid = checkBoxList[i];

        if (checkBoxList[i] != id) {

            $("#" + uid).css('border-color', '#cccccc');
            $("#" + uid).attr('state', '0');
        }
    }

    //Do something:

    if (id == 'cb1') {
        chooseAll(state);
    }
    else if (id === 'cb2') {
        chooseToday(state);
    }

}

function chooseAll(state) {
    console.log('chooseAll state', state);
    $('#tbl-bd-files tr').each(function () {
        $(this).find('td').each(function () {
            //do your stuff, you can use $(this) to get current cell
            var tdid = $(this).attr('tdid');

            if (tdid === 'check') {
                if (state === '0') {
                    $(this).attr('state', '1');
                    $(this).text('Yes');
                }
                else {
                    $(this).attr('state', '0');
                    $(this).text('');
                }
            }
            // console.log(tmp);
        });
    });
}

function chooseToday(state) {
    $('#tbl-bd-files tr').each(function () {
        var $tds = $(this).find('td'),
            name = $tds.eq(0).text(),
            date = $tds.eq(1).text(),
            check = $tds.eq(2).text();

        var mdate = moment(date, 'MM.DD.YYYY, HH:MM:SS').format('MM.DD.YYYY');
        var curdate = moment().format('MM.DD.YYYY');

        if (mdate === curdate) {
            if (state === '0') {
                $tds.eq(2).text('Yes');
                $tds.eq(2).attr('state', '1');
            }
            else {
                $tds.eq(2).text('');
                $tds.eq(2).attr('state', '0');
            }
            // console.log(name, date);
        }
        else {
            $tds.eq(2).text('');
            $tds.eq(2).attr('state', '0');
        }
    });
}

function chooseRow(id) {
    var getid = id.currentTarget.id;

    var $tds = $('#' + getid).find('td'),
        state = $tds.eq(2).attr('state');

    if (state === '0') {
        $tds.eq(2).text('Yes');
        $tds.eq(2).attr('state', '1');
    }
    else {
        $tds.eq(2).text('');
        $tds.eq(2).attr('state', '0');
    }
}

function chooseRowPath(id) {
    var getid = id.currentTarget.id;
    $('#pathlist').hide();

    var data = $('#' + getid).attr('datax');
    console.log('chooseRowPath', getid, data);
    $('#pathto').text(data);
    $('#pathto').attr('data', '1');

}

//Tools:
function generateUUID() {
    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function') {
        d += performance.now(); //use high-precision timer if available
    }
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}