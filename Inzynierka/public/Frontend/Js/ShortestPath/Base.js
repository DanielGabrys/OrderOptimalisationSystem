class Base extends DikstraGrid
{

    entry;
    nodes = new Map();

    final_path = [];
    raw_final_path =[]
    detailed_final_path = new Map();
    detailed_final_path_array = [];
    detailed_final_distances = [];

    distance = Infinity;
    order=[];
    node_order= new Map;

    path_matrix;
    final_path_indexes=[];
    colorizesProducts="";


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

    colorize_selected(id)
    {
        document.getElementById(id).className="colorized_naive_cell";
        this.colorizesProducts+=id+",";
    }

    decolorize_selected(id)
    {
        document.getElementById(id).className="product_cell";
    }

    getEntry(entry)
    {
        this.entry = parseInt(entry);
    }

    getFinalPath(arr)
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
        console.log(this.final_path);
        for(let i=0;i<this.final_path.length-1;i++)
        {
            let key = this.final_path[i]+"->"+this.final_path[i+1];
            let dist = this.getNodesDistance(this.final_path[i],this.final_path[i+1])
            this.getBFSShortestPath(this.BFSGraph, parseInt(this.final_path[i]),parseInt(this.final_path[i+1]))

            this.detailed_final_path.set(key,this.path);
            this.detailed_final_path_array[i]=this.path;
            this.final_path_indexes.push(key);

            this.detailed_final_distances[i] = dist;

            this.distance+=dist;
        }

      //console.log("elo",this.detailed_final_path);
    }

    create_result_table()
    {

        console.log(this.detailed_final_path,this.final_path_indexes);
        let table = document.getElementById("result_table");

        let counter =1;

        let dist = table.insertRow(0);
        dist.insertCell(0).innerHTML = this.distance.toString();

        //path.insertCell(0).innerHTML = this.finalPathToString(this.final_path);

        for(let i=0;i<this.final_path_indexes.length;i++)
        //for (const [key, value] of this.detailed_final_path)
        {
            let rows = table.rows.length;

            let row = table.insertRow(rows);
            row.id="detailed_path"+i;

            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);


            cell0.innerHTML = counter ;
            cell1.innerHTML = this.final_path_indexes[i];
            cell2.innerHTML = this.detailed_final_path.get(this.final_path_indexes[i]);
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
                if(! (this.order.includes(found[key]['pivot']['desired_position'])))
                this.order.push(found[key]['pivot']['desired_position']);
            }

        }

        console.log("order",this.order);
        console.log("distring",this.order);
    }

    loadExample2(products)
    {
        let dictstring = JSON.stringify(document.getElementById("nodes").value);

        dictstring= dictstring.substring(1);
        dictstring= dictstring.substring(0,dictstring.length-1);
        let arr = dictstring.split(',');


        console.log(arr);

        for (let i=0;i<arr.length;i++)
        {

            this.colorize_selected(parseInt(arr[i]));
            this.order.push(parseInt(arr[i]))

        }

        console.log("order",this.order);
        console.log("distring",this.order);
    }

    getNodesDistance(a,b)
    {
        if(a===b)
            return 0;
        let key =a+"->"+b;
        let key2 =b+"->"+a;
        if(!(key in this.path_matrix))
        {
            return this.path_matrix[key2];
        }
        else
        {
            return this.path_matrix[key];
        }
    }

    finalPathToString(array)
    {
        let str ="";
        for(let i=0;i<array.length;i++)
        {
            str+=array[i]+',';
        }
        console.log(str);
        return str;
    }

    finalPathByNodesToString(array)
    {
        let str ="";
        for(let i=1;i<array.length-1;i++)
        {
            str+=this.node_order.get(parseInt(this.final_final_path[i]))+',';
        }
        console.log(str);
        return str;
    }

    loadRandom(x)
    {
        if(x>0)
        {

            let array=[];
            let randomized =[];
            for (const key in this.products_positions)
            {
                let pos = this.products_positions[key]['pivot']['position'];

                if(!array.includes(pos))
                {
                    array.push(pos);
                }
            }

            for(let i=0;i<x;i++)
            {
                let random = Math.floor((Math.random()*array.length));
                randomized.push(array[random]);
                array.splice(random,1);

            }

            // console.log(array);
            // console.log(randomized);

            for (let i=0;i<randomized.length;i++)
            {

                this.colorize_selected(randomized[i]);


                const found = this.products_positions.filter(e => e.pivot.position == randomized[i]);

                for (const key in found)
                {
                    // console.log(arr[i], found);
                    let pos = found[key]['pivot']['desired_position'];

                    if(! (this.order.includes(pos)))
                    this.order.push(pos);

                    this.node_order.set(pos,randomized[i])
                }

            }

        }
    }

    ColorizeFinalPathByStep(id)
    {

        for (let i = 0; i <= this.detailed_final_path_array.length; i++)
        {
          this.colorizeSinglePathNodes(id,this.detailed_final_path_array[i])
        }
    }


    colorizeSinglePathNodes(id,sign)
    {
        this.decolorizeSinglePathNodes();

        let index=0;
        if(sign===1)
            index = parseInt(id)+1;
        else if(sign===0)
            index= parseInt(id)-1


        document.getElementById("path_etape").setAttribute("value", index.toString());

        for (let i =0; i<index; i++)
        {
            for (let j = 0; j < this.detailed_final_path_array[i].length; j++)
            {
                let way = document.getElementById(this.detailed_final_path_array[i][j]).className = "path_cell";
            }
        }
    }

    decolorizeSinglePathNodes()
    {

        for (let i =0; i<this.detailed_final_path_array.length; i++)
        {

            for (let j = 0; j < this.detailed_final_path_array[i].length; j++)
            {
                //console.log(i,j,this.detailed_final_path_array[i]);
                let way = document.getElementById(this.detailed_final_path_array[i][j]).className = "unselected_cell";
            }
        }
    }

}

base = new Base();
