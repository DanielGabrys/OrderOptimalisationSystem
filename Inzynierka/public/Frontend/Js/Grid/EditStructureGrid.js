class EditStructureGrid extends CreateGrid
{

    editSelectedGrid(elements)
    {
        let x =this.height;
        let y =this.width;

        this.grid_size = x * y;

        var arr = elements
        //console.log(elements);

        let size = this.size;

        let digits = (x*y).toString().length;
        if (digits<=1)
            digits=2;

        let block =''
        let counter = 1

        for (let rows = 0; rows < x; rows++)
        {
            for (let columns = 0; columns < y; columns++)
            {
                block +=
                    '<div id=' + counter + ' class="unselected_cell" onmousedown="editgridstructure.mouseDown('+counter+')" onmouseover="editgridstructure.mouseOVER('+counter+')" onmouseup="editgridstructure.mouseUp('+counter+')">'+counter+'</div>';
                counter++;

            };

        };

        let reload = document.getElementById("reload")
        reload.innerHTML = block
        reload.style.width=size*y+"px";
        reload.style.height=size*x+"px";



        counter =1;
        for (let rows = 0; rows < x; rows++)
        {
            for (let columns = 0; columns < y; columns++)
            {

                let cell=document.getElementById(counter.toString());

                if(arr[rows][columns]=="-1")
                {
                    cell.className = "selected_cell";
                    this.grid.push(counter);
                }
                if(arr[rows][columns]=="1")
                {
                    cell.className= "entry_cell";
                }

                cell.style.width=this.size +"px";
                cell.style.height=this.size +"px";
                cell.style.fontSize = this.size/(digits)+"px"

                counter++;

            };

        };

        this.calHintsandColorisation();

    };

    getHints(position_id)
    {
        // console.log(cell);
        const found = this.products_positions.filter(e => e.pivot.position === position_id);

        //if(found.length>0)
        //console.log(found);

        let name='';
        let text='';
        let counter =0;

        for (const key in found)
        {
            name = '<p>' + found[key]['name']+ '</p>';
            text += '<h6>' + found[key]['name'] + '</h6>';

            counter ++;
        }


        if(counter>0)
        {
            let hint = document.getElementById(position_id);
            //console.log(hint);
            let tooltip = new bootstrap.Tooltip(hint,
                {
                    title: text,
                    placement: "bottom",
                    html: true,

                });
        }

    }

    colorizeProductsOnGrid(id)
    {

        const found = this.products_positions.filter(e => e.pivot.position === id);

      //  console.log(this.products_positions,id,found);
        if(found.length>0)
        {
            document.getElementById(id).className="product_cell";

        }
    }

    calHintsandColorisation()
    {
        let counter=1;
        for (let rows = 0; rows < this.height; rows++)
        {
            for (let columns = 0; columns < this.width; columns++)
            {
                this.getHints(counter);
                this.colorizeProductsOnGrid(counter);

                counter++;

            }


        };
    }

    mouseDown(id)
    {
        if(document.getElementById(id).className !== "product_cell")
        {
            if (document.getElementById(id).className !== "selected_cell" && !this.grid.includes(id)) {
                this.grid.push(id);
                document.getElementById(id).className = "selected_cell";

                this.markdown = 1;
                this.markup = 0;
            } else {
                if (document.getElementById(id).className === "selected_cell") {
                    this.grid.splice(this.grid.indexOf(id), 1)
                }
                document.getElementById(id).className = "unselected_cell";

                this.markup = 1;
                this.markdown = 0;
            }
        }
        //console.log(markdown+" "+markup);
    };

    mouseUp(id)
    {
        this.markdown=0;
        this.markup=0;
        //console.log(markdown+" "+markup);
        this.clearSelection();
    };

    mouseOVER(id)
    {
        if(document.getElementById(id).className !== "product_cell")
        {
            if (this.markdown === 1 && this.markup === 0) {
                if (document.getElementById(id).className !== "selected_cell" && !this.grid.includes(id)) {
                    this.grid.push(id);
                }
                document.getElementById(id).className = "selected_cell";

            }
            if (this.markup === 1 && this.markdown === 0) {
                if (document.getElementById(id).className === "selected_cell") {
                    this.grid.splice(this.grid.indexOf(id), 1)
                }
                document.getElementById(id).className = "unselected_cell";

            }
            //console.log(markdown+" "+markup);
            //console.log(this.grid);
            this.clearSelection();
        }

    };


}



