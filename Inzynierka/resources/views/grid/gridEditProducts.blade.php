@extends('body.main_theme')

@section('main')

    @if(session('success'))

        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{session('success')}}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    @endif


        <div id="reload">

            <script>
                ProductGrid.setSize({{$grid->height}},{{$grid->width}},700);
                ProductGrid.getProductsData({!! $products_array !!},{{$grid->shelfs}});
            </script>


            @foreach(range(1, $grid->height*$grid->width) as $y)

                <a id="{{"a".$y}}" href ="{{route('editGridCellProducts',[$grid->id,$y])}}" >
                    <div id ="{{"b".$y}}" class="cell" >
                        <script>
                           ProductGrid.generateGridCells({{$grid->height}},{{$grid->width}},{{$y}})
                           ProductGrid.getHints({{$y}})
                           ProductGrid.colorizeProductsOnGrid({{$y}})
                        </script>
                    </div>
                </a>

            @endforeach

        </div>




    <div class="overflow-auto p-3 mb-3 mb-md-0 mr-md-3 bg-light" style="max-height: 200px; cursor: pointer">

            <table class="table table-dark table-striped">

                <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Product</th>
                    <th scope="col">Schelf</th>
                    <th scope="col">Desired Position</th>
                </tr>
                </thead>

                        <tbody>
                            @foreach($gridProducts as $product)

                                <tr onclick="ProductGrid.colorizeSelectedCell({{$product->pivot->position}});">
                                    <th scope="row">{{$loop->iteration}}</th>
                                    <td>{{$product->name}}</td>
                                    <td>{{$product->pivot->position}}</td>
                                    <td>{{$product->pivot->desired_position}}</td>
                                </tr>
                            @endforeach
                        </tbody>
            </table>

        </div>



@endsection


