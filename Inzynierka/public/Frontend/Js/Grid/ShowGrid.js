class ShowGrid extends ProductsGrid
{
    showSelectedGrid(X,Y,elements,)
    {
        var arr = JSON.parse(elements);

        document.getElementById("reload").innerHTML='';
        let counter = 1



        for (let rows = 0; rows < parseInt(X); rows++)
        {
            for (let columns = 0; columns < parseInt(Y); columns++)
            {
                document.getElementById("reload").innerHTML +=
                    '<div id=' + counter + ' class="unselected_cell" >'+counter+'</div>';

                let cell=document.getElementById(counter.toString());

                if(arr[rows][columns]=="-1")
                {
                    cell.className = "selected_cell";
                }
                if(arr[rows][columns]=="1")
                {
                    cell.className= "entry_cell";
                }

                cell.style.width=this.size +"px";
                cell.style.height=this.size +"px";

                let digits = (this.height*this.width).toString().length;
                if (digits<=1)
                    digits=2;

                cell.style.fontSize = this.size/(digits)+"px"

                counter++;
            };

        };

    };

    getHints(grid_id,products_grids)
    {
        const id = this.products_positions.filter(e => e.id === parseInt(grid_id));
        //console.log(id);
        let arr = id[0].products;

        let arr2 ={};
        for(let i=0;i<arr.length;i++)
        {


            let position = arr[i].pivot.position
            let name = arr[i].name;

            if(arr2[position] ==null)
                arr2[position] = '<h6>' + name+ '</h6>';
            else
            {
                arr2[position] += '<h6>' + name+ '</h6>';
            }

        }
           // console.log(arr2);

        for (const key in arr2)
        {
            let id=`${key}`;
            let name = `${arr2[key]}`;

            console.log(`${key} => ${arr2[key]}`,id,name);


            let hint = document.getElementById(id);
            console.log(hint,id);
            let tooltip = new bootstrap.Tooltip(hint,
                {
                    title: name,
                    placement: "bottom",
                    html: true,
                });

            this.colorizeProductsOnGrid(id);

        }

    }

    colorizeProductsOnGrid(id)
    {
        document.getElementById(id).className="product_cell";

    }
}


