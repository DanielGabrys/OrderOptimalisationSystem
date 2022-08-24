@extends('body.main_theme')

@section('main')

    <div id="reload">

        <script>

            naive.setSize({{$grid->height}},{{$grid->width}},700)
            naive.getProductsData({!! $products_array !!},{{$grid->shelfs}});
            naive.shelvesToGraph();
        </script>


        @foreach(range(1, $grid->height*$grid->width) as $y)

            <a id="{{"a".$y}}" >
                <div id ="{{"b".$y}}" class="cell" >
                    <script>
                        naive.generateGridCells({{$grid->height}},{{$grid->width}},{{$y}})
                        naive.getHints({{$y}})
                        naive.colorizeProductsOnGrid({{$y}})
                    </script>
                </div>
            </a>

        @endforeach
    </div>

    <div class="container-fluid d-flex justify-content-center">

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

    <div class="container-fluid d-flex justify-content-center">

        <button type="button" id="load" class="btn btn-success mb-2" >SUBMIT</button>

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
        console.log(naive.products_positions);
        naive.addButtonlisteners(naive.products_positions);
    </script>

@endsection
