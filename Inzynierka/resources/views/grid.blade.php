<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
</head>

<body>


<label for="x">row:</label>
<input type="number" id="x" name="x" value="3">
<label for="y">column:</label>
<input type="number" id="y" name="y" value="5">

<button onclick="addRow(document.getElementById('x').value,document.getElementById('y').value)">GENERATE GRID</button>
<button onclick="showGrid()">SUBMIT</button>

<div id="reload">

</div>



</body>

</html>

<script>
    addRow(3, 5);


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

    function handleButtonClick()
    {
        $(".selected_cell").each(function(index) {
            console.log($(this).prop('id'));
        });
    }

    let markdown=0;
    let markup=0;

    let grid = [];

    function mouseDown(id)
    {
        if(document.getElementById(id).style.background != "green")
        {
            document.getElementById(id).style.background = "green";
            grid.push(id);
            markdown=1;
            markup=0;
        }
        else
        {
            document.getElementById(id).style.background = "#EED";
            grid.splice(grid.indexOf(id),1)
            markup=1;
            markdown=0;
        }
        console.log(markdown+" "+markup);
    };

    function mouseUp(id)
    {

        markdown=0;
        markup=0;
        //alert(markdown+markup);
        console.log(markdown+" "+markup);
        clearSelection();

    };

    function MouseOver(id)
    {
        if (markdown==1 && markup==0)
        {
            document.getElementById(id).style.background= "green";
            grid.push(id);
        }
        if (markup==1 && markdown==0)
        {
            document.getElementById(id).style.background= "#EED";
            grid.splice(grid.indexOf(id),1)
        }
        console.log(markdown+" "+markup);
        clearSelection();

    };

    function clearSelection()
    {
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        else if (document.selection) {document.selection.empty();}
    }


    function addRow(x, y) {

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

</script>

<style>
    #reload {
        float: none;
    }

    .unselected_cell {
        background-color: #EED;
        width: 80px;
        height: 80px;
        float: left;
        border: solid 1px black;
        cursor: pointer;
    }

    .selected_cell {
        background-color: green;
        width: 80px;
        height: 80px;
        float: left;
        border: solid 1px black;
        cursor: pointer;

    }
</style>
