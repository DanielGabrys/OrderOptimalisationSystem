@extends('body.main_theme')

@section('main')

@if(session('success'))

<div class="alert alert-success alert-dismissible fade show" role="alert">
    <strong>{{session('success')}}</strong>
    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>

@endif

<div class="container-fluid d-flex justify-content-center">

</div>

<div class="container d-flex justify-content-center ">

    <form id="load_grid" name="load_grid" action="{{route('editGridSubmit',$grid->id)}}" method="POST">
        @csrf
        <div class="form-row align-items-center">
            <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup">Username</label>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">ENTRANCE</div>
                    </div>
                    <input type="number" class="form-control" name="entry" id="entry" value="{{old('entry') ?? $grid->entry}}" placeholder="Entrance ID">
                </div>
            </div>

            <input type="hidden" name="grid" value="{{old('grid')}}">
            <input type="hidden" name="grid_size" value="{{old('grid_size') ?? $grid->height*$grid->width}}">
            <input type="hidden" name="grid_size_x" value="{{old('grid_size_x') ?? $grid->height}}">
            <input type="hidden" name="grid_size_y" value="{{old('grid_size_y') ?? $grid->width}}">
            <input type="hidden" name="entry_ok" value="{{old('entry_ok')}}">


            <div class="col-auto">
                <button type="sumbit" class="btn btn-success mb-2" onclick="setGridValues();">SUBMIT</button>
                <!-- <button type="button" class="btn btn-success mb-2" onclick="showGrid()">Show</button> -->
            </div>

        </div>



            <div class="input-group mb-2 mr-sm-2">
                @error('grid')
                    <span class="text-danger">{{$message}}</span>
                @enderror

                @error('grid_size')
                <span class="text-danger">{{$message}}</span>
                @enderror

                @error('grid_size_x')
                <span class="text-danger">{{$message}}</span>
                @enderror

                @error('grid_size_y')
                <span class="text-danger">{{$message}}</span>
                @enderror

                @error('entry_ok')
                <span class="text-danger">{{$message}}</span>
                @enderror
            </div>





    </form>

</div>

<div id="reload">

    <script>
        ProductGrid.setSize({{$grid->height}},{{$grid->width}},700);
        ProductGrid.getProductsData({!! $products_array !!},{{$grid->shelfs}});
    </script>


    @foreach(range(1, $grid->height*$grid->width) as $y)

        <a id="{{"a".$y}}"  >
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

@endsection

