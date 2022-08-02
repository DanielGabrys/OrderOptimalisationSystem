class DikstraGrid extends ProductsGrid
{

    graph = {};
    path_array = {};

    start = 0;
    end = 0;
    path = 0;
    steps = 0;

    index = 0;
    intervalId = 0;


    shelvesToGraph(X, Y, shelves) {
        let V = X * Y;
        let counter = 1;
        // initialize graph with zero
        for (let i = 0; i < X; i++) {
            for (let j = 0; j < Y; j++) {
                if (shelves[i][j] !== -1) {
                    graph[counter] = {};

                    //up connected node
                    if (i !== 0 && shelves[i - 1][j] !== -1) {
                        graph[counter][counter - Y] = 1;
                    }
                    //down connected node
                    if (i !== Y - 1 && shelves[i + 1][j] !== -1) {
                        graph[counter][counter + Y] = 1;
                    }
                    //left connected node
                    if (j !== 0 && shelves[i][j - 1] !== -1) {
                        graph[counter][counter - 1] = 1;
                    }
                    //right connected node
                    if (j !== Y - 1 && shelves[i][j + 1] !== -1) {
                        graph[counter][counter + 1] = 1;
                    }
                }
                counter++;
            }
        }

        this.graph = graph;
        this.X = X;
        this.Y = Y;
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
        var map = this.formatGraph(this.graph);
        console.log(map);

        var visited = [];
        var unvisited = [start];
        var shortestDistances = {[start]: {vertex: start, cost: 0}};

        var vertex;
        while ((vertex = unvisited.shift())) {
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


        console.log(
            "Shortest path is: ",
            path.join(" -> "),
            " with weight ",
            shortestDistances[end].cost
        );

        this.steps = shortestDistances[end].cost;
        this.path = path.join(" -> ");
        this.path_array = path;


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

    setStartEnd(s, e) {
        this.start = s;
        this.end = e;

        if (this.path_array) {
            this.clearColorize();
            this.index = 0;
            this.intervalId = 0;
            this.path_array = {};
        }

        this.dijkstra(this.graph, s, e);
        this.setTableData();
        this.colorizePath();
    }

    setTableData() {
        document.getElementById("start_table").innerHTML = this.getStart().toString();
        document.getElementById("end_table").innerHTML = this.getEnd().toString();
        document.getElementById("steps").innerHTML = this.getShortestDistance().toString();
        document.getElementById("path").innerHTML = this.getPath().toString();
    }

    colorizePath() {
        this.intervalId = setInterval(this.change, 200);
        //console.log(this.intervalId);

    }

    change() {
        document.getElementById(this.path_array[this.index]).className = "path_cell";
        //console.log(index,this.path_array.length);
        if (this.index === this.path_array.length - 1) {
            clearInterval(this.intervalId);
        }

        this.index++;

    }

    clearColorize() {
        for (let i = 1; i <= this.path_array.length ?? 0; i++) {
            document.getElementById(this.path_array[i - 1]).className = "unselected_cell";

        }
    }

}

