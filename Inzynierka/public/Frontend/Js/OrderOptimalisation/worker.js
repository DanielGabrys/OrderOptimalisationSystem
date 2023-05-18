class BasicGrid2
{
    width=0; // rows
    height=0; //columns
    size=0; // px

    shelfs={};
    products_positions={};

    getProductsData(products_positions,shelfs)
    {
        this.products_positions=products_positions;
        this.shelfs=shelfs;
    }

    setSize(height,width,size)
    {
        this.height = height;
        this.width = width;
        this.size = size / this.width;

        let reload =document.getElementById("reload");
        reload.innerHTML='';
        reload.style.width=this.size*width+"px";
        reload.style.height=this.size*height+"px";
    }

    generateGridCells(x,y,counter)
    {
        let counter0  =parseInt(counter)-1;

        let counter2  =parseInt(counter0/y);
        let counter3  =parseInt(counter0%y);

        //console.log(x,y,counter,counter2,counter3,this.shelfs[counter2][counter3]);

        if(this.shelfs[counter2][counter3]=="-1")
        {
            document.getElementById("b"+counter).innerHTML += '<div id=' + counter + ' class="selected_cell" >'+counter+'</div>';
        }
        else  if(this.shelfs[counter2][counter3]=="1")
        {
            document.getElementById("b"+counter).innerHTML += '<div id=' + counter + ' class="entry_cell" >'+counter+'</div>';
            document.getElementById("a"+counter).setAttribute('href',"#");
        }
        else
        {
            document.getElementById("b"+counter).innerHTML +='<div id=' + counter + ' class="unselected_cell" >'+counter+'</div>';
            document.getElementById("a"+counter).setAttribute('href',"#");
        }

        let cell = document.getElementById("b"+counter);
        cell.style.width=this.size +"px";
        cell.style.height=this.size +"px";

        let cell2 = document.getElementById(counter);
        cell2.style.width=this.size +"px";
        cell2.style.height=this.size +"px";


        let digits = (this.height*this.width).toString().length;
        if (digits<=1)
            digits=2;

        cell.style.fontSize = this.size/(digits)+"px"
        cell2.style.fontSize = this.size/(digits)+"px"


    }

}

class ProductsGrid2 extends BasicGrid2
{
    colorized_id="0";
    colorized_class_name="";

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
            text += '<h6>' + found[key]['id'] + '</h6>';

            counter ++;
        }



        if(counter>0)
        {
            let hint = document.getElementById("b" + position_id);
            let tooltip = new bootstrap.Tooltip(hint,
                {
                    title: text,
                    placement: "bottom",
                    html: true,

                });
        }

    }

    colorizeSelectedCell(id)
    {

        if(this.colorized_id!=="0")
            document.getElementById(this.colorized_id).className="product_cell";

        this.colorized_id= id;

        document.getElementById(id).className="colorized_cell";
    }

    colorizeProductsOnGrid(id)
    {
        const found = this.products_positions.filter(e => e.pivot.position === id);

        if(found.length>0)
        {
            document.getElementById(id).className="product_cell";

        }
    }
}

class DikstraGrid2 extends ProductsGrid2
{

    graph = {};
    BFSGraph ={};
    graphToExport =[];
    neighborhood_map = {};

    path_array = {};

    start = 0;
    end = 0;
    path = 0;
    steps = 0;
    interval_counter

    shelvesToGraph() {

        let counter = 1;
        let shelves = this.shelfs;
        let X = this.height;
        let Y = this.width;
        let graph = {};
        // initialize graph with zero
        for (let i = 0; i < X; i++)
        {
            for (let j = 0; j < Y; j++)
            {
                if (shelves[i][j] !== -1)
                {
                    let graphToExport = {};
                    graph[counter]={};
                    graphToExport["id"] = counter;
                    graphToExport["neighbours"] = [];

                    //up connected node
                    if (i !== 0 && shelves[i - 1][j] !== -1) {
                        graph[counter][counter - Y] = 1;
                        //graphToExport["neighbours"].push(counter - Y);
                    }

                    //console.log(i,j,X,Y,counter,shelves[i][j] )
                    //down connected node
                    if (i !== X - 1 && shelves[i + 1][j] !== -1) {
                        graph[counter][counter + Y] = 1;
                        graphToExport["neighbours"].push(counter + Y);
                    }
                    //left connected node
                    if (j !== 0 && shelves[i][j - 1] !== -1) {
                        graph[counter][counter - 1] = 1;
                        //graphToExport["neighbours"].push(counter - 1);
                    }
                    //right connected node
                    if (j !== Y - 1 && shelves[i][j + 1] !== -1) {
                        graph[counter][counter + 1] = 1;
                        graphToExport["neighbours"].push(counter + 1);
                    }
                    this.graphToExport.push(graphToExport);


                }
                counter++;
            }
            this.graph = graph;
        }
        this.initialiseBFSEdges();
        //console.log(shelves,this.graph);
        //console.log(this.graphToExport)

    }

    shelvesToNeighborhoodMap()
    {
        let counter =0;
        //console.log(this.graph);
        for (const key in this.graph)
        {
            for (const key2 in this.graph)
            {
                if(key !== key2)
                {
                    let dist =0;
                    let name = key + "->" + key2;
                    let name_reverse = key2 + "->" + key;

                    if(name_reverse in this.neighborhood_map)
                    {

                        dist = this.neighborhood_map[name_reverse];
                    }
                    else
                    {
                        dist = this.dijkstra(this.graph, key, key2)
                    }
                    this.neighborhood_map[name]=dist;

                    counter++;
                    // console.log(counter);
                }

            }
        }

        let dictstring = JSON.stringify(this.neighborhood_map);
        let size = Object.keys(this.neighborhood_map).length;

        console.log(dictstring);
        //console.log(this.neighborhood_map,size);


        document.getElementById("json_matrix").setAttribute('value',dictstring);
    }

    printTable = (table) => {
        return Object.keys(table)
            .map((vertex) => {
                var {vertex: from, cost} = table[vertex];
                return `${vertex}: ${cost} via ${from}`;
            })
            .join("\n");
    };

    tracePath = (table, start, end) => {
        let path = [];
        let next = end;
        while (true) {
            path.unshift(next);
            if (next === start) {
                break;
            }
            next = table[next].vertex;
        }

        return path;
    };

    formatGraph = (g) => {
        const tmp = {};
        Object.keys(g).forEach((k) => {
            const obj = g[k];
            const arr = [];
            Object.keys(obj).forEach((v) => arr.push({vertex: v, cost: obj[v]}));
            tmp[k] = arr;
        });
        return tmp;
    };

    dijkstra = (graph, start, end) => {
        let map = this.formatGraph(this.graph);
        //console.log(map);

        let visited = [];
        let unvisited = [start];
        let shortestDistances = {[start]: {vertex: start, cost: 0}};

        let vertex;
        while ((vertex = unvisited.shift())) {
            // console.log(visited);
            // Explore unvisited neighbors
            var neighbors = map[vertex].filter((n) => !visited.includes(n.vertex));

            // Add neighbors to the unvisited list
            unvisited.push(...neighbors.map((n) => n.vertex));

            var costToVertex = shortestDistances[vertex].cost;

            for (let {vertex: to, cost} of neighbors) {
                var currCostToNeighbor =
                    shortestDistances[to] && shortestDistances[to].cost;
                var newCostToNeighbor = costToVertex + cost;
                if (
                    currCostToNeighbor == undefined ||
                    newCostToNeighbor < currCostToNeighbor
                ) {
                    // Update the table
                    shortestDistances[to] = {vertex, cost: newCostToNeighbor};
                }
            }

            visited.push(vertex);
        }

        //console.log("Table of costs:");
        //console.log(printTable(shortestDistances));

        const path = this.tracePath(shortestDistances, start, end);

        /*
        console.log(
            "Shortest path is: ",
            path.join(" -> "),
            " with weight ",
            shortestDistances[end].cost
        );

         */

        this.steps = shortestDistances[end].cost;
        this.path = path.join(" -> ");
        this.path_array = path;

        return this.steps;


    };

    getShortestDistance() {
        return this.steps;
    }

    getPath() {
        return this.path;
    }

    getStart() {
        return this.start;
    }

    getEnd() {
        return this.end;
    }

    setStartEnd(s, e)
    {
        this.start = s;
        this.end = e;

        this.clearColorize();
        this.getBFSShortestPath(this.BFSGraph,parseInt(s),parseInt(e))
        this.setTableData();
        this.colorizePath();
    }

    setTableData() {
        document.getElementById("start_table").innerHTML = this.getStart().toString();
        document.getElementById("end_table").innerHTML = this.getEnd().toString();
        document.getElementById("steps").innerHTML = this.getShortestDistance().toString();
        document.getElementById("path").innerHTML = this.getPath().toString();
    }

    colorizePath()
    {
        for(let i=0; i<this.path.length;i++)
            setTimeout(this.change, 200*i,i,this.path);
    }

    change(i,p)
    {
        //console.log(i,p);
        document.getElementById(p[i]).className = "path_cell";
    }

    clearColorize()
    {

        for (let i = 1; i <= this.path_array.length ?? 0; i++) {
            document.getElementById(this.path_array[i - 1]).className = "unselected_cell";
        }
        this.path_array = {};
    }


    //// BFS search


    addEdge(u, v,neighbors)
    {
        if (neighbors[u] === undefined) {  // Add the edge u -> v.
            neighbors[u] = [];
        }
        neighbors[u].push(v);
        if (neighbors[v] === undefined)
        {  // Also add the edge v -> u in order
            neighbors[v] = [];               // to implement an undirected graph.
        }                                  // For a directed graph, delete
        neighbors[v].push(u);              // these four lines.
    };


    initialiseBFSEdges()
    {
        let graph = {};
        let neighbors = this.neighbors = {};

        for(let i=0;i<this.graphToExport.length;i++)
        {
            let key = this.graphToExport[i]["id"];
            let next = this.graphToExport[i]["neighbours"];

            for (let j = 0; j < next.length; j++)
            {
                this.addEdge(key, next[j],neighbors);
            }
        }
        graph.neighbors = neighbors;
        this.BFSGraph = graph;
        // console.log("bts",graph);

    };

    getBFSShortestPath(graph,start,end)
    {
        this.steps= this.bfs(graph, start,end);
        this.path=this.shortestPath(graph, start, end);
    }

    bfs(graph, source,end)
    {
        let queue = [ { vertex: source, count: 0 } ]
        let visited = { source: true }
        let tail = 0;

        while (tail < queue.length)
        {
            let u = queue[tail].vertex, count = queue[tail++].count;  // Pop a vertex off the queue.
            // console.log('distance from ' + source + ' to ' + u + ': ' + count);
            //  console.log(queue)
            // console.log(u,count)
            if(u==end)
                return count;

            graph.neighbors[u].forEach(function (v)
            {
                if (!visited[v])
                {
                    visited[v] = true;
                    queue.push({ vertex: v, count: count + 1 });
                }
            });



        }

    }

