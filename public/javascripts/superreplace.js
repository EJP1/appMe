
//global
var variablesList = [];
var headArray = [];
var inputList=[];

$(document).ready(function () {
    // addIncRow();
});

var htmlincRow = '<li>' +
    '<div class="container0">' +
    '<div class="stand-txt-div ">xxx</div>' +
    '<input class="inp-nr" id="dupnr" type="number" name="quantity" min="1" max="20" value="1">' +
    '<div class="iconbtn" style="visibility:hidden">' +
    '<i class="material-icons icon30">add</i>' +
    '</div>' +
    '</div>' +
    '</li>';
function genFile(int) {
    var subarCount;
    var finalText = '';
    var incVal = 0;
    var template;
    var tmpOk = false;
    var listok = false;

    //Get template
    template = $('#templateText').val();

    //check if input is valid
    if (template) {
        tmpOk = true;
    }
    if (variablesList[0]) {
        listok = true;
    }

    if (tmpOk && listok) {
        console.log('Good to go');
    }
    else {
        alert('Missing template text and/or list!');
    }

    subarCount = variablesList[0].length;

    //For every row
    for (var i = 1; i < variablesList.length; i++) {

        var temp = template;

        //For every cell
        for (var i2 = 0; i2 < variablesList[i].length; i2++) {
            temp = _.replace(temp, new RegExp(variablesList[0][i2], "g"), variablesList[i][i2]);
        }

        //Combine as one or separate
        if (int === 0) {
            // console.log('Separate: ', temp);
            savePrompt('Separate' + i + '.txt', temp, 'plain');

        }
        else {
            finalText += temp;
        }

        incVal++;
    }
    console.log('increment: ', incVal);

    if (int === 1) {
        // console.log('finalText: ', finalText);
        savePrompt('All in one.txt', finalText, 'plain');
    }
}

function getList(files) {

    if (window.FileReader) {
        // FileReader are supported.
        var reader = new FileReader();
        // Read file into memory as UTF-8      
        reader.readAsText(files[0]);
        // Handle errors load
        reader.onload = retArray;
        reader.onerror = errorHandler;

    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function getText(files) {
    if (window.FileReader) {
        // FileReader are supported.

        var reader = new FileReader();
        // Read file into memory as UTF-8      
        reader.readAsText(files[0]);
        // Handle errors load
        reader.onload = retText;
        reader.onerror = errorHandler;

    } else {
        alert('FileReader are not supported in this browser.');
    }
}

function fillTable(array) {

    console.log('Array', array);
    var colcount = array[0].length;
    // var headArray = [];

    var tableHead = '<tr>';
    var tableBody = '<tr>';
    var table = '';

    //clear table
    removeChildren('csvtable-head');
    removeChildren('csvtable-body');

    //Create table header and header array
    for (var i = 0; i < colcount; i++) {
        var x = '%A' + i + '%';
        var th = '<th>' + x + '</th>';
        headArray.push(x);
        tableHead += th;
    }
    tableHead += '</tr>';

    //Create table body
    for (var i = 0; i < array.length; i++) {
        var newrow = '<tr>';

        for (var i2 = 0; i2 < array[i].length; i2++) {
            var td = '<td>' + array[i][i2] + '</td>';

            newrow += td;
        }
        newrow += '</tr>';

        tableBody += newrow;
    }
    // console.log(tableHead);
    // console.log(tableBody);

    table = tableHead + tableBody;

    //assemble array
    variablesList = array;
    variablesList.unshift(headArray);

    $('#csvtable-head').append(tableHead);
    $('#csvtable-body').append(tableBody);
    // $('#csvtable').append(table);

}

function addIncRow() {

    var id = generateUUID();
    // var rowId = '';
    var bod = '<li>' +
        '<div class="container0">' +
        '<div class="stand-txt-div "></div>' +
        '<input class="inp-nr" id="'+id+'" type="number" name="quantity" min="1" max="20" value="1">' +
        '<div class="iconbtn" style="visibility:hidden">' +
        '<i class="material-icons icon30">add</i>' +
        '</div>' +
        '</div>' +
        '</li>';

    inputList.push([rowId, id]);

    

    $('#inc-list').append(htmlincRow);

}

function retText(event) {
    var txt = event.target.result;
    console.log('Text: ', txt);
    $('#templateText').append(txt);

}

function retArray(event) {
    var csv = event.target.result;
    // console.log('Loadhandler: ', event.target.result);
    fillTable(processCsvData(csv));
}
