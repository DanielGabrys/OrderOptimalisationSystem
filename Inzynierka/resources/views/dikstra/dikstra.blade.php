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
                    <div class="input-group-text">ENTRY</div>
                </div>
                <input type="number" class="form-control" id="start" >
            </div>

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">END</div>
                </div>
                <input type="number" class="form-control" id="end" >
            </div>

            <button type="button" id="nodes_path" class="btn btn-primary mb-2" >CALCULATE</button>

            <input type="hidden" class="form-control" name="json_matrix" id="json_matrix" >

        </form>
    </div>

    <div class="container-fluid d-flex justify-content-center">
        <form class="form-inline">

            <button type="button" id ="graph_to_file" class="btn btn-warning mb-2"> DOWNLOAD NODES </button>
        </form>
    </div>


    <div class="container-fluid d-flex justify-content-center">
        <form action="{{route('uploadNodesPaths',$grid->id)}}" method="POST" enctype="multipart/form-data">
            @csrf
            <div class="input-group">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="inputGroupFileAddon01">UPLOAD NODES</span>
                </div>
                <div class="custom-file">
                    <input type="file" id=file" name="file" class="custom-file-input" id="inputGroupFile01"
                           aria-describedby="inputGroupFileAddon01">
                    <label class="custom-file-label text-truncate" for="inputGroupFile01" >Select json file</label>
                    <input type="submit" id ="submit_nodes" class="btn btn-success"> </input>
                </div>


            </div>
        </form>
    </div>



    <div class="p-3 mb-3 mb-md-0 mr-md-3 bg-light" style="max-height: 200px; cursor: pointer">

        <table class="table table-dark table-striped">

            <thead>
            <tr>
                <th scope="col">START</th>
                <th scope="col">END</th>
                <th scope="col">STEPS</th>
                <th scope="col">PATH</th>
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
                // Generate download of hello.txt
                // file with some content
             console.log(dikstra.graphToExport);
                const text = JSON.stringify(dikstra.graphToExport);
                var filename = "graph.json";

                download(filename, text);
        }, false);



    </script>


@endsection
