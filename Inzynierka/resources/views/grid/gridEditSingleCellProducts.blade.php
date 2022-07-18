@extends('body.main_theme')

@section('main')

    @if(session('success'))

        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{session('success')}}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    @endif


    <div class="container-fluid d-flex justify-content-center">

            <form class="form-inline" action="{{route('addGridCellProduct')}}" method="POST">
                @csrf
                <div class="input-group mb-2 mr-sm-2">
                    <div class="input-group-prepend">
                        <div class="input-group-text">Place product on shelf</div>
                    </div>

                    <select class="form-select" name="product_id"  id="product_id" >
                        @foreach($accessable_products as $product)
                            <option value="{{$product->id}}">{{$product->id}} {{$product->name}}</option>
                        @endforeach
                    </select>
                </div>

                <input type="hidden" name="grid_id" value="{{$grid->id}}">
                <input type="hidden" name="cell_id" value="{{$cell_id}}">

                <button type="submit" class="btn btn-primary mb-2"> ADD </button>

            </form>
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



@endsection


