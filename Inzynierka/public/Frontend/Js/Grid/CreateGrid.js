class CreateGrid extends BasicGrid
{

    grid_size=0;
    markdown=0;
    markup=0;

    grid = [];

    mouseDown(id)
    {
        if(document.getElementById(id).className !== "selected_cell" && !this.grid.includes(id))
        {
            this.grid.push(id);
            document.getElementById(id).className= "selected_cell";

            this.markdown=1;
            this.markup=0;
        }
        else
        {
            if(document.getElementById(id).className=== "selected_cell")
            {
                this.grid.splice(this.grid.indexOf(id),1)
            }
            document.getElementById(id).className= "unselected_cell";

            this.markup=1;
            this.markdown=0;
        }
        //console.log(markdown+" "+markup);
    };

    mouseUp(id)
    {
        this.markdown=0;
        this.markup=0;
        //alert(markdown+markup);
        //console.log(markdown+" "+markup);
        this.clearSelection();
    };

    mouseOVER(id)
    {
        if (this.markdown===1 && this.markup===0)
        {
            if(document.getElementById(id).className !== "selected_cell" && !this.grid.includes(id))
            {
                this.grid.push(id);
            }
            document.getElementById(id).className = "selected_cell";

        }
        if (this.markup===1 && this.markdown===0)
        {
            if(document.getElementById(id).className === "selected_cell")
            {
                this.grid.splice(this.grid.indexOf(id),1)
            }
            document.getElementById(id).className = "unselected_cell";

        }
        //console.log(markdown+" "+markup);
        //console.log(this.grid);
        this.clearSelection();

    };

    clearSelection()
    {
        if (window.getSelection) {window.getSelection().removeAllRanges();}
        else if (document.selection) {document.selection.empty();}
    }

    addRow(X, Y)
    {



        let x=0;
        let y=0;

        if(parseInt(document.load_grid.grid.value))
        {
            console.log("elo");
            x =parseInt(document.load_grid.grid_size_x.value);
            y =parseInt(document.load_grid.grid_size_y.value);
        }
        else
        {
            x =parseInt(X);
            y =parseInt(Y);
        }

        this.setSize(x,y,1000)

        let size = this.size;

        let digits = (x*y).toString().length;
        if (digits<=1)
            digits=2;

        if(x>0 && y>0)
        {
            this.height = x;
            this.width= y;
            this.grid_size = x * y;
        }

        console.log("elo");

        document.getElementById("reload").innerHTML='';
        let counter = 1

        for (let rows = 0; rows < x; rows++)
        {
            for (let columns = 0; columns < y; columns++)
            {
                document.getElementById("reload").innerHTML +=
                    '<div id=' + counter + ' class="unselected_cell" onmousedown="createGrid.mouseDown('+counter+')" onmouseover="createGrid.mouseOVER('+counter+')" onmouseup="createGrid.mouseUp('+counter+')">'+counter+'</div>';
                counter++;


            };

        };

        let counter2 =1;
        for (let rows = 0; rows < x; rows++)
        {
            for (let columns = 0; columns < y; columns++)
            {
                let cell=document.getElementById(counter2.toString());

                cell.addEventListener("mousedown", function() {
                   // createGrid.mouseDown(counter2.toString());
                });


                cell.style.width=this.size+"px";
                cell.style.height=this.size+"px";
                cell.style.fontSize = this.size/(digits)+"px"

                counter2 ++;

            };

        };



        document.getElementById("reload").style.width=size*y+"px";
        document.getElementById("reload").style.height=size*x+"px";
    };

    showGrid()
    {
        console.table(this.grid);
    };

    setGridValues()
    {
        document.load_grid.grid.value = this.grid;
        document.load_grid.grid_size.value = this.width*this.height;
        document.load_grid.grid_size_x.value = this.height;
        document.load_grid.grid_size_y.value = this.width;
        this.entryValidation();
    };

    renew()
    {

        let int_grid = this.gridToInt();

        if(int_grid.length>1)
        {
            this.height=parseInt(document.load_grid.grid_size_x.value);
            this.width=parseInt(document.load_grid.grid_size_y.value);
            this.grid_size=this.width*this.height;


            for (let i = 0; i < int_grid.length; i++) {
                //console.log(int_grid[i]);
                document.getElementById(int_grid[i]).className = "selected_cell";
                this.grid.push(int_grid[i]);
            }
        }
    };

    gridToInt()
    {
        let a = document.load_grid.grid.value;
        console.log(a);

        let int_grid = a.split(',').map(function(item) {
            return parseInt(item, 10);
        });

        return int_grid;
    }

    clearGrid()
    {
        document.load_grid.grid.value = null;
        document.load_grid.grid_size.value = null;
        document.load_grid.grid_size_x.value = null
        document.load_grid.grid_size_y.value = null;
        this.grid=[];
    }

    entryValidation()
    {
        let ok=1;
        let counter=1;

        let entry = parseInt(document.load_grid.entry.value);

        console.log(entry);
        if (this.grid.includes(entry))
        {
            ok=0;
        }

        for(let i=0; i< this.height;i++)
        {
            for (let j = 0; j <this.width; j++)
            {

                if(i>0 && i<(this.height)-1 && j>0 && j<(this.width)-1 )
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



}

createGrid = new CreateGrid();
