@extends('body.main_theme')

@section('main')

    @if(session('success'))

        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{session('success')}}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    @endif

    <button type="button" id="myTooltip" class="btn btn-secondary" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-animation="true">
        Tooltip on bottom
    </button>


    <div id="reload">

        <script>
            editProductsOnGrid({{$grid->height}},{{$grid->width}},{{$grid->shelfs}});
        </script>


        @foreach(range(1, $grid->height*$grid->width) as $y)

            <a id="{{"a".$y}}" href ="{{route('editGridCellProducts',[$grid->id,$y])}}" >
                <div id ="{{"b".$y}}" class="cell" onmouseover="editProductOnGridProductOnCell({{$products_array}},{{$y}})" >
                    <script> generateGridCells({{$grid->width}},{{$grid->height}},{{$grid->shelfs}},{{$y}})</script>
                </div>
            </a>

        @endforeach

    </div>





@endsection


