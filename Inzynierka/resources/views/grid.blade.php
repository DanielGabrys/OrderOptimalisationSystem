<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
</head>

<script src="{{asset('Frontend/Js/Grid/grid.js')}}"></script>
<link href="{{asset('Frontend/css/grid/grid.css')}}" rel="stylesheet">

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
<script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>

<body>

<div class="container-fluid d-flex justify-content-center">

    <form class="form-inline">

        <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
                <div class="input-group-text">ROW</div>
            </div>
            <input type="number" class="form-control" id="x" placeholder="X" value=3>
        </div>

        <div class="input-group mb-2 mr-sm-2">
            <div class="input-group-prepend">
                <div class="input-group-text">COLUMN</div>
            </div>
            <input type="number" class="form-control" id="y" placeholder="Y" value=5>
        </div>

        <button type="button" class="btn btn-primary mb-2" onclick="addRow(document.getElementById('x').value,document.getElementById('y').value); clearGrid();">GENERATE GRID</button>
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
                        <div class="input-group-text">ENTRANCE</div>
                    </div>
                    <input type="number" class="form-control" name="entry" id="entry" value="{{old('entry')}}" placeholder="Entrance ID">
                </div>
            </div>

            <input type="hidden" name="grid" value="{{old('grid')}}">
            <input type="hidden" name="grid_size" value="{{old('grid_size')}}">
            <input type="hidden" name="grid_size_x" value="{{old('grid_size_x')}}">
            <input type="hidden" name="grid_size_y" value="{{old('grid_size_y')}}">


            <div class="col-auto">
                <button type="sumbit" class="btn btn-success mb-2" onclick="setGridValues();setGridTotalSize()">SUBMIT</button>
               <!-- <button type="button" class="btn btn-success mb-2" onclick="showGrid()">Show</button> -->
            </div>
        </div>

        <div class="container d-flex justify-content-center ">
            @error('entry')
            <span class="text-danger">{{$message}}</span>
            @enderror
        </div>

        <div class="container d-flex justify-content-center ">
            @error('grid')
            <span class="text-danger">{{$message}}</span>
            @enderror
        </div>

        <div class="container d-flex justify-content-center ">
            @error('grid_size')
            <span class="text-danger">{{$message}}</span>
            @enderror

        </div>
    </form>




</div>


<div id="reload">
    <script>addRow(3,5)</script>
</div>

<script>renew()</script>

</body>

</html>

