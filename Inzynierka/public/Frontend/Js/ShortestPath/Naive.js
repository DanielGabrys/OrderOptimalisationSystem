class Naive extends DikstraGrid
{

    nodes =new Map();
    weights =[];
    node_graph={};

    addButtonlisteners(products)
    {

        let load_button = document.getElementById("load");
        load_button.addEventListener('click',function ()
            {
                console.log(naive.nodes);
            }
        );

       let  arr = new Map();

        for (const key in products)
        {

            let table = document.getElementById("selection_table");
            let element = document.getElementById("bt"+key);


            element.addEventListener("click", function()
            {
                //this.nodes.push(products[key]['pivot']['desired_position']);

                if(!arr.has(parseInt(key)+1))
                {
                    let desired_position= products[key]['pivot']['desired_position'];
                    let position= products[key]['pivot']['position'];


                    naive.colorize_selected(position)

                    arr.set(parseInt(key)+1,desired_position);
                    naive.nodes=arr;

                    // console.log(naive.nodes);

                    let rows = table.rows.length;
                    let row = table.insertRow(rows);
                    row.id = "trs" + key;

                    let cell0 = row.insertCell(0)
                    let cell1 = row.insertCell(1);
                    let cell2 = row.insertCell(2);
                    let cell3 = row.insertCell(3);
                    let cell4 = row.insertCell(4);

                    cell0.innerHTML = (parseInt(key) + 1).toString();
                    cell1.innerHTML = products[key]['name'];
                    cell2.innerHTML = position;
                    cell3.innerHTML = desired_position;
                    cell4.innerHTML = '<button type="button" id="btr' + key + '" class="btn btn-primary mb-2" >DELETE</button>';


                    document.getElementById("btr" + key).addEventListener("click", function ()
                    {

                        naive.decolorize_selected(position);
                        let row_to_delete = document.getElementById('trs' + key);
                        row_to_delete.parentElement.removeChild(row_to_delete);

                        let row_to_add = arr.delete(parseInt(key) + 1);
                        naive.nodes = arr;

                        // console.log(naive.nodes);


                    });

                }
            });

        }

    }

    setNodeGraph(node_arr)
    {
      for(let i=0;i<node_arr.length;i++)
      {
          for(let j=i+1;j<node_arr.length;j++)
          {
              this.dijkstra(this.graph,node_arr[i],node_arr[j])
              this.node_graph[i][i]=0; //diagonal
              this.node_graph[i][j]= this.steps;
          }
      }

      console.log(this.node_graph);
    }


    colorize_selected(id)
    {
        document.getElementById(id).className="colorized_naive_cell";
        console.log("b");
    }

    decolorize_selected(id)
    {
        document.getElementById(id).className="product_cell";
    }
}

naive = new Naive();