    shortestPath(graph, source, target)
    {
        let queue = [ source ]
        let visited = { source: true }
        let predecessor = {}
        let tail = 0

        while (tail < queue.length)
        {
            let u = queue[tail++]  // Pop a vertex off the queue.
            let neighbors = graph.neighbors[u];
            // console.log(queue,visited,tail)

            for (var i = 0; i < neighbors.length; ++i)
            {
                let v = neighbors[i];
                if (visited[v])
                {
                    continue;
                }
                visited[v] = true;
                if (v === target)
                {   // Check if the path is complete.
                    var path = [ v ];   // If so, backtrack through the path.
                    while (u !== source)
                    {
                        path.push(u);
                        //   console.log(path,predecessor);
                        u = predecessor[u];
                    }
                    path.push(u);
                    path.reverse();
                    return path;
                }
                predecessor[v] = u;
                queue.push(v);
            }
        }
        //console.log('there is no path from ' + source + ' to ' + target);
        return 0;
    }


}

class Base2 extends DikstraGrid2
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
        //console.log(this.final_path);
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
        return this.detailed_final_path

        //console.log("elo",this.detailed_final_path);
    }

    getDetailedNaivePathOrder(order)
    {
        this.distance=0;
        //console.log(this.final_path);
        for(let i=0;i<order.length-1;i++)
        {
            let key = order[i]+"->"+order[i+1];
            let dist = this.getNodesDistance(order[i],order[i+1])
            this.getBFSShortestPath(this.BFSGraph, order[i],order[i+1])

            this.detailed_final_path.set(key,this.path);
            this.detailed_final_path_array[i]=this.path;
            this.final_path_indexes.push(key);

            this.detailed_final_distances[i] = dist;

            this.distance+=dist;
        }
        return this.detailed_final_path_array

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
        //this.decolorizeSinglePathNodes();

        let index=0;
        if(sign===1)
            index = parseInt(id)+1;
        else if(sign===0)
            index= parseInt(id)-1


        document.getElementById("path_etape").setAttribute("value", index.toString());

        for (let i =0; i<index; i++)
        {
            for (let j = 1; j < this.detailed_final_path_array[i].length-1; j++)
            {
                let way = document.getElementById(this.detailed_final_path_array[i][j])
                way.className = "path_cell";

            }

            let way = document.getElementById(this.detailed_final_path_array[i][0])
            way.style.background="grey"
            way.style.fontsize = "10px"
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

class Naive2 extends Base2
{
    node_graph;

    nextOrder()
    {

        let counter =1;
        let arr =[];
        for(let i=0;i<this.order.length;i++)
        {
            arr[i]=i;
        }

        while(true)
        {

            let index = arr[0];

            if (index === arr.length - 1) {
                console.log('finished');
                break;
            }

            // console.log(arr);


            counter++;

            // console.log(counter, arr);

            // if (arr[arr.length - 1] > index)


            //let temp_dist = this.calculateDistance(arr);
            let temp_dist= this.calculateDistanceFromFile(arr);

            if (temp_dist < this.distance)
            {
                this.distance = temp_dist;
                this.final_path = this.getFinalPath(arr);
                //console.log("elo",this.final_path);
            }

            console.log(arr,temp_dist,this.distance,this.final_path);

            // STEP 1 of the algorithm
            let largestI = -1;
            for (let i = 0; i < arr.length - 1; i++)
            {
                if (arr[i] < arr[i + 1]) {
                    largestI = i;
                }
            }

            // STEP 2
            let largestJ = -1;
            for (let j = 0; j < arr.length; j++)
            {
                if (arr[largestI] < arr[j]) {
                    largestJ = j;
                }
            }

            // STEP 3

            this.swap(arr, largestI, largestJ);


            // STEP 4: reverse from largestI + 1 to the end

            let endArray = arr.splice(largestI + 1);
            endArray.reverse();
            arr = arr.concat(endArray);

        }

        this.getDetailedNaivePath();
        this.create_result_table();

        console.log(this.distance,this.final_path);

    }

    swap(a,i,j)
    {
        let temp =a[i];
        a[i]=a[j];
        a[j]=temp;
    }

    naive()
    {
        let load_button = document.getElementById("load");
        load_button.addEventListener('click',function ()
            {
                naive.nodes = base.nodes;
                console.log(naive.nodes);
                naive.setNodeGraph(naive.nodes);
                // naive.setDikstraGraph();
                naive.nextOrder();

            }
        );
    }

    naive2()
    {
        naive.nextOrder();
    }

    setOrderInArray(map)
    {
        let array=[];

        let counter =0;
        map.forEach (function(value)
        {
            array[counter]=value
            counter++;
        })

        this.order=array;
    }

    calculateDistanceFromFile(arr)
    {
        let start_name = this.entry + "->" + this.order[arr[0]];
        let end_name =   this.order[arr[arr.length-1]] + "->" +  this.entry ;

        let reverse_start_name = this.order[arr[0]]+ "->"+ this.entry;
        let reverse_end_name =   this.entry+"->" +this.order[arr[arr.length-1]] ;

        console.log(start_name,end_name)
        if(!(start_name in this.path_matrix))
        {
            start_name = reverse_start_name;

        }

        if(!(end_name in this.path_matrix))
        {
            end_name = reverse_end_name;
        }
        console.log(start_name);


        let start = this.path_matrix[start_name];
        let end = this.path_matrix[end_name];

        let tepm_dist = start + end;

        for(let i=0;i<arr.length-1;i++)
        {

            let name = this.order[arr[i]] + "->" + this.order[arr[i+1]];
            let reverse_name = this.order[arr[i+1]] + "->" + this.order[arr[i]];

            if(!(this.path_matrix.hasOwnProperty(name)))
                name=reverse_name;

            tepm_dist+= this.path_matrix[name];

        }

        console.log(tepm_dist,arr);
        return tepm_dist;
    }

    getPathMatrix(path)
    {
        this.path_matrix=path;
    }

}

class RectangleDivision2 extends Naive2
{

    center_x;
    center_y;
    RecDivider = 2;

    rectangles = {};
    result =[];
    checking_indexes =[];
    indexes_counter=0;

    detailedKeyPathArray;


    constructor()
    {
        super();
        let x_devider = this.width / this.RecDivider //pionowo
        let y_devider = this.height / this.RecDivider //poziomo

        this.resetRectangle();
    }

    resetRectangle()
    {
        this.rectangles["one"] = {};
        this.rectangles["one"]["position"] = {};
        this.rectangles["two"] = {};
        this.rectangles["two"]["position"] = {};
        this.rectangles["three"] = {};
        this.rectangles["three"]["position"] = {};
        this.rectangles["four"] = {};
        this.rectangles["four"]["position"] = {};
    }

    divideGrid()
    {
        // console.log(this.order)


        this.center_x = this.width / 2 + 1;
        this.center_y = -this.height / 2;

        this.calculatePoints("position",this.center_x,this.center_y);
        this.minimumNode();
        //console.log(this.rectangles);
        //this.calculateNewCentralPoints();

        // this.detailedKeyPathArray = this.createDetailedMatrix();
        this.calculateDistanceFromRegionCenter();
        // console.log(this.rectangles);

        this.sort();
        //console.log(this.rectangles);

        let result = new Array(4);

        result[0] = [this.entry].concat(this.getFinalResult("one"));
        result[1] = this.result.concat(this.getFinalResult("two"));
        result[2] = this.result.concat(this.getFinalResult("three"));
        result[3] = this.result.concat(this.getFinalResult("four"));
        result[3].push(this.entry);

        // console.log(result);

        for(let i=0;i<4;i++)
        {
            this.final_path=this.final_path.concat(result[i]);
        }

        this.getFinalDistance();
        this.doTwoOpt();
        // console.log("bestie",this.distance,this.final_path);



    }

    createResults()
    {
        this.getRawFinalPath();
        this.getFinalDistance();
        this.getDetailedNaivePath();
        this.create_result_table();

        //console.log("final",this.final_path);
        //this.finalPathToString(this.final_path);
        //this.finalPathByNodesToString(this.final_path)
    }

    calculatePoints(pos,center_x,center_y)
    {
        for (let i = 0; i < this.order.length; i++)
        {
            let position = this.calculatePositionXY(this.order[i]);
            let dist = this.calculatePointsDistance(this.order[i], center_x, center_y);
            // console.log(position["x"],position["y"],dist,this.center_x,this.center_y);


            switch (true) {
                case ( position["x"] <= center_x && position["y"] < center_y):
                {
                    this.rectangles["one"][pos][this.order[i]] = dist;
                }
                    break;

                case (position["x"] > center_x && position["y"] < center_y): {
                    this.rectangles["two"][pos][this.order[i]] = dist;
                }
                    break;


                case (position["x"] >= center_x && position["y"] >= center_y): {
                    this.rectangles["three"][pos][this.order[i]] = dist;
                }
                    break;

                case (position["x"] < center_x && position["y"] >= center_y): {
                    this.rectangles["four"][pos][this.order[i]] = dist;
                }
                    break;
            }
        }
    }

    calculateDistanceFromRegionCenter()
    {
        for (const key in this.rectangles)
        {

            for (const key2 in this.rectangles[key]["position"]) {
                if (this.rectangles[key]["min"] === key2)
                {
                    this.rectangles[key]["position"][key2] = 0;
                }
                else
                {
                    //let name = this.rectangles[key]["min"] + "->" + key2
                    this.rectangles[key]["position"][key2] = this.getNodesDistance(this.rectangles[key]["min"],key2);

                }


            }
        }
    }

    calculatePointsDistance(node, c_x, c_y) {

        let position = this.calculatePositionXY(node)

        let dist = Math.sqrt((c_x - position["x"]) * (c_x - position["x"]) + (c_y - position["y"]) * (c_y - position["y"])).toFixed(2);

        return dist;
    }

    calculatePositionXY(node)
    {
        let position = {}

        let x1 = Math.floor((node - 1) / this.width);
        let x2 = ((node - 1) % this.width);

        position["x"]= x2
        position["y"] = -(x1 + 1);

        return position;
    }

    minimumNode()
    {
        for (const key in this.rectangles)
        {
            let minimum = Infinity;

            let index_of_min = 0;

            for (const key2 in this.rectangles[key]["position"])
            {

                let element = parseInt(this.rectangles[key]["position"][key2]);
                if (element < minimum)
                {
                    minimum = this.rectangles[key]["position"][key2];
                    index_of_min = key2;
                }
            }
            this.rectangles[key]["min"] = index_of_min;
            this.rectangles[key]["min_value"] = minimum;
            this.rectangles[key][index_of_min] = minimum;
        }

    }

    sort()
    {
        for (const key in this.rectangles)
        {
            let area = {};
            let sortable = [];
            for (const node in this.rectangles[key]["position"])
            {
                sortable.push([node, this.rectangles[key]["position"][node]]);
            }

            sortable.sort(function(a, b)
            {
                return a[1] - b[1];
            });

            //console.log(sortable);
            let objSorted = {};

            this.rectangles[key]["position"] = {};

            for(let i=0;i<sortable.length;i++)
            {
                this.rectangles[key]["position"][i] = sortable[i][0];

            }

            //  console.log(this.rectangles[key])



        }

        // console.log(this.rectangles);
        // console.log(this.result);
    }

    getFinalResult(field)
    {
        let arr=[];
        for (const key in this.rectangles)
        {
            if(key===field)
            {

                let found=this.rectangles[key]["position"];

                if(Object.keys(found).length !== 0)
                {
                    this.checking_indexes.push(this.indexes_counter);
                }

                for (const key2 in found)
                {
                    arr.push(parseInt(found[key2]));
                    this.indexes_counter++;

                }

                if(key==="three" || key==="one")
                {
                    arr.reverse();
                }

            }
        }

        return arr;
    }

    getPathMatrix(path)
    {
        this.path_matrix=path;
        // console.log(this.path_matrix);
    }

    createDetailedMatrix()
    {
        let arr = [];
        for (let i=0; i<this.order.length;i++)
        {
            for (let j=0; j<this.order.length;j++)
            {

                if(i!==j)
                {
                    let key =this.order[i]+"->"+this.order[j];
                    arr.push(key);
                }

            }
        }

        return arr;

    }

    getFinalDistance()
    {
        let dist =0;
        for(let i=0;i<this.final_path.length-1;i++)
        {
            dist+= this.getNodesDistance(this.final_path[i],this.final_path[i+1]);
        }

        this.distance=dist;
    }



    calculateFullDistance(arr)
    {
        let dist=0;
        for(let i=0;i<arr.length-1;i++)
        {
            let name = arr[i] + "->" + arr[i+1];

            if(arr[i] !== arr[i+1])
                dist+= this.getNodesDistance(arr[i],arr[i+1]);
            //console.log(name,this.path_matrix[name]);
        }
        return dist;
    }

    getRawFinalPath()
    {
        let temp=[];
        for(let i=0;i<this.final_path.length;i++)
        {
            temp[i]=this.final_path[i];
        }
        this.raw_final_path= temp.splice(1,temp.length-2);
    }

    doTwoOpt()
    {

        let improve=0;
        let is_improved =1
        while ( is_improved !==0 )
        {
            is_improved =0
            for (let i = 1; i < this.final_path.length - 1; i++)
            {
                for (let j = i + 1; j < this.final_path.length-1; j++) {
                    let new_route = this.TwoOptSwap(i, j)
                    let new_distance = this.calculateFullDistance(new_route)
                    if (new_distance < this.distance)
                    {
                        this.final_path = new_route
                        this.distance = new_distance
                        is_improved=1;
                        // break;
                    }
                }
            }
            // console.log("improved",this.final_path,this.distance)
        }
    }


    TwoOptSwap(i,k)
    {
        let new_tour =[]
        let size = this.final_path.length;

        // 1. take route[0] to route[i-1] and add them in order to new_route
        for ( let c = 0; c <= i - 1; c++ )
        {
            new_tour.push(this.final_path[c])
        }

        // 2. take route[i] to route[k] and add them in reverse order to new_route
        for ( let c = k; c >=i; c-- )
        {
            new_tour.push(this.final_path[c])
        }



        // 3. take route[k+1] to end and add them in order to new_route
        for ( let c = k + 1; c < size; ++c )
        {
            new_tour.push(this.final_path[c])
        }
        return new_tour
    }

}

class FarthestNeighbor2 extends RectangleDivision2
{

    getFarhestFinalDistanceArr(r)
    {
        let dist = 0;
        for (let i = 0; i < r.length - 1; i++) {
            dist += this.getNodesDistance(r[i], r[i + 1]);
        }
        // console.log(dist)
        return dist;
    }

    farthestInsertion(path_matrix,final_path,entry)
    {

        this.path_matrix = JSON.parse(JSON.stringify(path_matrix))

        this.route= [entry].concat(final_path,[entry])
        // console.log(this.route)
        let base = [this.route[0],this.route[0]];
        let left = this.route.slice(1, this.route.length - 1)

        // console.log(base,left,path_matrix)

        for (let i = 0; i < this.route.length - 2; i++)
        {
            //console.log(base,left)
            let node = this.findFarthest(base, left)
            this.putFarthest(base, node)
        }
        this.final_path=base

        this.getFarhestFinalDistanceArr(base)
        return base;
    }


    findFarthest(base, left) {

        if (left.length === 0)
            return 0;

        let max = -1;
        let max_id = -1;
        let max_index = -1;
        for (let i = 0; i < base.length-1; i++) {
            for (let j = 0; j < left.length; j++) {
                if (this.getNodesDistance(base[i], left[j]) > max) {
                    max = this.getNodesDistance(base[i], left[j])
                    max_id = left[j]
                    max_index = j;
                }
            }
        }

        // base.push(max_id)
        left.splice(max_index, 1)

        //console.log(base, left)
        return max_id;
    }

    putFarthest(base, node)
    {

        if (base.length === 1)
        {
            base.splice(1, 0, node)
        }
        else
        {

            let min = Infinity
            let min_index = -1;
            for (let i = 0; i < base.length - 1; i++) {
                let dist = this.getNodesDistance(base[i], node) + this.getNodesDistance(node, base[i + 1]) - this.getNodesDistance(base[i], base[i + 1])
                if (dist < min) {
                    min_index = i
                    min = dist
                }
            }
            base.splice(min_index + 1, 0, node)
        }
        //  console.log(base, node)


    }
}

class GeneticAlgo2 extends FarthestNeighbor2
{
    populationSize=1;
    population =[];
    fitness =[];
    bestDistance = Infinity;
    bestPath =[];
    iteration =1;
    currentIteration=0;

    setPopulationData(population,iteration)
    {

        this.populationSize=parseInt(population);
        this.iteration=parseInt(iteration);

        if(this.populationSize<=0) this.populationSize=1;
        if(this.iteration<=0) this.iteration=1;
    }

    createPopulation()
    {
        //create basic population
        for(let i=0;i<this.populationSize;i++)
        {
            this.population[i] = new Array(this.order.length);
            for(let j=0;j<this.order.length;j++)
            {
                this.population[i][j]=j
            }
        }

        //mixing basic population
        for(let i=1;i<this.populationSize;i++)
        {

            // this.population[i] = this.shuffle(this.population[i]);
            this.population[i] = this.population[0];
        }

        //console.log(this.population);

    }

    shuffle(array)
    {
        let currentIndex = array.length,  randomIndex;

        // While there remain elements to shuffle.
        while (currentIndex !== 0)
        {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

        // console.log("swap",array);
        return array;
    }

    calcFitness()
    {

        for(let i=0;i<this.populationSize;i++)
        {

            let d = this.calculateDistance(this.population[i]);
            if (d < this.bestDistance)
            {
                this.bestDistance = d;
                this.bestPath = this.population[i];
            }
            this.fitness[i]= 1 / (d + 1);
            // console.log(this.population[i], "fitnes: ", this.fitness[i],d);
        }

    }

    calculateDistance(arr)
    {

        let dist = this.getNodesDistance(this.entry,this.order[arr[0]])
        dist += this.getNodesDistance(this.order[arr[arr.length-1]],this.entry)

        for(let i=0;i<arr.length-1;i++)
        {
            if(this.order[arr[i]] !== this.order[arr[i+1]])
            {
                dist += this.getNodesDistance(this.order[arr[i]],this.order[arr[i + 1]])
            }


        }
        return dist;
    }

    calculateDistanceWithEntry(arr)
    {

        let dist = 0
        for(let i=0;i<arr.length-1;i++)
        {
            dist += this.getNodesDistance(arr[i],arr[i+1])
        }
        return dist;
    }


    FI()
    {
        let farthest = new FarthestNeighbor2()
        farthest.farthestInsertion(this.path_matrix,this.order,this.entry)
        this.final_path=farthest.final_path
    }

    NN()
    {
        let nearest = new Nearest()
        nearest.NearestNeightbour(this.path_matrix,this.order,this.entry)
        this.final_path=nearest.final_path
    }

    startSolve()
    {
        //let start = Date.now()
        this.FI();
        // this.NN();
        // this.divideGrid();

        this.doTwoOpt()
        let end = Date.now()
        // console.log(end-start)

        this.bestDistance = this.calculateDistanceWithEntry(this.final_path)
    }

    startGenetic()
    {

        let start = Date.now()
        this.FI();
        // this.NN();
        // this.divideGrid();

        // this.doTwoOpt()

        let end = Date.now()
        //console.log(end-start)

        //console.log("start")

        // console.log(this.order)






        this.rebaseOrder();
        this.createPopulation();
        this.bestPath = this.population[0];





        for(let i=0;i<this.iteration;i++)
        {
            this.calcFitness();
            this.normalizeFitness();
            // this.nextGeneration();
            this.currentIteration++;
            //   console.log(i, this.bestDistance,this.bestPath);
            // console.log(i,this.population);
        }




        //this.final_path = this.getFinalPath();
        this.getDetailedNaivePath();
        //this.create_result_table();
        //this.showFinalPath();
        //console.log(this.bestPath,this.bestDistance)
        //console.log(this.final_path,this.bestDistance);
        //console.log(this.detailed_final_path_array);
        // this.ColorizeAllFinalPath();

    }

    pathTracker()
    {
        document.getElementById("path_etape").hidden = false;
        document.getElementById("path_left").hidden = false;
        document.getElementById("path_right").hidden = false;
    }

    normalizeFitness()
    {
        let sum =0;
        for(let i=0;i<this.fitness.length;i++)
        {
            sum+=this.fitness[i];
        }

        for(let i=0;i<this.fitness.length;i++)
        {
            this.fitness[i] = this.fitness[i]/sum;
        }
        //console.log(this.population, "fitnes: ", this.fitness);
    }

    nextGeneration()
    {
        let newPopulation =[];

        for(let i=0;i<this.population.length;i++)
        {
            let order1 = this.pickOne(this.population,this.fitness);
            order1 = this.mutate(order1);

            newPopulation[i] = order1;
        }

        this.population=newPopulation;

    }

    pickOne(list,prob)
    {

        let index =0;
        let r = Math.random();
        //console.log("r",r);

        while(r>0)
        {
            r = r -prob[index];
            index++;
        }

        index --;
        return JSON.parse(JSON.stringify(list[index]))
    }


    mutate(order)
    {

        let rate =Math.random();
        let range = Math.floor(Math.random()*order.length/5);
        if(rate>0.4)
        {
            this.mutate_dist(order);
            return order;
        }
        if(rate>0.5)
        {
            this.mutate_dist_Random(order);
        }
        else
        {
            let arr = this.crossOver(order,range,1);
            return arr;
        }
        this.doTwoOpt();

    }

    mutate_dist(order)
    {
        let max=0;
        let distances =[];
        let dist_sum=0;
        for(let i=0;i<this.order.length-1;i++)
        {
            //let name = this.order[order[i]] + "->" + this.order[order[i + 1]];
            let dist = this.getNodesDistance(this.order[order[i]],this.order[order[i + 1]]);

            distances[i]=dist;
            dist_sum+=dist;
        }

        let normalize_arr=[]
        let index =0;
        for(let i=0;i<distances.length;i++)
        {
            for(let j=0;j<distances[i];j++)
            {
                normalize_arr[j+index]=distances[i]
            }
            index=normalize_arr.length;
        }

        let number = Math.floor(Math.random()*normalize_arr.length);

        let counter=0;
        let index2=0;
        for(let i=0;i<normalize_arr.length;i++)
        {

            if(normalize_arr[i]!==normalize_arr[i+1])
                counter++;
            if(normalize_arr[i] === normalize_arr[number])
            {
                index2 = counter;
                break;
            }
        }

        let indexA,indexB;


        if(index2<order.length-2)
        {
            indexA = index2 + 1;
            indexB = index2 + 2;
        }
        else
        {
            indexA = index2 ;
            indexB = index2 -1;
        }

        let temp =order[indexA];
        order[indexA]=order[indexB];
        order[indexB]=temp;
    }

    mutate_neighbors(order,chance)
    {

        let rate = (Math.random());
        if(rate>chance)
        {
            let index = Math.floor(Math.random() * order.length - 1);
            let temp = order[index];
            order[index] = order[index + 1];
            order[index + 1] = temp;
        }
    }

    mutate_dist_Random(order)
    {
        let i = Math.floor(Math.random()*order.length);
        let j = Math.floor(Math.random()*order.length);
        this.swap(order,i,j);
    }

    showFinalPath()
    {

        this.final_path.push(this.entry);

        for(let i=0;i<this.order.length;i++)
        {
            this.final_path[i+1]=this.order[this.bestPath[i]];
        }
        this.final_path.push(this.entry)

        console.log(this.final_path);
    }


    crossOver(orderA,range,chance)
    {
        let rate = (Math.random());

        if(chance>rate)
        {
            let start = Math.floor(Math.random()*orderA.length);
            //let end = Math.floor(Math.random() *(orderA.length - start)+start+1);
            let end = Math.floor(Math.random()*range) +start;
            if (end>orderA.length-1)
                end=orderA.length-1;

            let neworder = orderA.slice(start, end);
            let arr_start =orderA.slice(0,start);
            let arr_end =orderA.slice(end,orderA.length);

            // console.log("neworder",start,end,orderA,neworder,arr_start,arr_end);
            let shuffled =this.shuffle(neworder);
            //console.log("newo",neworder);

            let array = arr_start.concat(shuffled,arr_end);
            //console.log("end",array);

            return array;

        }

        return  orderA;

    }


    getFinalPath()
    {
        let arr=[this.entry];
        for (let i =0;i<this.bestPath.length;i++)
        {
            arr[i+1]=this.order[this.bestPath[i]];
        }
        arr.push(this.entry)

        //console.log("array",arr,this.bestPath);
        return arr;
    }

    rebaseOrder()
    {

        let order =[];
        for (let i=1;i<this.final_path.length-1;i++)
        {
            order.push(this.final_path[i]);
        }

        this.order =order;
    }

}

class OrderOptimalisation2 extends GeneticAlgo2
{

    interval =0;
    orderList ={};
    orders_number;
    division;
    divisionNr;
    orderPopulation =[];
    orderPopulationSummary =[];
    orderPopulationSize
    orderIteration=10;
    bestOrderVariation=this.orderPopulation[0];
    bestOrderVariationDistance=Infinity;
    bestOrderNodes ={};
    bestCombination = {};
    orderColors = {}
    OrderProducts_Id_Map = new Map();
    order_ids = [];
    order_colors ={};
    currentlyColorised =[];
    current_cont = {}

    setGeneticData(pop,iter)
    {
        this.orderPopulationSize=pop;
        this.orderIteration =iter;

        for(let i=0;i<this.orderPopulationSize;i++)
        {
            this.orderPopulationSummary[i]={};
        }
    }

    createOrderPopulation(divider)
    {

        this.division=divider;
        let orders=[];
        this.divisionNr = Math.ceil(this.orders_number/divider);

        // console.log("number",this.orders_number);

        for(let i=0;i<this.orders_number;i++)
        {
            orders[i]=i;
        }

        for(let i=0;i<this.order_ids.length;i++)
        {

            orders[i]=this.order_ids[i];
        }



        for(let i=0;i<this.orderPopulationSize;i++)
        {
            let size =Math.ceil(this.orders_number/divider);
            this.orderPopulation[i] = {};
            //this.orderPopulationSummary[i] = {};

            let temp_orders= orders.slice();
            let counter =0;
            for(let j=0;j<size;j++)
            {

                this.orderPopulation[i][j] = {};
                this.orderPopulation[i][j]["order"] = [];
                for(let k=0;k<divider;k++)
                {
                    if(counter>this.orders_number-1)
                        break;
                    let index = Math.floor(Math.random()*temp_orders.length)
                    let elem = temp_orders[index];
                    temp_orders.splice(index,1);
                    this.orderPopulation[i][j]["order"][k]=elem;
                    this.orderPopulation[i][j]["containers"] ={};
                    //console.log(elem,this.orderPopulation[i][j][k]);

                    counter++;
                }
            }
        }



    }

    createRandomOrders(orders_number,product_limit)
    {

        this.orders_number = orders_number;
        let orders = {};

        for(let k=0;k<orders_number;k++)
        {
            orders[k] = {};
            orders[k]['positions'] = [];
            orders[k]['real_positions'] = [];
            orders[k]['primary'] = [];

            let array = [];
            let randomized = [];
            let order = [];
            // console.log("products",this.products_positions);
            for (const key in this.products_positions) {
                let pos = this.products_positions[key]['pivot']['position'];

                if (!array.includes(pos))
                {
                    array.push(pos);
                }
            }

            for (let i = 0; i < Math.floor((Math.random() * product_limit+1)); i++)
            {
                let random = Math.floor((Math.random() * array.length)+1);
                if(array[random])
                {
                    randomized.push(array[random]);
                    array.splice(random, 1);
                }
            }


            // console.log(array);
            // console.log("rand",randomized);

            for (let i = 0; i < randomized.length; i++) {

                const found = this.products_positions.filter(e => e.pivot.position == randomized[i]);

                for (const key in found) {
                    // console.log(arr[i], found);
                    let pos = found[key]['pivot']['desired_position'];
                    if (!order.includes(pos))
                    {
                        order.push(pos);
                    }

                }

            }
            orders[k]['positions']=randomized;
            orders[k]['real_positions']=order;

            // this.randomOrderColor(order);

        }

        return orders
    }


    createRandomOrders2(orders_number,product_limit)
    {

        this.orders_number = orders_number;
        let orders = {};

        for(let k=0;k<orders_number;k++) //for numbers of orders
        {
            orders[k] = {};
            orders[k]['positions'] = [];
            orders[k]['real_positions'] = [];
            orders[k]['products_id'] = [];
            orders[k]['primary'] = [];

            let array = [];
            let randomized = [];
            let order = [];
            let positions = [];

            // get all possible randoms products
            // console.log("products",this.products_positions);
            for (const key in this.products_positions) {
                let prod_key = this.products_positions[key]["id"];

                if (!array.includes(prod_key))
                {
                    array.push(prod_key);
                }
            }

            for (let i = 0; i < Math.floor((Math.random() * product_limit+1)); i++) // random order size
            {
                let random = Math.floor((Math.random() * array.length)+1); //random product
                if(array[random])
                {
                    randomized.push(array[random]);
                    array.splice(random, 1);
                }
            }


            // console.log(array);
            //console.log("rand",randomized);

            for (let i = 0; i < randomized.length; i++)
            {

                const found = this.products_positions.filter(e => e.id == randomized[i]);

                // console.log("found",found);
                let pos = found[0]['pivot']['desired_position'];
                let real_pos = found[0]['pivot']['position'];
                if (!order.includes(pos))
                {
                    order.push(pos);
                }
                positions.push(real_pos)

            }
            orders[k]['positions']=positions;
            orders[k]['real_positions']=order;
            this.OrderProducts_Id_Map.set(k,randomized);

            // console.log(this.OrderProducts_Id_Map);


        }
        this.randomOrderColor();

        // console.log("orders",orders);
        this.orderList = orders
        return orders
    }

    loadDatabase(obj)
    {
        this.orders_number = obj.length;
        let orders = {};
        for( let key =0; key<obj.length; key++)
        {

            this.order_ids.push(obj[key]['order_id']);
            let id =obj[key]["order_id"];
            orders[id] = {};
            orders[id]['positions'] = [];
            orders[id]['real_positions'] = [];
            orders[id]['products_id'] = [];
            orders[id]['primary'] = [];

            let order = [];
            let positions = [];
            let products_id = [];


            for(let key2 = 0 ; key2< obj[key]["products"].length; key2++)
            {
                const found = this.products_positions.filter(e => e.id == obj[key].products[key2].id);
                if((found.hasOwnProperty(0)))
                {
                    let pos = found[0]['pivot']['desired_position'];
                    let real_pos = found[0]['pivot']['position'];
                    if (!order.includes(pos)) {
                        order.push(pos);
                    }
                    positions.push(real_pos)
                    products_id.push(obj[key].products[key2].id)
                }
            }

            orders[id]['positions']=positions;
            orders[id]['real_positions']=order;
            this.OrderProducts_Id_Map.set(id,products_id);

            // console.log(this.OrderProducts_Id_Map);


        }

        this.randomOrderColor();

        // console.log(orders)

        return orders;
    }

    orderFitness(sequence)
    {


        let arr =[];
        let duplicats=0;
        for (let i=0;i<sequence["order"].length;i++)
        {

            //console.log("esq",this.orderList,sequence["order"][i])
            for (let j=0;j<this.orderList[sequence["order"][i]]['real_positions'].length;j++)
            {
                if(arr.includes(this.orderList[sequence["order"][i]]['real_positions'][j]))
                {
                    duplicats++;
                }
                else
                {
                    arr.push(this.orderList[sequence["order"][i]]['real_positions'][j])
                }
            }
        }
        let fitness= 1/(arr.length-duplicats+1);
        this.order = arr.splice(0,arr.length);
        sequence["fitness"]=fitness;
        sequence["products_id"]=[];
        sequence["products_id_map"]={};
        //console.log(this.order,arr,duplicats,fitness);

        return this.order
    }

    orderFitness2opt(sequence)
    {

        let arr =[];
        let duplicats=0;
        for (let i=0;i<sequence.length;i++)
        {

            //console.log("esq",this.orderList,sequence["order"][i])
            for (let j=0;j<this.orderList[sequence[i]]['real_positions'].length;j++)
            {
                if(arr.includes(this.orderList[sequence[i]]['real_positions'][j]))
                {
                    duplicats++;
                }
                else
                {
                    arr.push(this.orderList[sequence[i]]['real_positions'][j])
                }
            }
        }
        this.order = arr.splice(0,arr.length);

        //console.log(this.order,arr,duplicats,fitness);

        return this.order
    }

    colorizeOrders()
    {
        let multipleColors;
        let nodes ={}
        for (const key in this.orderList)
        {
            let arr =[];


            arr = this.orderList[key]["positions"];
            for(let i=0;i<arr.length;i++)
            {

                if(!document.getElementById(arr[i]).style.background)
                {
                    this.currentlyColorised.push(arr[i])
                    document.getElementById(arr[i]).style.background = this.orderColors[key];
                    nodes[arr[i]]=[];
                    nodes[arr[i]].push(this.orderColors[key]);

                }
                else
                {
                    nodes[arr[i]].push(this.orderColors[key]);
                }

            }

        }
        //console.log("nodes",nodes);

        for (const key in nodes)
        {

            let colorBase = 0;
            let colorPercentage=100/nodes[key].length;
            let colorMix = "linear-gradient(to right, ";
            for(let i=0;i<nodes[key].length;i++)
            {
                colorBase = i*colorPercentage +"% ";
                colorMix+=nodes[key][i]+" "+colorBase + colorPercentage+"%";
                if(i!==nodes[key].length-1)
                    colorMix+=', ';
            }
            colorMix+=')';
            document.getElementById(key).style.background = colorMix;
            //console.log("colorMix",colorMix)
        }

    }



    setOrderNodeShortestPathData(population)
    {
        population["distance"]=this.bestDistance;
        population["path"] = this.final_path;
        population["detailed_path"] = this.detailed_final_path_array;

        this.order = [];
        this.bestDistance=Infinity;
        this.final_path=[];
        this.detailed_final_path_array=[];
        this.detailed_final_path = new Map();

        this.resetRectangle();
    }


    setPopulationNodeShortestPathData(main_pop,sec_pop,iter)
    {
        let dist = 0;
        let counter =0;
        for (const key in main_pop)
        {
            dist +=main_pop[key]["distance"];
            //console.log(main_pop[key]["distance"]);
        }

        // console.log("oh",this.bestOrderVariationDistance,dist,iter,main_pop);
        sec_pop["TotalDistance"] = dist;
        if(dist<this.bestOrderVariationDistance)
        {
            // console.log("main",main_pop,"sec",sec_pop)
            let copied1 = JSON.parse(JSON.stringify(main_pop));
            let copied2 = JSON.parse(JSON.stringify(sec_pop));
            copied1["dist"]=dist;

            this.bestOrderNodes[iter] = copied2;
            this.bestCombination= copied1;
            //console.log(this.bestCombination)
            this.bestOrderVariationDistance= dist;
            //console.log("test",this.bestOrderVariationDistance,main_pop,sec_pop);
            //  console.log("dist",this.bestOrderVariationDistance,iter);
        }
    }

    orderNormaliseFitness(main_pop,sec_pop)
    {
        //  console.log("sec",sec_pop)
        let fitness = 0;
        for (const key in main_pop)
        {
            fitness +=main_pop[key]["fitness"];
        }

        for (const key in main_pop)
        {
            main_pop[key]["percentage"]= Math.round(main_pop[key]["fitness"]/fitness*100);
        }

        sec_pop["FitnessSum"]=fitness;

        let arr = new Array(100).fill(0);
        let index =0;
        for (const key in main_pop)
        {
            arr.fill(key,0+index,0+index+main_pop[key]['percentage']);
            index+=main_pop[key]['percentage'];
        }

        sec_pop["FitnessArr"]=arr;
        // console.log("sec",sec_pop)

    }

    newOrderGeneration(main_pop,sec_pop)
    {

        for(let i=0;i<main_pop.length;i++)
        {

            for (const key in sec_pop[i])
            {
                let random = Math.floor(Math.random() * 100)
                let elem = sec_pop[i]["FitnessArr"][random];
                sec_pop[i]['nodeToStay'] = elem;
            }

            let order_arr = []
            //delete main_pop.sum;
            for (const key in main_pop[i])
            {
                if (key !== sec_pop[i]['nodeToStay'] && key !== "sum")
                {
                    order_arr = order_arr.concat(main_pop[i][key]["order"])
                }
            }

            let temp_arr =order_arr.slice();
            // console.log("shuffle",order_arr,this.shuffle(temp_arr));
            sec_pop[i]['arrayToRandom']= this.shuffle(temp_arr);
            //console.log("shuffle",order_arr,sec_pop[i]['arrayToRandom']);
            //console.log("shuffle",order_arr,sec_pop[i]['arrayToRandom']);




            let cut_array = sec_pop[i]['arrayToRandom'].slice();
            for (const key in main_pop[i])
            {

                if(key !== sec_pop[i]['nodeToStay'])
                {
                    main_pop[i][key]["order"] = cut_array.splice(0, this.division);
                    //console.log(main_pop[i][key]["order"]);
                }

            }


        }

    }

    getProductsIdIntoResult()
    {

        for (const key in this.bestCombination)
        {

            if(key==="dist")
                break;


            let path2= this.bestCombination[key]["path"].slice(1,this.bestCombination[key]["path"].length-1)
            let result = {}


            for(let i=0;i<path2.length;i++)
            {
                result[path2[i]] = {};
            }

            // this.bestCombination[key]["orders_id"] ={};

            for(let i=0;i<this.bestCombination[key]["order"].length;i++)
            {
                let product_id = this.OrderProducts_Id_Map.get(this.bestCombination[key]["order"][i]);
                this.setProductsIdMap(path2,product_id,this.bestCombination[key]["order"][i],result);

                this.bestCombination[key]["products_id"] = this.bestCombination[key]["products_id"].concat(product_id);
                //this.bestCombination[key]["orders_id"][this.bestCombination[key]["order"][i]] = product_id;

            }

            this.bestCombination[key]["products_id_map"]=result
            //this.bestCombination[key]["path"]= JSON.stringify(this.bestCombination[key]["path"]);
        }

    }

    setProductsIdMap(path,products,order_id,result)
    {
        for(let i=0;i<products.length;i++)
        {
            const found = this.products_positions.filter(e => e.id == products[i]);

            let pos = found[0]['pivot']['desired_position'];

            if(result[pos].hasOwnProperty([products[i]]))
            {
                result[pos][products[i]].push(order_id);
            }
            else
            {
                result[pos][products[i]] =[];
                result[pos][products[i]].push(order_id);
            }

        }
    }

    randomOrderColor()
    {
        for(const key in this.orderList)
        {
            let randomColor;
            {
                randomColor = Math.floor(Math.random() * 16777215).toString(16);
                this.orderColors[key]="#" + randomColor;
            }
        }
    }

    createLegend()
    {
        let block = document.getElementById("legend");

        let counter =0;

        for(const i in this.orderList)
        {

            let order = "Order  "+i;
            this.order_colors[i] = this.orderColors[i];
            block.innerHTML+= '<div class="badge text-wrap" style="width: 4rem; color: #1a1e21; background:' + this.orderColors[i] + '">' +order + ' </div>';
            block.innerHTML+= '<div class="badge bg" style="width: 1rem;"> <div>';
            counter ++;
        }

    }

    getOrderFinalResult()
    {
        let block = document.getElementById("finalCombination");
        for (const key in this.bestCombination)
        {
            if(key !=="dist")
            {
                this.bestCombination[key].detailed_path = this.getDetailedNaivePathOrder(this.bestCombination[key].path)

                let cont = ' <div class="row" style="cursor: pointer"> <div class="col-xl-12 d-flex align-items-center justify-content-center id="joined'+key+'" "> '
                let inside ='';

                for (let i = 0; i < this.bestCombination[key]["order"].length; i++)
                {

                    let color = this.order_colors[this.bestCombination[key]["order"][i]];
                    let order = "Order " + this.bestCombination[key]["order"][i];
                    inside += '<div class="badge text-wrap" id="' + order + '" style="width: 4rem; color: #1a1e21; background:' + color + ';' + this.bestCombination[key]["order"][i] + '">' + order + ' </div>';
                }
                inside += '<div class="badge bg" style="width: 5rem;"> </div> </div> </div>';

                block.innerHTML+= cont+inside
            }

        }
    }



}

class ContainersOpt2 extends OrderOptimalisation2
{
    max_capability=0;

    containers =[];
    distinc_containers =[];
    order_containers =[];
    orders =[];
    joined_orders= [];
    order_ids =[];
    order_ids_base =[];
    partial =false;
    containerFitness =[]
    containerFitnessVal =[]
    timestamps = {}
    time=0;
    start_time =0


    setStartVariables(orders,containers,distinct_containers,partial)
    {
        this.orders=orders;
        this.containers=containers;
        this.distinc_containers=distinct_containers;
        this.max_capability= this.getsumArr(containers);
        this.partial =partial

        console.log(this.partial,"partial")

    }


    createContainerPopulation(pop)
    {
        if(this.partial===true)
            this.setContainerSizeForOrders()
        else
            this.setContainerSizeForOrdersNoSplit()
        let orders=[];
        // return 0;
        // console.log("number",this.orders_number);
        for(let i=0;i<this.orders_number;i++)
        {
            orders[i]=i;
        }
        for(let i=0;i<pop;i++)
        {

            this.order_ids = this.order_ids_base.slice();
            this.orderPopulation[i] = {};
            this.orderPopulationSummary[i] = {};

            let temp_orders= orders.slice();
            let counter =0;
            let individual = this.individual();
            // console.log("ind",individual);
            //break;
            //  this.reselectFinalContainers(individual);
            // console.log("ind",individual);


            for(let j=0;j<individual.length;j++)
            {
                // break;
                this.orderPopulation[i][j] = {};
                // this.minusOne(individual[j]["orders"]);
                this.orderPopulation[i][j]["order"]=individual[j]["orders"];
                this.orderPopulation[i][j]["containers"] =individual[j]["containers_map"]

                console.log(i);
            }

        }


        //console.log("individual",this.orderPopulation);
        return this.orderPopulation;
    }

    individual()
    {
        this.joined_orders=[];
        let order_combination = this.getPossibleCombinations(this.order_containers);
        this.randomContainerSelection(order_combination);
        // console.log("------------------------------------");
        return this.joined_orders;
    }

    setContainerSizeForOrders()
    {
        let orders ={};
        for (let i=0;i<this.orders.length;i++)
        {
            let tem_cont = this.containers.slice();
            let proper_cont =[];
            this.order_ids.push(this.orders[i]["order_id"]);
            this.order_ids_base.push(this.orders[i]["order_id"]);
            let cap =parseInt(this.orders[i]["capability"]);
            let current_cap =0;
            let containers_sum_cap = this.getsumArr(this.containers)

            if(cap<=this.max_capability && cap<containers_sum_cap)
            {
                let counter = 0;
                while (cap > current_cap)
                {
                    //console.log(this.orders[i],cap,this.getsumArr(this.containers));
                    for (let j = 0; j < tem_cont.length; j++) {
                        //console.log(tem_cont[j], cap, current_cap)
                        if (tem_cont[j] + current_cap >= cap)
                        {
                            proper_cont.push(tem_cont[j])
                            current_cap += tem_cont[j];
                            break;

                        }
                        else if (j === tem_cont.length - 1) {
                            proper_cont.push(tem_cont[j])
                            current_cap += tem_cont[j];
                            tem_cont.splice(j, 1);

                        }

                    }
                    counter++;

                    if(counter>100) break;
                }
            }
            orders[this.orders[i]["order_id"]] = proper_cont;
        }

        this.order_containers = orders;

    }

    setContainerSizeForOrdersNoSplit()
    {
        let orders ={};
        for (let i=0;i<this.orders.length;i++)
        {
            let tem_cont = this.containers.slice();
            let proper_cont =[];
            this.order_ids.push(this.orders[i]["order_id"]);
            this.order_ids_base.push(this.orders[i]["order_id"]);
            let cap =parseInt(this.orders[i]["capability"]);
            let current_cap =0;

            for (let j = 0; j < tem_cont.length; j++)
            {

                if (tem_cont[j] + current_cap >= cap)
                {
                    proper_cont.push(tem_cont[j])
                    current_cap += tem_cont[j];
                    break;
                }
            }

            if(proper_cont.length===0)
                proper_cont.push(Infinity)
            orders[this.orders[i]["order_id"]] = proper_cont;
        }

        this.order_containers = orders;
        console.log(this.order_containers)

    }


    minusOne(arr)
    {
        for(let i=0;i<arr.length;i++)
        {
            arr[i]--;
        }
    }

    compareNumbers(a, b)
    {
        return a - b;
    }

    getPossibleCombinations(orders)
    {
        let orders_comb ={};
        for (const i in orders)
        {
            let arr =[];
            let cap = this.getsumArr(orders[i]);
            for (const j in orders)
            {
                if(i!==j)
                {
                    let cap2 =this.getsumArr(orders[j]);
                    if(cap+cap2<=this.max_capability)
                    {
                        let cont_array=orders[i];
                        cont_array = cont_array.concat(orders[j])
                        cont_array.sort(this.compareNumbers);
                        // console.log(cont_array);
                        //if(this.getsumArr(cont_array)<=this.max_capability && this.checkMatchingContainers(cont_array,this.containers))
                        if(this.getsumArr(cont_array)<=this.max_capability)
                        {
                            arr.push(parseInt(j));
                        }
                    }
                }
            }
            orders_comb[i] = arr;
        }
        //console.log(orders_comb)
        return orders_comb;
    }


    compareNumbers(a, b)
    {
        return a - b;
    }

    checkMatchingContainers(arr,arr2)
    {

        let containers = arr.slice();
        let containers_base =arr2.slice();
        let size=0;
        let real_containers=[];

        if(containers.length>containers_base.length)
        {
            return [];
        }

        while(containers.length>0)
        {

            let index = this.findNotSmaller(containers_base,containers[0])


            // console.log(containers,containers_base,index)
            if(index===-1) return [];
            else
            {
                real_containers.push(containers_base[index]);
                containers_base.splice(index,1);
                containers.splice(0,1);

                //console.log(containers_base,containers)
            }

        }

        return real_containers;

    }

    randomContainerSelection(order_combinations)
    {

        let test = JSON.parse(JSON.stringify(order_combinations));


        //console.log("elo",this.order_ids,this.order_ids_base)
        while(this.order_ids.length>0)
        {
            let joined_orders =[];
            let order_index = (Math.floor(Math.random() * (this.order_ids.length -1) + 1));
            order_index =this.order_ids[order_index];

            if(this.order_ids.length===1)
                joined_orders=this.order_ids;
            else
                joined_orders.push(order_index);

            let succesed =0;

            let object = {};
            let counter = 0;


            //console.log("joined_index /////////////",joined_orders,this.order_ids)
            while (true)
            {

                if(this.order_ids.length<=1)
                {
                    break;
                }

                //console.log("joined_index ////",joined_orders)
                //console.log(JSON.parse(JSON.stringify(test)),this.order_ids)
                let order_joined_index = Math.floor(Math.random() * (test[order_index].length));
                let result = this.singleContainerSelectionIsPossible(joined_orders, test, order_index, order_joined_index);

                if (counter === 0) {
                    this.deleteFromContainersSelection(test, joined_orders[0]);
                }

                if (!(result.hasOwnProperty("added"))) {
                    this.deleteFromContainersSelection(test, result["orders"][result["orders"].length - 1]);
                    joined_orders = result["orders"];
                    object = JSON.parse(JSON.stringify(result));
                    succesed=1;

                } else {
                    test[order_index].splice(result["added"], 1)
                }
                // console.log(counter)
                // console.log(JSON.parse(JSON.stringify(test)))
                counter++;

                if (test[order_index].length === 0) break;

            }


            if(succesed!==1)
            {
                object = this.singleContainerLeft(joined_orders);
            }

            this.deleteCombinedOrders(joined_orders, test)
            //console.log(this.order_containers)
            //console.log("left",this.order_ids,succesed,joined_orders)
            // console.log(test);
            if( !(Object.keys(obj).length === 0 && obj.constructor === Object))
                this.joined_orders.push(object);

            // console.log("joined_orders",JSON.parse(JSON.stringify(this.joined_orders)))
        }
    }

    deleteCombinedOrders(arr,test)
    {
        for(let i=0;i<arr.length;i++)
        {
            let id =this.order_ids.indexOf(arr[i]);
            this.order_ids.splice(id,1);
            delete test[arr[i]];
        }
    }

    singleContainerSelectionIsPossible(joined_orders,orders,i,j)
    {
        let object ={};
        let test = JSON.parse(JSON.stringify(orders));
        let joined = JSON.parse(JSON.stringify(joined_orders))

        joined.push(test[i][j]);

        let current_cont =this.getContainersByOne(joined)
        let cont = this.getContainers(joined);

        cont = cont.sort(this.compareNumbers)

        let cap = this.getsumArr(cont);
        let real_cont = this.checkMatchingContainers(cont, this.containers);
        let real_cap = this.getsumArr(real_cont);

        //console.log(joined, cont, real_cont, cap,real_cap);
        if(real_cap>this.max_capability || real_cont.length===0)
            object["added"] = j
        else
        {
            object["orders"] = joined;
            object["optimal_containers"] = cont;
            object["containers"] = real_cont;
            object["containers_map"] = current_cont;
            object["real_cap"] = real_cap;
            object["cap"] = cap;


        }
        return object;
    }

    singleContainerLeft(orders)
    {
        let object ={};

        let cont = this.getContainers(orders);
        let current_cont =this.getContainersByOne(orders)
        cont = cont.sort(this.compareNumbers)

        let cap = this.getsumArr(cont);
        let real_cont = this.checkMatchingContainers(cont, this.containers);
        let real_cap = this.getsumArr(real_cont);

        object["orders"] = orders.slice();
        object["optimal_containers"] = cont;
        object["containers"] = real_cont;
        object["containers_map"] = current_cont;
        object["real_cap"] = real_cap;
        object["cap"] = cap;


        return object;
    }


    deleteFromContainersSelection(order_combination,el)
    {
        for(const key in order_combination)
        {
            var index = order_combination[key].indexOf(el);
            if (index !== -1)
            {
                order_combination[key].splice(index, 1);
            }
        }
    }

    findNotSmaller(arr,number)
    {
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i]>=number)
            {
                return i;
            }
        }
        return -1
    }

    getsumArr(arr)
    {
        let sum =0
        for(let i=0;i<arr.length;i++)
        {
            sum+=arr[i]
        }
        return sum;
    }

    getContainers(arr)
    {

        let containers_array =[];
        for(let i=0;i<arr.length;i++)
        {
            containers_array = containers_array.concat(this.order_containers[arr[i]]);
        }
        containers_array.sort(this.compareNumbers)

        return containers_array;
    }

    getContainersByOne(arr)
    {

        let containers = {};
        for(let i=0;i<arr.length;i++)
        {
            containers[arr[i]]=this.order_containers[arr[i]];

        }
        return containers;
    }

    reselectFinalContainers(object)
    {


       // console.log("reselectContainers",object)
        for(const k in object)
        {
            let map = object[k]["containers"];
            let possible_containers = object[k]["containers"];
            let containers= this.containers.slice()
            for (const key in map)
            {
                for (let i = 0; i < map[key].length; i++)
                {
                  //  console.log("map",map[key][i],containers)
                    let index = map[key][i]


                        let node = map[key][i];
                        let min = Infinity;
                        let min_node = 0;
                        for (let j = 0; j < containers.length; j++) {
                            if (containers[j] > node) {
                                if (containers[j] - node < min) {
                                    min = containers[j] - node
                                    min_node = j;
                                }
                            }
                        }
                       // console.log(object[k]["possible_containers"]);
                        object[k]["containers"][key][i] = containers[min_node];
                        index = min_node;

                   containers.splice(index, 1)

                }
            }
        }



    }


    orderContFitness(sequence)
    {

        let part_sum =[]
        let fitness =[]
        let sum_distance = 0;
        for(let i=0;i<sequence.length; i++) //population
        {

            part_sum.push(0)
            for (const k in sequence[i]) //batch
            {
                sum_distance += sequence[i][k]["distance"];
                part_sum[i] += sequence[i][k]["distance"]
            }
        }

        for(let i=0;i<sequence.length; i++) //population
        {
            fitness[i] = (1/ part_sum[i])

        }


        let sum =0
        for(let i=0;i<fitness.length;i++)
        {
            sum+=fitness[i];
        }
        for(let i=0;i<fitness.length;i++)
        {
            fitness[i] = fitness[i]/sum;
        }
        // console.log("fitnes",fitness,part_sum)
        this.containerFitness = fitness
        this.containerFitnessVal = part_sum

        /*
        for (const i in sequence) {
            let fitness = sequence[i]["distance"] / sum_distance;
            sequence[i]["BatchFitness"] = fitness;
            sequence[i]["products_id"] = [];
            sequence[i]["products_id_map"] = {};

        }

         */

        // this.order = arr.splice(0,arr.length);

    }

    nextContGeneration(max_time)
    {

        let time = (Date.now()- this.start_time)/1000
        if(time>=this.time)
        {
            this.timestamps[this.time]=this.bestCombination.dist
            this.time+=60;
        }
        console.log(time)

        let rate = Math.floor(Math.random() * this.orderPopulation.length)

        let newPopulation=[];

        if(Math.random()<1)
        {
            let nodeA = this.pickOneCont(this.orderPopulation, this.containerFitness)
            let nodeB = this.pickOneCont(this.orderPopulation, this.containerFitness)
            let result = this.crossOverCont(nodeA, nodeB)
            let result2 = this.crossOverCont(nodeB, nodeA)


            this.orderPopulation.push(result)
            this.orderPopulation.push(result2)


            this.addNewCroosoversToPopulation(result)
            this.addNewCroosoversToPopulation(result2)

            console.log(this.orderPopulation[this.orderPopulation.length-1])
            console.log(this.orderPopulation[this.orderPopulation.length-2])
            this.OrderBatching2OPT(max_time,this.orderPopulation.length-1)
            this.OrderBatching2OPT(max_time,this.orderPopulation.length-2)

            this.orderContFitness(this.orderPopulation)

            let the_same = this.getTheSamePopElemCounter()


            // console.log(this.orderPopulation)
            this.deleteWorstFromPopulation(the_same)
            this.deleteWorstFromPopulation(the_same)
        }


        if(Math.random()<0.1)
        {
            this.doubleReplace(rate,1)
        }

    }

    addNewCroosoversToPopulation(result)
    {
        for (const key in result)
        {

            cont.orderFitness(result[key]);
            cont.startGenetic();
            cont.setOrderNodeShortestPathData(result[key]);
            cont.getPopNodeMaxDistances(result);
        }
    }

    nextContGenerationReplaceAll()
    {
        let newPopulation=[];
        for(let i=0;i<this.orderPopulation.length;i++)
        {


            let rate =Math.random();
            let nodeA = this.pickOne(this.orderPopulation,this.containerFitness)
            let nodeB = this.pickOne(this.orderPopulation,this.containerFitness)
            let result = this.crossOverCont(nodeA,nodeB)

            newPopulation[i]=result

            if(rate<0.1)
            {
                this.doubleReplace(i,1)
            }

        }
        this.orderPopulation = newPopulation
    }

    pickOneCont(list,prob)
    {

        let index =0;
        let r = Math.random();
        //console.log("r",r);

        while(r>0)
        {
            r = r -prob[index];
            index++;
        }

        index --;
        return JSON.parse(JSON.stringify(list[index]))
    }

    deleteWorstFromPopulation(counter)
    {
        let worst = this.resetTheSamePopulation()

        this.containerFitness.splice(worst,1)
        this.orderPopulation.splice(worst,1)


    }

    resetTheSamePopulation(counter)
    {

        let rate =Math.floor(Math.random() * 3)
        if(rate >3 )
        {

            let node =this.modeArray(this.containerFitnessVal)
            for (let i = 0; i < this.containerFitnessVal.length; i++)
            {
                if (this.containerFitnessVal[i] === node)
                {
                    return i
                }
            }
        }
        else
        {
            return this.getWorstFitness()
        }
    }

    getTheSamePopElemCounter()
    {
        let counter =0;
        for(let i=0;i<this.containerFitnessVal.length;i++)
        {
            if(this.containerFitnessVal[i]===this.bestCombination.dist)
            {
                counter++
            }
        }

        return counter
    }

    getWorstFitness()
    {
        let min =Infinity;
        let index =-1;
        for(let i=0;i<this.containerFitness.length;i++)
        {
            if(this.containerFitness[i]<min)
            {
                min = this.containerFitness[i]
                index=i;
            }
        }
        // console.log(index)
        return index;
    }

    getBestFitness()
    {
        let max =0;
        let index =-1;
        for(let i=0;i<this.containerFitness.length;i++)
        {
            if(this.containerFitness[i].max)
            {
                max = this.containerFitness[i]
                index=i;
            }
        }
        // console.log(index)
        return index;
    }

    crossOverCont(batchA, batchB)
    {

        let batchA_temp = JSON.parse(JSON.stringify(batchA))
        let batchB_temp = JSON.parse(JSON.stringify(batchB))

        let t1 = parseInt(this.getRandomProperty(batchA))
        let t2 = parseInt(this.getRandomProperty(batchA))

        while(t1 === t2)
        {
            t1 =  this.getRandomProperty(batchB)
        }

        if(t2<t1)
        {
            let tmp =t1;
            t1=t2;
            t2=tmp
        }

        // console.log("t",t1,t2)

        let arr1 = this.batchtoArray(batchA)
        let arr2 = this.batchtoArray(batchB)
        //console.log("oldA",arr1)
        //console.log("oldB",arr2)

        //  let orders_inB = this.crossOverTransport(t1,t2,batchB)
        let A_unchatching =[]
        let B_unchatching =[]


        let childA = []
        let childAarr =[]

        //moving from  A
        for(let i=t1;i<=t2;i++)
        {
            let arr =[]
            for(let j=0;j<batchA[i].order.length;j++)
            {
                arr.push(batchA[i].order[j])
                childAarr.push(batchA[i].order[j])
            }
            if(arr.length>0)
                childA.push(arr)
        }

        this.crossOverTransport(t1,t2,batchB,childA,childAarr)
        let left = this.batchPushleft(arr1,childAarr)
        // console.log(childA,left)
        let cross = this.batchFillAll(childA,left)


        // console.log("cross",cross)
        return cross
    }

    batchPushleft(base,childarr)
    {
        let arr=[]
        {
            for(let j=0;j<base.length;j++)
            {
                if(!childarr.includes(base[j]) && base[j]!=="-")
                {
                    arr.push(base[j])
                }

            }
        }

        return arr

    }

    batchFillAll(child,left)
    {

        let final ={}

        let part = child.slice()
        let orders = left.slice()
        let succed =1
        let counter =0
        while(orders.length>0 && counter<1000)
        {
            succed=0
            let elem = orders[0]
            //  console.log(orders)
            for (let i = 0; i < part.length; i++)
            {
                let result = this.singleReplace(part[i], elem)
                // console.log((result),i)
                if (result !== 0)
                {
                    final[i] = result
                    part[i] = result.orders
                    // console.log(part, orders)
                    orders.splice(0, 1)
                    succed = 1
                    break;
                }
            }
            if(succed===0) {
                // console.log("errr")
                orders.splice(0, 1)
                if([elem])
                    part.push([elem])
            }
            counter++
        }

        let res = this.batchgetContainers(part);
        let result ={}
        for(let i=0;i<res.length;i++)
        {
            result[i] = res[i]
        }

        return result;

    }

    modeArray(array)
    {
        if (array.length === 0) return null;
        var modeMap = {},
            maxCount = 1,
            modes = [];

        for (var i = 0; i < array.length; i++) {
            var el = array[i];

            if (modeMap[el] == null) modeMap[el] = 1;
            else modeMap[el]++;

            if (modeMap[el] > maxCount) {
                modes = [el];
                maxCount = modeMap[el];
            } else if (modeMap[el] == maxCount) {
                modes.push(el);
                maxCount = modeMap[el];
            }
        }
        return modes;
    }


    batchgetContainers(part)
    {
        let result =[]
        let newpart =[]
        for (let i = 0; i < part.length; i++)
        {
            if(part[i].length>0)
            {
                newpart.push(part[i]);
            }
        }




        for (let i = 0; i < newpart.length; i++)
        {
            result[i] ={}
            let base = newpart[i].slice()
            let cont = this.getContainers(newpart[i]);
            cont = cont.sort(this.compareNumbers)
            let real_cont = this.checkMatchingContainers(cont, this.containers);
            result[i]["order"] = newpart[i]
            result[i]["containers"] = real_cont;


        }
        this.reselectFinalContainers(result)

        return result


    }

    batchFillRest(batch)
    {
        let arr=[]
        for(let j=0;j<this.order_ids_base.length;j++)
        {
            if(!batch.includes(this.order_ids_base[j]))
            {
                arr.push(this.order_ids_base[j])
            }
        }

        return arr
    }

    batchtoArray(batch)
    {
        // console.log(batch)
        let arr =[]
        for (const key in batch)
        {
            for(let j=0;j<batch[key].order.length;j++)
            {
                arr.push(batch[key].order[j])
            }
            arr.push("-")
        }
        return arr
    }

    crossOverTransport(t1,t2,batch,child,childarr)
    {

        let l= Object.keys(batch).length
        for(let i=0;i<t1;i++)
        {
            let arr=[]
            for(let j=0;j<batch[i]["order"].length;j++)
            {
                let el = batch[i]["order"][j]
                if(!childarr.includes(el))
                {
                    arr.push(batch[i]["order"][j])
                    childarr.push(batch[i]["order"][j])
                }

            }
            child.push(arr)
        }


        for(let i=t2+1;i<l;i++)
        {
            let arr=[]
            for(let j=0;j<batch[i]["order"].length;j++)
            {
                let el = batch[i]["order"][j]
                if(!childarr.includes(el))
                {
                    arr.push(batch[i]["order"][j])
                    childarr.push(batch[i]["order"][j])
                }

            }
            child.push(arr)
        }

        return child
    }


    OrderBatching2OPT(max_time,index)
    {


        //console.log(this.orderPopulation[0])
        this.bestOrderVariationDistance=Infinity
        let improved = true
        let counter =0;
        let arr= Object.keys(this.orderPopulation[index])
        let time0 =0
        let startTime = Date.now();

        while(improved)
        {
            counter++
            improved=false
            for (let i=0;i<arr.length;i++)
            {

                for (let j=i+1;j<arr.length;j++)
                {
                    let flag = this.doubleReplace2opt(arr[i], arr[j],index)
                    let time = (Date.now()- startTime)/1000
                    if(time>=time0)
                    {
                        this.timestamps[time0]=this.bestCombination.dist
                        time0+=60;
                    }
                    console.log(i,j,time,this.bestOrderVariationDistance)
                    if (time >= max_time)
                    {
                       // this.setPopulationNodeShortestPathData(this.orderPopulation[index],this.orderPopulationSummary,0,)
                        console.log("best",this.bestCombination.dist)
                        return this.bestCombination

                    }
                    if(flag!==0)
                    {
                        improved=true;
                        this.reselectFinalContainers(flag)
                        this.orderPopulation[index]=flag
                        // this.setPopulationNodeShortestPathData(this.orderPopulation[0],this.orderPopulationSummary,0,)
                        //this.setPopulationNodeShortestPathData(this.orderPopulation[index],this.orderPopulationSummary,0,)
                        console.log("improved",index,this.bestCombination.dist)

                        //break;
                    }



                }

            }
        }
        //this.setPopulationNodeShortestPathData(this.orderPopulation[0],this.orderPopulationSummary,0,)
        //return this.bestCombination


    }



    singleReplace(arr,elem)
    {

        let result ={}
        let base = arr.slice()
        base.push(elem)

        let cont = this.getContainers(base);
        let real_cont = this.checkMatchingContainers(cont, this.containers);
        let real_cap = this.getsumArr(real_cont);

        let current_cont =this.getContainersByOne(arr)

        if(real_cap<=this.max_capability && real_cont.length>0 )
        {
            // console.log("cont",cont, real_cont,real_cap,flag);
            result["orders"] = base
            result["containers"] = current_cont;

            return result
        }
        return 0
    }

    getRandomProperty(obj)
    {
        const keys = Object.keys(obj);

        return keys[Math.floor(Math.random() * keys.length)];
    }

    getRandomGens(obj)
    {
        const keys = Object.keys(obj);

        return Math.floor(Math.random() * keys.length);
    }

    doubleReplace(i,j)
    {
        let flag=0;

        let iter =0;
        while(flag!==1 && iter <10)
        {
            iter++
            for (let k = 0; k < j; k++)
            {

                let tempPop = JSON.parse(JSON.stringify(this.orderPopulation[i]))

                let t1 = this.getRandomProperty(tempPop)
                let t2 = this.getRandomProperty(tempPop)
                while (t1 === t2) {
                    t2 = this.getRandomProperty(tempPop)
                }

                let A = this.orderPopulation[i][t1]
                let B = this.orderPopulation[i][t2]


                let contA = this.getContainers(A["order"])
                let contB = this.getContainers(B["order"])



                //console.log(A.order,B.order)
                let temp_A = A["order"].slice();
                let temp_B = B["order"].slice();

                flag = 0;
                for (let j = 0; j < A["order"].length; j++) {
                    for (let k = 0; k < B["order"].length; k++) {
                        let tmp = A["order"][j]
                        temp_A[j] = temp_B[k]
                        temp_B[k] = tmp;


                        let real_contA = this.checkMatchingContainers(this.getContainers(temp_A), this.containers);
                        let real_contB = this.checkMatchingContainers(this.getContainers(temp_B), this.containers)
                        let real_capA = this.getsumArr(real_contA);
                        let real_capB = this.getsumArr(real_contB);

                        if (real_capA <= this.max_capability && real_capB <= this.max_capability && real_contA.length > 0 && real_contB.length > 0) {
                            // console.log("konty_base", A["containers"], B["containers"],A["order"],B["order"])
                            //console.log("konty", real_contA, real_contB, temp_A, temp_B,real_capA,real_capB)
                            // console.log(toSwitch)

                            // console.log(JSON.parse(JSON.stringify(this.orderPopulation[i])))
                            let current_contA = this.getContainersByOne(temp_A)
                            let current_contB = this.getContainersByOne(temp_B)


                            this.orderPopulation[i][t1]["order"] = this.shuffle(temp_A)
                            this.orderPopulation[i][t2]["order"] = this.shuffle(temp_B)

                            this.orderPopulation[i][t1]["containers"] = current_contA
                            this.orderPopulation[i][t2]["containers"] = current_contB
                            //console.log(this.orderPopulation[i])


                            flag = 1;
                            return 1
                        }

                        temp_A = A["order"].slice();
                        temp_B = B["order"].slice();
                    }

                }
            }
        }
        return flag;


        //console.log("sum",AcontSum,BcontSum)
    }

    doubleReplace2opt(key,key2,i)
    {

        let A = this.orderPopulation[i][key]
        let B = this.orderPopulation[i][key2]

        //console.log("A,B",A["order"],B["order"])

        //console.log(A.distance,B.distance,JSON.parse(JSON.stringify(this.orderPopulation[0])))
        let temp_A = A["order"].slice();
        let temp_B = B["order"].slice();


        // console.log(this.orderPopulation[0][key],this.orderPopulation[0][key2])

        // console.log(key,key2,temp_A,temp_B)
        let dist_curr=A["distance"] + B["distance"]


        for (let j = 0; j < temp_A.length; j++)
        {
            for (let k = 0; k < temp_B.length; k++)
            {
                let tmp = temp_A[j]
                temp_A[j] = temp_B[k]
                temp_B[k] = tmp;


                let real_contA = this.checkMatchingContainers(this.getContainers(temp_A), this.containers);
                let real_contB = this.checkMatchingContainers(this.getContainers(temp_B), this.containers)
                let real_capA = this.getsumArr(real_contA);
                let real_capB = this.getsumArr(real_contB);

               // console.log(real_capA,real_contB,real_contA,real_capB)
                if (real_capA <= this.max_capability && real_capB <= this.max_capability && real_contA.length > 0 && real_contB.length > 0)
                {


                    let current_contA = this.getContainersByOne(temp_A)
                    let current_contB = this.getContainersByOne(temp_B)

                    // console.log(JSON.parse(JSON.stringify(this.orderPopulation[0][key])))
                    //console.log(temp_A,temp_B)

                    let temp_A1 =this.resetdata2opt(temp_A)
                    let temp_B1 =this.resetdata2opt(temp_B)

                    let dist_new = temp_A1.distance+temp_B1.distance


                    if(dist_new <dist_curr)
                    {


                       // console.log("tttt",temp_A,temp_B,A["order"],B["order"],this.getContainers(temp_A),this.getContainers(temp_B))
                        let pop = (JSON.parse(JSON.stringify(this.orderPopulation[i])))
                        let obj = {}
                        obj["order"] = temp_B.slice()
                        obj["containers"] = current_contB
                        obj["path"]  = temp_B1.path
                        obj["distance"] = temp_B1.distance
                        obj["detailed_path"] = temp_A1.detailed_path
                        obj["products_id"] = []
                        obj['products_id_map'] ={}

                        //  console.log("obj",obj)

                        this.orderPopulation[i][key]["order"] = temp_A.slice()
                        this.orderPopulation[i][key]["path"] = temp_A1.path
                        this.orderPopulation[i][key]["distance"] = temp_A1.distance
                        this.orderPopulation[i][key]["detailed_path"] = temp_A1.detailed_path
                        this.orderPopulation[i][key]["containers"] = current_contA

                        pop[key]=this.orderPopulation[i][key]
                        pop[key2]=obj

                         console.log(key,pop[key].order,key2,pop[key2].order)


                        // console.log("elo",temp_A,temp_B,dist_curr,dist_curr,JSON.parse(JSON.stringify(this.orderPopulation[0])))
                        return JSON.stringify(pop)

                    }
                }


            }

        }
        return 0;

    }

    resetdata2opt(orders)
    {


        this.order =this.orderFitness2opt(orders);
        this.startSolve()


        let population ={}
        population["distance"]=this.bestDistance;
        population["path"] = this.final_path;
        population["detailed_path"] = this.detailed_final_path_array;

        this.order = [];
        this.bestDistance=Infinity;
        this.final_path=[];
        this.detailed_final_path_array=[];
        this.detailed_final_path = new Map();



        // console.log("orders",population,orders)
        return population


    }

    checkIfSwitchPossible(temp_orders,temp_orders2,base_id,switch_id)
    {

        let result ={}
        let flag =0;
        let cont = this.getContainers(temp_orders);
        let cont2 = this.getContainers(temp_orders2);
        cont = cont.sort(this.compareNumbers)
        cont2 = cont2.sort(this.compareNumbers)


        let real_cont = this.checkMatchingContainers(cont, this.containers);
        let real_cont2 = this.checkMatchingContainers(cont2, this.containers);
        let real_cap = this.getsumArr(real_cont);

        let current_contA =this.getContainersByOne(temp_orders)
        let current_contB =this.getContainersByOne(temp_orders2)


        if(real_cap<=this.max_capability && real_cont.length>0 )
        {
            // console.log("cont",cont, real_cont,real_cap,flag);
            result["base"] = temp_orders2
            result["base_id"] = base_id
            result["joined"] = temp_orders;
            result["joined_id"] = switch_id;
            result["base_containers"] = current_contB
            result["joined_containers"] = current_contA;

            return result
        }
        return flag;
    }

    getPopNodeMaxDistances(node)
    {
        let max = [0,Infinity] //max, min
        let max_key = [0,0] //max1, min

        for(const key in node) //max1
        {
            if(node[key]["fitness"]>max[0])
            {
                max[0] = node[key]["fitness"]
                max_key[0] = key
            }

            if(node[key]["fitness"]<max[1])
            {

                max[1] = node[key]["fitness"]
                max_key[1] = key
            }
        }


        return max_key;



    }




}



