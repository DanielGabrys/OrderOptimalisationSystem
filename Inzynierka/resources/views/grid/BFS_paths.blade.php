@extends('grid.gridLayouts.spinner')

@section('spinner')

    <div id="reload">

        <script>
            BFS = new DikstraGrid()
            BFS.setSize({{$grid->height}},{{$grid->width}},700)
            BFS.getProductsData(null,{{$grid->shelfs}});
            BFS.shelvesToGraph();
        </script>


        @foreach(range(1, $grid->height*$grid->width) as $y)

            <a id="{{"a".$y}}" >
                <div id ="{{"b".$y}}" class="cell" >
                    <script>
                        BFS.generateGridCells({{$grid->height}},{{$grid->width}},{{$y}})
                    </script>
                </div>
            </a>

        @endforeach
    </div>

    <div class="container-fluid d-flex justify-content-center">

        <form class="form-inline" name="form" id="form" action="{{route('addGridPaths')}}" method="POST">
            @csrf
            <input type="hidden" id ="paths_to_save" name="paths_to_save" value="{}" >

            <input type="hidden" id ="nodes_array" name="nodes_array" value="{}" >
            <button type="button" id ="graph_to_file" class="btn btn-warning mb-2"> OBLICZ DLA WSZYSTKICH </button>
            <button type="sumbit" id ="load_paths" name="load_paths" hidden="true" class="btn btn-success mb-2"> ZAPISZ </button>

        </form>
    </div>

    <div class="container-fluid d-flex justify-content-center">
        <div class="progress">
            <div class="progress-bar" name="loading_bar" id="loading_bar" role="progressbar" style="width: 25px;" aria-valuenow="0" aria-valuemin="40" aria-valuemax="100">0%</div>
        </div>

    </div>




    <script>

        let result_BFS = [];
        let graph = BFS.BFSGraph


        let max_counter =  Object.keys(BFS.BFSGraph.neighbors).length
        let interval_counter =0
        let arr = []
        let interval

        document.getElementById("graph_to_file").addEventListener("click", function()
        {
            graphToArray(arr)
            interval = setInterval(setShortestPathsNodesInterval,10,arr[interval_counter],graph)
        });

        function setShortestPathsNodesInterval(key2,graph)
        {

            let bar =  document.getElementById("loading_bar")
            let percentage= (interval_counter / max_counter*100)
            bar.innerHTML =parseInt(percentage.toString())+"%"
            bar.style.width =parseInt(percentage/100*400).toString()+"px"

            //console.log(arr)
            let temp = []
            let counter =0;
            let key =arr[interval_counter]
            for(let i=interval_counter;i<arr.length;i++)
            {


                if(key===arr[i]) continue

                temp[counter]=bfs(graph,key,arr[i])
                counter++
            }
            if(temp.length>0)
                result_BFS.push(temp)
           // console.log(temp,result_BFS)

            //console.log(document.getElementById("chunk"+interval_counter),temp)


            if(interval_counter>=max_counter) {
                clearInterval(interval)
                document.getElementById("load_paths").hidden = false;
                document.getElementById("paths_to_save").value=JSON.stringify(result_BFS)
                document.getElementById("nodes_array").value=JSON.stringify(arr)

            }
            if(interval_counter<max_counter)
                //document.getElementById("chunk"+(interval_counter)).value=JSON.stringify(Object.fromEntries(temp))

                interval_counter++
        }

        function graphToArray(arr)
        {
            for(const key in graph.neighbors)
            {

                arr.push(parseInt(key))

            }
            console.log(arr)
        }
    </script>





@endsection

