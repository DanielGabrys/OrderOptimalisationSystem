@extends('body.main_theme')

@section('main')




    <div id="reload">

        <script>

            dikstra.setSize({{$grid->height}},{{$grid->width}},700)
            dikstra.getProductsData({!! $products_array !!},{{$grid->shelfs}});
            dikstra.shelvesToGraph();
        </script>


        @foreach(range(1, $grid->height*$grid->width) as $y)

            <a id="{{"a".$y}}" >
                <div id ="{{"b".$y}}" class="cell" >
                    <script>
                        dikstra.generateGridCells({{$grid->height}},{{$grid->width}},{{$y}})
                        dikstra.getHints({{$y}})
                        dikstra.colorizeProductsOnGrid({{$y}})
                    </script>
                </div>
            </a>

        @endforeach
    </div>

    <div class="container-fluid d-flex justify-content-center">

        <form class="form-inline">
            @csrf
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">START</div>
                </div>
                <input type="number" class="form-control" id="start" >
            </div>

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">KONIEC</div>
                </div>
                <input type="number" class="form-control" id="end" >
            </div>

            <button type="button" id="nodes_path" class="btn btn-primary mb-2" >OBLICZ</button>

            <input type="hidden" class="form-control" name="json_matrix" id="json_matrix" >

        </form>
    </div>

    <div class="container-fluid d-flex justify-content-center">

        <form class="form-inline" name="form" id="form" action="{{route('uploadNodesPaths',$grid->id)}}" method="POST">
            @csrf
            <input type="hidden" id ="paths_to_save" name="paths_to_save" value="{}" >

            <input type="hidden" id ="chunks" name="chunks" value="1" >
            <button type="button" id ="graph_to_file" class="btn btn-warning mb-2"> OBLICZ DLA WSZYSTKICH </button>
            <button type="sumbit" id ="load_paths" name="load_paths" hidden="true" class="btn btn-success mb-2"> DOWNLOAD NODES </button>

        </form>
    </div>

    <div class="container-fluid d-flex justify-content-center">
        <div class="progress">
            <div class="progress-bar" name="loading_bar" id="loading_bar" role="progressbar" style="width: 25px;" aria-valuenow="0" aria-valuemin="40" aria-valuemax="100">0%</div>
        </div>

    </div>




    <div class="p-3 mb-3 mb-md-0 mr-md-3 bg-light" style="max-height: 200px; cursor: pointer">

        <table class="table table-dark table-striped">

            <thead>
            <tr>
                <th scope="col">START</th>
                <th scope="col">KONIEC</th>
                <th scope="col">DYSTANS</th>
                <th scope="col">DROGA</th>
            </tr>
            </thead>


            <tbody>
                <tr>
                    <td id="start_table">  </td>
                    <td id="end_table"> </td>
                    <td id="steps">  </td>
                    <td id="path"> </td>
                </tr>
            </tbody>
        </table>
    </div>


    <script>

        let result_BFS = new Map()
        let graph = dikstra.BFSGraph
        let max_counter =  Object.keys(dikstra.BFSGraph.neighbors).length
        let interval_counter =0
        let arr = []
        let interval


        $("#inputGroupFile01").change(function(e){
            let fileName = (e.target.files[0].name);
            if(fileName.toString().length > 20)
            {
                console.log(fileName.toString().length);
            }
            $('.custom-file-label').html(fileName);
        });


        document.getElementById("nodes_path").addEventListener("click", function ()
        {
            dikstra.setStartEnd(document.getElementById('start').value,document.getElementById('end').value);
        })

        function download(file, text)
        {

            //creating an invisible element
            let element = document.createElement('a');
            element.setAttribute('href', 'data:text/plain;charset=utf-8, ' + encodeURIComponent(text));
            element.setAttribute('download', file);

            // Above code is equivalent to
            // <a href="path of file" download="file name">
            document.body.appendChild(element);

            //onClick property
            element.click();
            document.body.removeChild(element);
        }

        // Start file download.
        document.getElementById("graph_to_file").addEventListener("click", function()
        {
            graphToArray(arr)
           // createChunks()
           // dikstra.setShortestPathsNodes()
            interval = setInterval(setShortestPathsNodesInterval,10,arr[interval_counter],graph)

        });

        function setShortestPathsNodesInterval(key2,graph)
        {

            let bar =  document.getElementById("loading_bar")
            let percentage= (interval_counter / max_counter*100)
            bar.innerHTML =parseInt(percentage.toString())+"%"
            bar.style.width =parseInt(percentage/100*400).toString()+"px"

            let temp = new Map()
            let key =arr[interval_counter]
            for(let i=interval_counter;i<arr.length;i++)
            {


                if(key===arr[i]) continue

               // console.log(key,arr[i])
                let name = key+"->"+arr[i];
                let reverse = arr[i]+"->"+key
                if(result_BFS.has(name) || result_BFS.has(reverse)) continue

                let steps =bfs(graph,key,arr[i]);
                result_BFS.set(name,steps)
                temp.set(name,steps)

            }

            //console.log(document.getElementById("chunk"+interval_counter),temp)


            if(interval_counter>=max_counter) {
                clearInterval(interval)
                document.getElementById("load_paths").hidden = false;
                document.getElementById("paths_to_save").value=JSON.stringify(Object.fromEntries(result_BFS))
                document.getElementById("chunks").value=max_counter

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

        function createChunks()
        {
            let parent = document.getElementById("form");
            for(let i=0;i<max_counter;i++)
            {
                let input = document.createElement("input");
                input.type = "hidden";
                input.id = "chunk"+i;
                input.name = "chunk"+i;

                parent.appendChild(input);
            }

        }



        console.log(dikstra.BFSGraph.neighbours)

    </script>


@endsection
