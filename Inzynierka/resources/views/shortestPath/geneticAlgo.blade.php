@extends('body.main_theme')

@section('main')

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


    <div id="reload">

        <script>
            genetic = new GeneticAlgo();
            genetic.setSize({{$grid->height}},{{$grid->width}},500)
            genetic.getProductsData({!! $products_array !!},{{$grid->shelfs}});
            genetic.shelvesToGraph();
        </script>


        @foreach(range(1, $grid->height*$grid->width) as $y)

            <a id="{{"a".$y}}" >
                <div id ="{{"b".$y}}" class="cell" >
                    <script>
                        genetic.generateGridCells({{$grid->height}},{{$grid->width}},{{$y}})
                        genetic.getHints({{$y}})
                        genetic.colorizeProductsOnGrid({{$y}})
                    </script>
                </div>
            </a>

        @endforeach
    </div>

    <div class="row">
        <div class="col">


            <div class="collapse multi-collapse" id="multiCollapseExample1">

                <div class="container-fluid d-flex justify-content-center" id="data_block">
                    <div class="overflow-auto p-3 mb-3 mb-md-4 mr-md-4 bg-light" style="max-height: 200px; cursor: pointer">

                        <table class="table table-active table-striped" id="products_table">

                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Schelf</th>
                                <th scope="col">Desired Position</th>
                                <th scope="col">Add</th>
                            </tr>
                            </thead>

                            <tbody>
                            @foreach($gridProducts as $product)

                                <tr id="{{"tr".$loop->iteration}}" >
                                    <th scope="row">{{$loop->iteration}}</th>
                                    <td>{{$product->name}}</td>
                                    <td>{{$product->pivot->position}}</td>
                                    <td>{{$product->pivot->desired_position}}</td>
                                    <td>
                                        <button type="button" id="{{"bt".$loop->index}}" class="btn btn-primary mb-2" >ADD</button>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>

                    </div>
                    <div class="overflow-auto p-3 mb-3 mb-md-4 mr-md-4 bg-light" style="max-height: 200px; cursor: pointer">

                        <table class="table table-primary table-striped" id="selection_table">

                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Schelf</th>
                                <th scope="col">Desired Position</th>
                                <th scope="col">DELETE</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>
    </div>



    <div class="container-fluid d-flex justify-content-center">

        <input type="text" class="form-control" id="nodes" name="nodes" style="width: 400px;">
        <input type="hidden" class="form-control" id="example_json" name="example_json" style="width: 400px;">
        <button type="button" id="load_example" class="btn btn-success btn-sm" style="font-size: 10px;" >SUBMIT</button>

        <input type="number" class="form-control" id="random" name="random" style="width: 80px;">
        <button type="button" id="load_random" class="btn btn-warning btn-sm" style="font-size: 10px;" >RANDOM</button>


    </div>

    <div class="container-fluid d-flex justify-content-center" id="path_selector">

        <a class="btn btn-primary btn-sm" id="path_left" > < </a>
        <input type="number" class="form-control" id="path_etape" name="path_etape" value="0" style="width: 70px;">
        <a class="btn btn-primary btn-sm" id="path_right" > > </a>
    </div>


   <!--
    <div class="container-fluid d-flex justify-content-center">

        <button type="button" id="load" class="btn btn-success btn-sm" style="font-size: 10px;" >SUBMIT</button>
        <a class="btn btn-primary btn-sm" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1"> > </a>
    </div>
    -->



    <div class="overflow-auto p-3 mb-3 mb-md-0 mr-md-3 bg-light" style="max-height: 200px; cursor: pointer">

        <table id ="result_table" class="table table-dark table-striped">

            <thead>
            <tr>
                <th scope="col">NR</th>
                <th scope="col">STEP</th>
                <th scope="col">PATH</th>
                <th scope="col">DISTANCE</th>
            </tr>
            </thead>

            <tbody>
            </tbody>
        </table>
    </div>

    <script>


        document.getElementById("path_etape").hidden = true;
        document.getElementById("path_left").hidden = true;
        document.getElementById("path_right").hidden = true;

        genetic.getPathMatrix({!! $path_matrix !!});
        genetic.getEntry({{$grid->entry}});

        let element = document.getElementById("load_example");
        element.addEventListener("click", function()
        { genetic.loadExample(genetic.products_positions);
          genetic.startGenetic();
          genetic.createResults();
            genetic.pathTracker();
        });

        let element2 = document.getElementById("load_random");
        element2.addEventListener("click", function()
        {
            genetic.loadRandom(document.getElementById("random").value)
            genetic.startGenetic();
            genetic.createResults();
            genetic.pathTracker();
        });


        let right_path = document.getElementById("path_right");
        right_path.addEventListener("click", function()
        {
            genetic.colorizeSinglePathNodes(document.getElementById("path_etape").value,1);
        });

        let left_path = document.getElementById("path_left");
        left_path.addEventListener("click", function()
        {
            genetic.colorizeSinglePathNodes(document.getElementById("path_etape").value,0);
        });




    </script>

    <script>

    </script>

@endsection


