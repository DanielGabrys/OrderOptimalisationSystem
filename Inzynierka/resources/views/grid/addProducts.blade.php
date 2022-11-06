@extends('body.main_theme')

@section('main')

<div class="py-12">
    <div class="container">
        <div class="row">
            <div class="col-md-8">
                <div class="card">

                    @if(session('success'))

                        <div class="alert alert-success alert-dismissible fade show" role="alert">
                            <strong>{{session('success')}}</strong>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>

                    @endif

                    <div class="container mt-12"> All Products </div>

                    <table class="table">
                        <thead>


                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ID</th>
                            <th scope="col">Name</th>
                            <th scope="col">Size</th>
                            <th scope="col">Capability</th>

                            <th scope="col">Action</th>
                            <th scope="col"></th>

                        </tr>

                        </thead>

                        <tbody>

                        @foreach($products as $product)
                            <tr>
                                <th scope="row">{{$loop->index+1}}</th>
                                <td >{{$product->id }}</td>
                                <td >{{$product->name}}</td>
                                <td >{{$product->size_X}} x {{$product->size_Y}} x {{$product->size_Z}}</td>
                                <td >{{$product->size_X*$product->size_Y*$product->size_Z/1000}} l </td>


                                <td> <a href ="" class="btn btn-info"> Edit </a></td>
                                <td> <a href ="{{route('deleteProduct',$product->id)}}" class="btn btn-danger"> Delete </a></td>

                            </tr>
                        @endforeach


                        </tbody>
                    </table>

                    <div class="d-flex justify-content-center col-md-12">
                            {!! $products->links('pagination::bootstrap-4') !!}
                    </div>

                </div>
            </div>


            <div class="col-md-4">
                <div class="card">
                    <div class="card-header"> Add Product </div>
                    <div class="card-body">
                        <form action="{{route('addProduct')}}" method="POST">
                            @csrf
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="form-label">Product Name</label>
                                <input type="text" name="name" value="{{old('name')}}" class="form-control" id="brand_name" aria-describedby="emailHelp" >
                            </div>

                            @error('name')
                            <span class="text-danger">{{$message}}</span>
                            @enderror

                            <div class="form-group">
                                <label for="exampleInputEmail1" class="form-label"> Size (cm) </label>
                                <input type="number" name="size_x" value="{{old('size_x')}}" class="form-control" id="size_x"  placeholder="X">
                                @error('size_x')
                                <span class="text-danger">{{$message}}</span>
                                @enderror
                                <input type="number" name="size_y" value="{{old('size_y')}}" class="form-control" id="size_y"  placeholder="Y" >
                                @error('size_y')
                                <span class="text-danger">{{$message}}</span>
                                @enderror
                                <input type="number" name="size_z" value="{{old('size_z')}}" class="form-control" id="size_z"  placeholder="Z" >
                                @error('size_z')
                                <span class="text-danger">{{$message}}</span>
                                @enderror

                            </div>








                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">ADD</button>
                            </div>
                        </form>
                    </div>


                </div>
            </div>

        </div>

    </div>

    <!--trash part -->


</div>

@endsection
