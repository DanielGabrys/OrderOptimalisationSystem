

    let grid_size=0;
    let grid_size_x=0;
    let grid_size_y=0;

    let markdown=0;
    let markup=0;

    let grid = [];


    function mouseDownk(id)
    {
        if(document.getElementById(id).style.background !== "green" && !grid.includes(id))
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

    function mouseUpk(id)
    {

        markdown=0;
        markup=0;
        //alert(markdown+markup);
        //console.log(markdown+" "+markup);
        clearSelection();

    };

    function MouseOverk(id)
    {
        if (markdown===1 && markup===0)
    {
        if(document.getElementById(id).style.background !== "green" && !grid.includes(id))
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
        console.log(grid);
        clearSelection();

    };

    function clearSelection()
    {
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        else if (document.selection) {document.selection.empty();}
    }


    function addRow(X, Y)
    {

        this.setS

    let x=0;
    let y=0;

    if(parseInt(document.load_grid.grid_size_x.value)>0)
    {
       x =parseInt(document.load_grid.grid_size_x.value);
       y =parseInt(document.load_grid.grid_size_y.value);
    }
    else
    {
        x =parseInt(X);
        y =parseInt(Y);
    }

    let size = 1000/y;

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

    function showSelectedGrid(X,Y,elements,selector)
    {
        let x =parseInt(X);
        let y =parseInt(Y);

        var arr;
        if (selector==="0")
            arr = JSON.parse(elements);
        else if (selector==="1")
            arr = elements;



        let size = 700/y;

        let digits = (x*y).toString().length;
        if (digits<=1)
            digits=2;

        document.getElementById("reload").innerHTML='';
        let counter = 1

        for (let rows = 0; rows < x; rows++)
        {
            for (let columns = 0; columns < y; columns++)
            {
                document.getElementById("reload").innerHTML +=
                    '<div id=' + counter + ' class="unselected_cell" >'+counter+'</div>';


                if(arr[rows][columns]=="-1")
                {
                    document.getElementById(counter.toString()).style.background = "green";
                }
                if(arr[rows][columns]=="1")
                {
                    document.getElementById(counter.toString()).style.background = "yellow";
                }

                counter++;
            };

        };

        let block_size=document.getElementsByClassName("unselected_cell");  // Find the elements
        for(let i = 0; i < block_size.length; i++)
        {
            block_size[i].style.width=size +"px";    // Change the content
            block_size[i].style.height=size +"px";

            let b_size= size;

            block_size[i].style.fontSize = b_size/(digits)+"px";
            console.log(b_size);
        }
        document.getElementById("reload").style.width=size*y+"px";
        document.getElementById("reload").style.height=size*x+"px";



    };

    function editSelectedGrid(X,Y,elements)
    {
        let x =parseInt(X);
        let y =parseInt(Y);

        grid_size_x = x;
        grid_size_y = y;
        grid_size = x * y;

        var arr = elements

        let size = 1000/y;

        let digits = (x*y).toString().length;
        if (digits<=1)
            digits=2;

        document.getElementById("reload").innerHTML='';
        let counter = 1

        for (let rows = 0; rows < x; rows++)
        {
            for (let columns = 0; columns < y; columns++)
            {
                document.getElementById("reload").innerHTML +=
                    '<div id=' + counter + ' class="unselected_cell" onmousedown="mouseDown('+counter+')" onmouseover="MouseOver('+counter+')" onmouseup="mouseUp('+counter+')">'+counter+'</div>';


                if(arr[rows][columns]=="-1")
                {

                    document.getElementById(counter.toString()).style.background = "green";
                    grid.push(counter);
                }
                if(arr[rows][columns]=="1")
                {
                    document.getElementById(counter.toString()).style.background = "yellow";
                }

                counter++;

            };

        };

        let block_size=document.getElementsByClassName("unselected_cell");  // Find the elements
        for(let i = 0; i < block_size.length; i++)
        {
            block_size[i].style.width=size +"px";    // Change the content
            block_size[i].style.height=size +"px";

            let b_size= size;

            block_size[i].style.fontSize = b_size/(digits)+"px";
            console.log(b_size);
        }
        document.getElementById("reload").style.width=size*y+"px";
        document.getElementById("reload").style.height=size*x+"px";



    };

    function setGridsize(y)
    {
        ;
    }

    function showGrid()
    {
        console.table(grid);
    };

    function setGridValues(){
            document.load_grid.grid.value = grid;
            document.load_grid.grid_size.value = grid_size;
            document.load_grid.grid_size_x.value = grid_size_x;
            document.load_grid.grid_size_y.value = grid_size_y;
            entryValidation();

    };


    function renew()
    {

        let int_grid = gridToInt();

        if(int_grid.length>1)
        {
            grid_size_x=parseInt(document.load_grid.grid_size_x.value);
            grid_size_y=parseInt(document.load_grid.grid_size_y.value);
            grid_size=grid_size_x*grid_size_y;


            for (let i = 0; i < int_grid.length; i++) {
                //console.log(int_grid[i]);
                document.getElementById(int_grid[i]).style.background = "green";
                grid.push(int_grid[i]);
            }
        }
    };

    function gridToInt()
    {
        let a = document.load_grid.grid.value;
        console.log(a);

        let int_grid = a.split(',').map(function(item) {
            return parseInt(item, 10);
        });

        return int_grid;
    }

    function clearGrid()
    {
        document.load_grid.grid.value = null;
        document.load_grid.grid_size.value = null;
        document.load_grid.grid_size_x.value = null
        document.load_grid.grid_size_y.value = null;
        grid=[];
    }

    function entryValidation()
    {
        let ok=1;
        let counter=1;

        let entry = parseInt(document.load_grid.entry.value);

        console.log(entry);
        if (grid.includes(entry))
        {
            ok=0;
        }

        for(let i=0; i< grid_size_x;i++)
        {
            for (let j = 0; j <grid_size_y; j++)
            {

                if(i>0 && i<(grid_size_x)-1 && j>0 && j<(grid_size_y)-1 )
                {

                    if(entry===counter) {
                    ok = 0;
                }
                }
                counter++;
            }
        }

        document.load_grid.entry_ok.value = ok;

    }



