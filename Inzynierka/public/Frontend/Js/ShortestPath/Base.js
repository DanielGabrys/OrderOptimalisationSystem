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
    order=[];

    path_matrix;

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


                    base.colorize_selected(position)

                    arr.set(parseInt(key)+1,desired_position);
                    base.nodes=arr;

                    console.log(base.nodes);

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

                        base.decolorize_selected(position);
                        let row_to_delete = document.getElementById('trs' + key);
                        row_to_delete.parentElement.removeChild(row_to_delete);

                        let row_to_add = arr.delete(parseInt(key) + 1);
                        base.nodes = arr;

                        console.log(base.nodes);


                    });

                }
            });

        }
        //this.nodes=base.nodes;

    }



    setNodeGraph(map)
    {
        let array=[];


        //console.log(map);

        let counter =0;
        map.forEach (function(value)
        {
            array[counter]=value
            counter++;
        })

        //array.push(this.entry); //adding entry to array

        this.order=array;

    }

    setDikstraGraph()
    {

        let naive_array=[];
        for(let i=0;i<this.order.length;i++)
        {
            let arr2 = new Array(this.order.length);
            arr2.fill(0);

            for(let j=i;j<this.order.length;j++)
            {
                if(i!==j)
                {
                    this.dijkstra(this.graph,this.order[i],this.order[j]);
                    arr2[j]= this.steps;
                }
                else
                {
                    arr2[j] = 0; //diagonal
                }

            }

            naive_array[i]=arr2;
        }

        for(let i=0;i<this.order.length;i++)
        {
            for (let j = i; j < this.order.length; j++)
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

        this.distance=0;
        for(let i=0;i<this.final_path.length-1;i++)
        {
            let key = this.final_path[i]+"->"+this.final_path[i+1];

            let dist = this.dijkstra(this.graph,this.final_path[i],this.final_path[i+1])

            this.detailed_final_path.set(key,this.path);
            this.detailed_final_distances[i] = dist;

            this.distance+=dist;
            console.log(this.distance);
        }

      //  console.log(this.detailed_final_path);
    }

    create_result_table()
    {

        let table = document.getElementById("result_table");

        let counter =1;

        let dist = table.insertRow(0);
        dist.insertCell(0).innerHTML = this.distance.toString();

        for (const [key, value] of this.detailed_final_path)
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
            cell3.innerHTML = this.detailed_final_distances[counter-1];

            counter ++;

        };

        //console.log(this.detailed_final_distances);

    }

    getPathMatrix(path)
    {
        this.path_matrix=path;
        console.log(this.path_matrix);
    }

    loadExample(products)
    {
        let dictstring = JSON.stringify(document.getElementById("nodes").value);

        dictstring= dictstring.substring(1);
        dictstring= dictstring.substring(0,dictstring.length-1);
        let arr = dictstring.split(',');


        console.log(arr);

        for (let i=0;i<arr.length;i++)
        {

            this.colorize_selected(arr[i]);
            const found = products.filter(e => e.pivot.position == arr[i]);

            for (const key in found)
            {
                //console.log(arr[i], found);
                this.order.push(found[key]['pivot']['desired_position']);
            }

        }

        console.log("order",this.order);
    }


}

base = new Base();
