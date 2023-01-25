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
                    @elseif(session('failure'))

                        <div class="alert alert-warning alert-dismissible fade show" role="alert">
                            <strong>{{session('failure')}}</strong>
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

                        @foreach($orders as $order)
                            <tr>
                                <th scope="row">{{$loop->index+1}}</th>
                                <td >{{$order->id }}</td>
                                <td >{{$order->primary}}</td>
                                <td >{{$order->created_at}} </td>
                                <td >{{$order->updated_at}}</td>

                                <td> <a href ="" class="btn btn-info"> Show </a></td>
                                <td> <a href ="{{route('deleteOrder',$order->id)}}" class="btn btn-danger"> Delete </a></td>

                            </tr>
                        @endforeach


                        </tbody>
                    </table>

                    <div class="d-flex justify-content-center col-md-12">
                            {!! $orders->links('pagination::bootstrap-4') !!}
                    </div>

                </div>
            </div>


            <div class="col-md-4">
                <div class="card">
                    <div class="card-header"> Load Orders</div>
                    <div class="card-body">
                        <form action="{{route('uploadOrders')}}" method="POST" enctype="multipart/form-data">
                            @csrf
                            <div class="form-group">
                                <label for="exampleInputEmail1" class="form-label">Orders</label>
                                <input type="file" name="file" value="{{old('file')}}" class="form-control" id="file" aria-describedby="emailHelp" >
                            </div>

                            @error('file')
                            <span class="text-danger">{{$message}}</span>
                            @enderror

                            <div class="form-group">
                                <label for="exampleInputEmail1" class="form-label">Products in Orders</label>
                                <input type="file" name="file2" value="{{old('file2')}}" class="form-control" id="file2" aria-describedby="emailHelp" >
                            </div>

                            @error('file2')
                            <span class="text-danger">{{$message}}</span>
                            @enderror

                            <table class="table table-dark">
                                <thead>
                                <tr>
                                    <th scope="col">Bieżący schemat</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>{{$grid}}</td>
                                </tr>

                                </tbody>
                            </table>



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
