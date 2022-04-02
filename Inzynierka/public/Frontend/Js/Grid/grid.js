
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

    let grid_size=0;
    let grid_size_x=0;
    let grid_size_y=0;

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
        if (markdown===1 && markup===0)
    {
        if(document.getElementById(id).style.background !== "green")
        {
            grid.push(id);
        }
        document.getElementById(id).style.background= "green";

    }
        if (markup===1 && markdown===0)
    {
        if(document.getElementById(id).style.background === "green")
        {
            grid.splice(grid.indexOf(id),1)
        }
        document.getElementById(id).style.background= "#EED";

    }
        //console.log(markdown+" "+markup);
        clearSelection();

    };

    function clearSelection()
    {
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        else if (document.selection) {document.selection.empty();}
    }


    function addRow(X, Y)
    {

    let x =parseInt(X);
    let y =parseInt(Y);
    let size = 1080/y;

    let digits = (x*y).toString().length;
    if (digits<=1)
        digits=2;

    if(x>0 && y>0)
    {
        grid_size_x = x;
        grid_size_y = y;
        grid_size = x * y;
    }

    document.getElementById("reload").innerHTML='';
    let counter = 1

    for (let rows = 0; rows < x; rows++)
    {
        for (let columns = 0; columns < y; columns++)
        {
        document.getElementById("reload").innerHTML +=
            '<div id=' + counter + ' class="unselected_cell" onmousedown="mouseDown('+counter+')" onmouseover="MouseOver('+counter+')" onmouseup="mouseUp('+counter+')">'+counter+'</div>';
        counter++;
        };

    };

    let block_size=document.getElementsByClassName("unselected_cell");  // Find the elements
        for(let i = 0; i < block_size.length; i++)
        {
            block_size[i].style.width=size +"px";    // Change the content
            block_size[i].style.height=size +"px";

            let b_size= block_size[i].clientHeight;

                block_size[i].style.fontSize = b_size/(digits)+"px";
        }
        document.getElementById("reload").style.width=size*y+"px";
        document.getElementById("reload").style.height=size*x+"px";
};
    function showGrid()
    {
        console.table(grid);
    };

    function setGridValues(){
        document.load_grid.grid.value = grid;
        console.table(grid);
    }

    function setGridTotalSize()
    {
        document.load_grid.grid_size.value = grid_size;
        document.load_grid.grid_size_x.value = grid_size_x;
        document.load_grid.grid_size_y.value = grid_size_y;

    }

