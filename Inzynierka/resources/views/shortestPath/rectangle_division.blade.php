@extends('body.main_theme')

@section('main')

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


    <div id="reload">

        <script>

            base.setSize({{$grid->height}},{{$grid->width}},500)
            base.getProductsData({!! $products_array !!},{{$grid->shelfs}});
            base.shelvesToGraph();
            rectangleDiv.setSize({{$grid->height}},{{$grid->width}},500)
            rectangleDiv.getProductsData({!! $products_array !!},{{$grid->shelfs}});
            rectangleDiv.shelvesToGraph();
        </script>


        @foreach(range(1, $grid->height*$grid->width) as $y)

            <a id="{{"a".$y}}" >
                <div id ="{{"b".$y}}" class="cell" >
                    <script>
                        rectangleDiv.generateGridCells({{$grid->height}},{{$grid->width}},{{$y}})
                        rectangleDiv.getHints({{$y}})
                        rectangleDiv.colorizeProductsOnGrid({{$y}})
                    </script>
                </div>
            </a>

        @endforeach
    </div>

    <div class="row">
        <div class="col">

            <p>
                <a class="btn btn-primary" data-toggle="collapse" href="#multiCollapseExample1" role="button" aria-expanded="false" aria-controls="multiCollapseExample1"> > </a>
            </p>

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

        <button type="button" id="load" class="btn btn-success mb-2" >SUBMIT</button>

    </div>




    <div class="container-fluid d-flex justify-content-center">
        <div class="badge bg-primary text-wrap" style="width: 10%;" id="percentage">
            0%
        </div>
    </div>



    <div class="p-3 mb-3 mb-md-0 mr-md-3 bg-light">

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
        console.log(naive.products_positions);

        rectangleDiv.getEntry({{$grid->entry}});
        base.addButtonlisteners(base.products_positions);
        rectangleDiv.RectangleStart();
    </script>

    <script>


    </script>

@endsection

