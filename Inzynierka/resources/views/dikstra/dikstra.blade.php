@extends('body.main_theme')

@section('main')




    <div id="reload">

        <script>
            dikstra = new DikstraGrid();
            dikstra.getProductsData({!! $products_array !!},{{$grid->shelfs}});
            dikstra.setSize({{$grid->height}},{{$grid->width}},700)
            dikstra.shelvesToGraph({{$grid->height}},{{$grid->width}},{{$grid->shelfs}})
        </script>


        @foreach(range(1, $grid->height*$grid->width) as $y)

            <a id="{{"a".$y}}" >
                <div id ="{{"b".$y}}" class="cell" >
                    <script>
                        dikstra.generateGridCells({{$grid->width}},{{$grid->height}},{{$y}})
                        dikstra.getHints({{$y}})
                        dikstra.colorizeProductsOnGrid({{$y}})
                    </script>
                </div>
            </a>

        @endforeach
    </div>

    <div class="container-fluid d-flex justify-content-center">

        <form class="form-inline">

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">ENTRY</div>
                </div>
                <input type="number" class="form-control" id="start" >
            </div>

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">END</div>
                </div>
                <input type="number" class="form-control" id="end" >
            </div>

            <button type="button" class="btn btn-primary mb-2" onclick="setStartEnd(document.getElementById('start').value,document.getElementById('end').value);">CALCULATE</button>
        </form>

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
                    <td id="steps"> </script> </td>
                    <td id="path"> </td>
                </tr>
            </tbody>
        </table>
    </div>

@endsection
