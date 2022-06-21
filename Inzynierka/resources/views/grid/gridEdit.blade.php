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

    <form id="load_grid" name="load_grid" action="{{route('gridSubmit')}}" method="POST">
        @csrf
        <div class="form-row align-items-center">
            <div class="col-auto">
                <label class="sr-only" for="inlineFormInputGroup">Username</label>
                <div class="input-group mb-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">ENTRANCE</div>
                    </div>
                    <input type="number" class="form-control" name="entry" id="entry" value="{{old('entry')}}" placeholder="Entrance ID">
                </div>
            </div>

            <input type="hidden" name="grid" value="{{old('grid')}}">
            <input type="hidden" name="grid_size" value="{{old('grid_size')}}">
            <input type="hidden" name="grid_size_x" value="{{old('grid_size_x')}}">
            <input type="hidden" name="grid_size_y" value="{{old('grid_size_y')}}">
            <input type="hidden" name="entry_ok" value="{{old('entry_ok')}}">


            <div class="col-auto">
                <button type="sumbit" class="btn btn-success mb-2" onclick="setGridValues();">SUBMIT</button>
                <!-- <button type="button" class="btn btn-success mb-2" onclick="showGrid()">Show</button> -->
            </div>
        </div>



    </form>

</div>

<div id="reload">
    <script>
        addRow(3,5)
        renew()
    </script>
</div>

@endsection

