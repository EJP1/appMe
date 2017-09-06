
var gridSetup = {
    columns: 12,
    rows: 12,
    width: 400,
    height: 200,
};

$( document ).ready(function(){
    genGrid(gridSetup);

});
function genGrid(input){
    var g1= 0,g2=0;
    var cols = input.columns;
    var rows = input.rows;
    
    

    //Calc sizes
    var cwidth = input.width / input.columns; 
    var cheight = input.height / input.rows; 
    var cell = '<div class="e-cell"></div>';


    //Set grid size
    // $('.e-grid').height(input.height);
    // $('.e-grid').width(input.width);

    for(g1 = 0; g1<rows; g1++){
        var ro
        $('#theGrid').append(newcell);
        for(g2 = 0; g2<cols; g2++){
            
            var newcell= _.clone(cell);
            
        }
        
    }
    $('.e-cell').height(cheight);
    $('.e-cell').width(cwidth);

}