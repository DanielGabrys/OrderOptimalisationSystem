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
            getData({!! $products_array !!})
            editProductsOnGrid({{$grid->height}},{{$grid->width}});
        </script>


        @foreach(range(1, $grid->height*$grid->width) as $y)

            <a id="{{"a".$y}}" href ="{{route('editGridCellProducts',[$grid->id,$y])}}" >
                <div id ="{{"b".$y}}" class="cell" >
                    <script>
                        editProductOnGridProductOnCell({{$y}})
                        generateGridCells({{$grid->width}},{{$grid->height}},{{$grid->shelfs}},{{$y}})
                    </script>
                </div>
            </a>

        @endforeach

    </div>




@endsection


