@extends('grid.gridLayouts.spinner')

@section('spinner')


    @include('grid.gridLayouts.basicGrid')

    <div class="container-fluid d-flex justify-content-center">

        <form class="form-inline">
            @csrf
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">START</div>
                </div>
                <input type="number" class="form-control" id="start" >
            </div>

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">KONIEC</div>
                </div>
                <input type="number" class="form-control" id="end" >
            </div>

            <button type="button" id="nodes_path" class="btn btn-primary mb-2" >OBLICZ</button>

            <input type="hidden" class="form-control" name="json_matrix" id="json_matrix" >

        </form>
    </div>

    <div class="container-fluid d-flex justify-content-center">

        <form class="form-inline" name="form" id="form">
            <button type="sumbit" id ="load_paths" name="load_paths" hidden="true" class="btn btn-success mb-2"> DOWNLOAD NODES </button>
        </form>
    </div>


    <div class="p-3 mb-3 mb-md-0 mr-md-3 bg-light" style="max-height: 200px; cursor: pointer">

        <table class="table table-dark table-striped">

            <thead>
            <tr>
                <th scope="col">START</th>
                <th scope="col">KONIEC</th>
                <th scope="col">DYSTANS</th>
                <th scope="col">DROGA</th>
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

        document.getElementById("nodes_path").addEventListener("click", function ()
        {
            cont.setStartEnd(document.getElementById('start').value,document.getElementById('end').value);
        })

    </script>


@endsection
