@extends('body.main_theme')

@section('main')

    @if(session('success'))

        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{session('success')}}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    @endif

<div class="container-fluid d-flex justify-content-center">

    <form class="form-inline">

        <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
                <div class="input-group-text">WIERSZE</div>
            </div>
            <input type="number" class="form-control" id="x" placeholder="X" value=3>
        </div>

        <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
                <div class="input-group-text">COLUMNY</div>
            </div>
            <input type="number" class="form-control" id="y" placeholder="Y" value=5>
        </div>

        <button type="button" class="btn btn-primary mb-2"
                onclick="
                        createGrid.clearGrid();
                        createGrid.addRow(document.getElementById('x').value,document.getElementById('y').value);

               ">STWORZ SIATKE</button>
    </form>

</div>

<div class="container d-flex justify-content-center ">

    <form id="load_grid" name="load_grid" action="{{route('gridSubmit')}}" method="POST">
        @csrf
        <div class="form-row align-items-center">
            <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup">Username</label>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">PUNKT DEPOZYTU</div>
                    </div>
                    <input type="number" class="form-control" name="entry" id="entry" value="{{old('entry')}}" placeholder="ID">
                </div>
            </div>

            <input type="hidden" name="grid" value="{{old('grid')}}">
            <input type="hidden" name="grid_size" value="{{old('grid_size')}}">
            <input type="hidden" name="grid_size_x" value="{{old('grid_size_x')}}">
            <input type="hidden" name="grid_size_y" value="{{old('grid_size_y')}}">
            <input type="hidden" name="entry_ok" value="{{old('entry_ok')}}">


            <div class="col-auto">
                <button type="submit" class="btn btn-success mb-2" onclick="createGrid.setGridValues();">WCZYTAJ</button>
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
        createGrid.addRow(3,5)
    </script>
</div>

<script>
    createGrid.renew()
</script>

@endsection
