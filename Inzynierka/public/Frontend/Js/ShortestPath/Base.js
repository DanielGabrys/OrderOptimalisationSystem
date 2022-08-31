class Base extends DikstraGrid
{

    entry;
    nodes = new Map();
    node_graph;

    final_path = [];
    detailed_final_path = new Map();
    detailed_final_distances = [];

    distance = Infinity;
    calc_percentage = 0;

    addButtonlisteners(products)
    {

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

    setNodeGraph(map)
    {
        let array=[];
        let naive_array=[];


        //console.log(map);

        let counter =0;
        map.forEach (function(value)
        {
            array[counter]=value
            counter++;
        })

        //array.push(this.entry); //adding entry to array

        this.order=array;

        for(let i=0;i<array.length;i++)
        {
            let arr2 = new Array(array.length);
            arr2.fill(0);

            for(let j=i;j<array.length;j++)
            {
                if(i!==j)
                {
                    this.dijkstra(this.graph,array[i],array[j]);
                    arr2[j]= this.steps;
                }
                else
                {
                    arr2[j] = 0; //diagonal
                }

            }

            naive_array[i]=arr2;


        }

        for(let i=0;i<array.length;i++)
        {
            for (let j = i; j < array.length; j++)
            {
                naive_array[j][i]=naive_array[i][j];
            }
        }

        this.node_graph=naive_array
        console.log(this.node_graph);
    }


    colorize_selected(id)
    {
        document.getElementById(id).className="colorized_naive_cell";
    }

    decolorize_selected(id)
    {
        document.getElementById(id).className="product_cell";
    }

    getEntry(entry)
    {
        this.entry = parseInt(entry);
    }

    calculateDistance(arr)
    {

        let start = this.dijkstra(this.graph,this.entry,this.order[arr[0]]);
        let end = this.dijkstra(this.graph,this.order[arr[arr.length-1]],this.entry);

        let tepm_dist = start + end;
        for(let i=0;i<arr.length-1;i++)
        {
            tepm_dist+= this.node_graph[arr[i]][arr[i+1]];
            // console.log(this.node_graph[i][i+1])
        }

        return tepm_dist;
    }

    getNaivePath(arr)
    {
        let start = [this.entry];
        let path = [];

        for(let i=0;i<arr.length;i++)
        {

            path[i]=this.order[arr[i]];
        }

        return  start.concat(path,start);

    }

    getDetailedNaivePath()
    {

        for(let i=0;i<this.naive_path.length-1;i++)
        {
            let key = this.naive_path[i]+"->"+this.naive_path[i+1];

            let dist = this.dijkstra(this.graph,this.naive_path[i],this.naive_path[i+1])

            this.detailed_final_path.set(key,this.path);
            this.detailed_final_distances[i] = dist;
        }

        console.log(this.detailed_final_path);
    }

    create_result_table()
    {

        let table = document.getElementById("result_table");

        let counter =1;

        let dist = table.insertRow(0);
        dist.insertCell(0).innerHTML = this.distance.toString();

        this.detailed_final_path.forEach (function(value, key)
        {

            let rows = table.rows.length;

            let row = table.insertRow(rows);

            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);


            cell0.innerHTML = counter ;
            cell1.innerHTML = key;
            cell2.innerHTML = value;
            cell3.innerHTML = naive.detailed_final_distances[counter-1];

            counter ++;

        });

        console.log(this.detailed_final_distances);

    }

}
