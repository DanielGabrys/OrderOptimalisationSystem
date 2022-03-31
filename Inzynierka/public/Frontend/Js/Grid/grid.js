
    /*
    function handleCellClick(cell) {
    if (cell.className.indexOf("unselected_cell") > -1)
{
    cell.className = cell.className.replace("unselected_cell", "selected_cell");
} else
{
    cell.className = cell.className.replace("selected_cell", "unselected_cell");
}
}
    */

    let markdown=0;
    let markup=0;

    let grid = [];

    function mouseDown(id)
    {
        if(document.getElementById(id).style.background !== "green")
    {
        grid.push(id);
        document.getElementById(id).style.background = "green";


        markdown=1;
        markup=0;
    }
        else
    {
        if(document.getElementById(id).style.background === "green")
        {
            grid.splice(grid.indexOf(id),1)
        }
        document.getElementById(id).style.background = "#EED";

        markup=1;
        markdown=0;
    }
        //console.log(markdown+" "+markup);
    };

    function mouseUp(id)
    {

        markdown=0;
        markup=0;
        //alert(markdown+markup);
        //console.log(markdown+" "+markup);
        clearSelection();

    };

    function MouseOver(id)
    {
        if (markdown==1 && markup==0)
    {
        if(document.getElementById(id).style.background !== "green")
        {
            grid.push(id);
        }
        document.getElementById(id).style.background= "green";

    }
        if (markup==1 && markdown==0)
    {
        if(document.getElementById(id).style.background === "green")
        {
            grid.splice(grid.indexOf(id),1)
        }
        document.getElementById(id).style.background= "#EED";

    }
        console.log(markdown+" "+markup);
        clearSelection();

    };

    function clearSelection()
    {
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        else if (document.selection) {document.selection.empty();}
    }


    function addRow(x, y)
    {

    grid = []
    let size = 80;
    let size2 = (size + 2) * y;

    document.getElementById("reload").innerHTML = '';
    let counter = 1
    for (var rows = 0; rows < x; rows++) {

    for (let columns = 0; columns < y; columns++) {
    document.getElementById("reload").innerHTML += '<div id=' + counter + ' class="unselected_cell" onmousedown="mouseDown('+counter+')" onmouseover="MouseOver('+counter+')" onmouseup="mouseUp('+counter+')">'+counter+'</div>';
    document.getElementById("reload").style.width = size2 + "px";
    counter++;
            };

        };

};
    function showGrid()
    {
        console.table(grid);
    };