self.onmessage = function (en)
{
    let time0 =60
    let max_time = parseInt(en.data.max_time)
    let startTime = Date.now();

    let index = 0
    let cont = JSON.parse(en.data.batch)
    let container = new ContainersOpt2();

    for(const key in cont)
    {
        container[key]=cont[key]
    }

    for(const key in container.order_containers) // remove null
    {
        for(let i=0;i<container.order_containers[key].length;i++)
        {
            if (!(typeof container.order_containers[key][i] == 'number'))
            {
                container.order_containers[key][i] = [Infinity]
               // console.log(typeof container.order_containers[key][i])
            }
        }


    }


    // solver
        let arr= Object.keys(container.orderPopulation[index])
        container.bestOrderVariationDistance=Infinity
        let improved = true
        while(improved)
        {
            improved=false
            for (let i=0;i<arr.length-1 ;i++)
            {

                for (let j=i+1;j<arr.length;j++)
                {
                    let flag =  JSON.parse(container.doubleReplace2opt(arr[i], arr[j],index))
                    let time = (Date.now()- startTime)/1000
                    if(time>=time0)
                    {
                        container.timestamps[time0]=container.bestCombination.dist
                        time0+=60;
                    }
                    console.log(i,j,time)
                    if (time >= max_time)
                    {
                        container.setPopulationNodeShortestPathData(container.orderPopulation[index],container.orderPopulationSummary,0,)
                       // console.log(("best",container.bestCombination.dist))
                        this.postMessage({
                            batch: JSON.stringify(container.bestCombination),
                            max_time: max_time,
                            end :true

                        })
                        self.close();
                        return


                    }
                    if(flag!==0)
                    {
                        improved=true;
                        container.reselectFinalContainers(flag)
                        container.orderPopulation[index]=flag
                        container.setPopulationNodeShortestPathData(container.orderPopulation[index],container.orderPopulationSummary,0,)
                        console.log("improved",index,container.bestCombination.dist)
                        this.postMessage({
                            batch: JSON.stringify(container.bestCombination),
                            max_time: max_time,
                            end: false

                        })
                        if(test(container.orderPopulation[0]))
                        {
                            alert("err")
                            self.close();
                            return
                        }
                        //this.postMessage(JSON.stringify(container.bestCombination))
                    }

                }

            }
        }
        container.setPopulationNodeShortestPathData(container.orderPopulation[index],container.orderPopulationSummary,0)
        this.postMessage({
            batch: JSON.stringify(container.bestCombination),
            max_time: max_time,
            end: true

        })
        self.close(); // zatrzymanie skryptu wewnatrz watku roboczego


}

function test (object)
{
    delete object.dist
    let orders =[]
    for (const key in object)
    {
        orders=orders.concat(object[key].order)
    }
    orders.sort(compareNumbers)

    for (let i=0;i<orders.length-1;i++)
    {
        if(orders[i]===orders[i+1])
        {
           // console.log("orders",orders)
            //console.log("error",orders[i])
            return 1
        }
    }
    //console.log(orders)
    return 0

}

function compareNumbers(a, b) {
    return a - b;
}
