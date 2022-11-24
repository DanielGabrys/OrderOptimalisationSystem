class DikstraGrid extends ProductsGrid
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

                        //down connected node
                        if (i !== Y - 1 && shelves[i + 1][j] !== -1) {
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
    }

    shelvesToNeighborhoodMap()
    {
        let counter =0;
        console.log(this.graph);
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
        console.log("bts",graph);

    };

    getBFSShortestPath(graph,start,end)
    {
        this.steps= this.bfs(graph, start,end);
        this.path=this.shortestPath(graph, start, end);
    }

    bfs(graph, source,end)
    {
            let queue = [ { vertex: source, count: 0 } ], visited = { source: true }, tail = 0;

            while (tail < queue.length)
            {
                let u = queue[tail].vertex, count = queue[tail++].count;  // Pop a vertex off the queue.
               // console.log('distance from ' + source + ' to ' + u + ': ' + count);

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
        if (source == target)
        {   // Delete these four lines if
            // you want to look for a cycle
            return;                 // when the source is equal to
        }                         // the target.
        var queue = [ source ],
            visited = { source: true },
            predecessor = {},
            tail = 0;
        while (tail < queue.length)
        {
            var u = queue[tail++],  // Pop a vertex off the queue.
                neighbors = graph.neighbors[u];
            for (var i = 0; i < neighbors.length; ++i)
            {
                var v = neighbors[i];
                if (visited[v]) {
                    continue;
                }
                visited[v] = true;
                if (v === target)
                {   // Check if the path is complete.
                    var path = [ v ];   // If so, backtrack through the path.
                    while (u !== source)
                    {
                        path.push(u);
                        u = predecessor[u];
                    }
                    path.push(u);
                    path.reverse();
                    console.log(path);
                    return path;
                }
                predecessor[v] = u;
                queue.push(v);
            }
        }
        console.log('there is no path from ' + source + ' to ' + target);
        return 0;
    }


}

dikstra = new DikstraGrid();


