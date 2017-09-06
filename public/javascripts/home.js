console.log('home.js loaded');
//START APP : node ./bin/www

//global
var variablesList = [];

var testOb = {
    l1: {
        list: ['name1', 'name2', 'name3'],
        va: ''
    },
    l2: {
        list: ['blue1', 'red2', 'reen3'],
        va: ''
    },
};



//Global functions
function changeTheme() {
    var varList = ['--main-color', '--main-txt-color', '--acc-color1', '--acc-color2', '--cont-color', '--hover-color1'];
    // var colList1 = ['#ff5d46', '#262626','#262626', '#ffffff', '#f9f9f9', '#f9f9f9'];
    var colList2 = ['#f9f9f9', '#262626', '#262626', '#fffff', '#f9f9f9', '#262626'];
    var colList = colList2;

    // var colOb1 = {
    //     '--main-color': '#262626',
    //     '--main-txt-color': 'white',
    //     '--sec-txt-color': '#262626',
    //     '--txt-back-color': '#f9f9f9',
    //     '--txt-back-focus-color': 'white',
    //     '--acc-color1': 'white',
    //     '--acc-color2': '#F9F9F9',
    //     '--cont-color': 'white',
    //     '--hover-color1': '#f9f9f9',
    //     '--hover-color2': '#ff5d46'
    // };


    // var ob = colOb1;

    // var elm = '';
    // var color= '';

    // _.forEach(ob, function (value, key) {
    //     // console.log(value, key);
    //     elm = key.toString();
    //     color = value.toString();
    //     console.log(elm, color);

    //     document.documentElement.style.setProperty(elm, color);

    // });

    for (var i = 0; i < varList.length; i++) {
        document.documentElement.style.setProperty(varList[i], colList[i]);

    }
}
function openSideNav(){

    // $('#sidenav').attr('open', '1');
}

function processCsvData(csv) {
    var allTextLines = csv.split(/\r\n|\n/);
    var lines = [];
    for (var i = 0; i < allTextLines.length; i++) {
        var data = allTextLines[i].split(';');
        var tarr = [];
        for (var j = 0; j < data.length; j++) {
            tarr.push(data[j]);
        }
        lines.push(tarr);
    }

    console.log('Lines ', lines);
    return lines;

}

function errorHandler(evt) {
    if (evt.target.error.name == "NotReadableError") {
        alert("Canno't read file !");
    }
}

function removeChildren(id) {
    var myNode = document.getElementById(id);
    while (myNode.firstChild) {
        myNode.removeChild(myNode.firstChild);
    }
}

function savePrompt(filename, data, type) {
   

    console.log('SavePromt: ', data);
    var blob = new Blob(["\ufeff", data], { type: 'text/'+type+';charset=utf-8' });
    if (window.navigator.msSaveOrOpenBlob) {
        window.navigator.msSaveBlob(blob, filename);
    } else {
        var elem = window.document.createElement('a');
        elem.href = window.URL.createObjectURL(blob);
        elem.download = filename;
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    }
}

function csvFunc(arg) {
    var myRet = '';
    var iEnd = arg.length;
    for (var i = 0; i < iEnd; i++) {
        myRet += arg[i] + ';';
    }
    myRet += '\n';
    return myRet;
}
//CSV
// function csvToArray(csv) {
//     rows = csv.split("\n");
//     return rows.map(function (row) {
//         return row.split(",");
//     });

// }
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