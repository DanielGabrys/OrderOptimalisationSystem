@extends('body.main_theme')

@section('main')

    @if(session('success'))

        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{session('success')}}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    @endif

    <div class="container-fluid d-flex">
        <button type="button" class="btn btn-primary" onclick="location.href='{{route('editGridProducts',$grid->id)}}'">POWRÓT </a> </button>
    </div>

    <div class="container-fluid d-flex justify-content-center">


            <form class="form-inline" action="{{route('addGridCellProduct')}}" method="POST">
                @csrf
                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Choose product</div>
                    </div>

                    <select class="form-select" name="product_id"  id="product_id" >
                        @foreach($accessable_products as $product)
                            <option value="{{$product->id}}">{{$product->id}} {{$product->name}}</option>
                        @endforeach
                    </select>
                </div>

                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Choose place</div>
                    </div>

                    <select class="form-select" name="desired_position"  id="desired_position" >
                        @foreach(json_decode($fields) as $field)
                            <option value="{{$field}}">{{$field}}</option>
                        @endforeach
                    </select>
                </div>


                <input type="hidden" name="grid_id" value="{{$grid->id}}">
                <input type="hidden" name="cell_id" value="{{$cell_id}}">

                <button type="submit" class="btn btn-primary mb-2"> ADD </button>



            </form>
    </div>

    <div class="container-fluid d-flex justify-content-center">

        @error('product_id')
        <span class="text-danger">{{$message}}</span>
        @enderror

        @error('desired_position')
        <span class="text-danger">{{$message}}</span>
        @enderror

    </div>

    <div class="py-12">
        <div class="container">
            <div class="row">
                <div class="col-md-8">

                    <div class="card-header">
                    <table class="table ">
                        <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">ID</th>
                            <th scope="col">Position</th>
                        </tr>
                        </thead>
                        <tbody>

                        @foreach($CellProducts as $product)
                        <tr>
                            <th scope="row">{{$loop->iteration}}</th>
                            <td>{{$product->name}}</td>
                            <td>{{$product->id}}</td>
                            <td>{{$product->pivot->position}}</td>
                            <td><a href ="{{route('deleteGridProduct',$product->pivot->id)}}" class="btn btn-danger"> Delete </a></td>

                        </tr>
                        @endforeach

                        </tbody>
                    </table>
                </div>

                </div>
            </div>
        </div>
    </div>

    <div id="reload">

        <script>
            detailedGrid.setSize({{$field_size[1]}},{{$field_size[0]}},200);
            detailedGrid.getDetailedFields({{$fields}},{{$grid->shelfs}})
        </script>


        @foreach(range(1, count($neibours)?? 0) as $y)

            <a id="{{"a".$neibours[$loop->index]}}" >
                <div id ="{{"b".$neibours[$loop->index]}}" class="cell" >
                    <script>
                      detailedGrid.generateGridCells({{$grid->height}},{{$grid->width}},{{$neibours[$loop->index]}})
                      detailedGrid.changeFieldsColorToOrange({{$neibours[$loop->index]}})
                    </script>
                </div>
            </a>

        @endforeach

    </div>

@endsection


