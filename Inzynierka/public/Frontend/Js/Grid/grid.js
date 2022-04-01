
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

    grid = [];

        let k=0.75;
        let width = window.innerWidth*k
            || document.documentElement.clientWidth*k
            || document.body.clientWidth*k;

    let height = window.innerHeight*k
            || document.documentElement.clientHeight*k
            || document.body.clientHeight*k;


    let x =parseInt(X);
    let y =parseInt(Y);
    let digits = (x*y).toString().length;
    let size = 1080/y;

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

