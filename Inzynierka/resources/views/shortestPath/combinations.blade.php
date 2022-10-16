@extends('body.main_theme')

@section('main')


    <div class="container-fluid d-flex justify-content-center">

        <form class="form-inline" action="{{route('combinationMatrix')}}" method="POST">
            @csrf
            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">ENTRY</div>
                </div>
                <input type="number" class="form-control" id="number" name="number" >
            </div>

            <button type="submit" id ="comb" class="btn btn-success mb-2" onclick="dikstra.shelvesToNeighborhoodMap()"> CALCULATE FOR ALL </button>

            <input type="hidden" class="form-control" name="json_matrix" id="json_matrix" >

        </form>

    </div>


    <script>

        combinations = new Combinations();

        let element = document.getElementById("comb");
        element.addEventListener("click", function(){ combinations.nextOrder(document.getElementById("number").value) });

        let element2 = document.getElementById("json_matrix");
        element.addEventListener("click", function(){ combinations.setJSONMatrix()});


    </script>

@endsection

