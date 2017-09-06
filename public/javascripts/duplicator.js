
//global
var variablesList = [];


function genFile(int) {

    //Get duplicate number
    var dupnr = $('#dupnr').val();

    var newar = '';//[];


    for (var i = 0; i < variablesList.length; i++) {

        for(var d=0; d<dupnr; d++){

            // newar.push(variablesList[i]);
            newar = newar +csvFunc(variablesList[i]);
        }
    }

    console.log('newar:',newar);

     savePrompt('Duplicated_'+dupnr+'times.csv', newar, 'csv');
    
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


function fillTable(array) {

    var colcount = array[0].length;
    var headArray = [];

    var tableHead = '<tr>';
    var tableBody = '<tr>';
    var table = '';

    //clear table
    removeChildren('csvtable-head');
    removeChildren('csvtable-body');

    //Create table header and header array
    for (var i = 0; i < colcount; i++) {
        var x = 'Column ' + i;
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

    //assemble array
    variablesList = array;

    $('#csvtable-head').append(tableHead);
    $('#csvtable-body').append(tableBody);
}

function retArray(event) {
    var csv = event.target.result;
    // console.log('Csv: ', csv);
    fillTable(processCsvData(csv));
}
