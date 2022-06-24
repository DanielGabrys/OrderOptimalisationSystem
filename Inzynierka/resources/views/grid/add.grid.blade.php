@extends('body.main_theme')

@section('main')

    <x-app-layout>

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


                            {{$categories->appends(['trh'=>$trashCategories->currentPage()])->links()}}
                            <div class="card-header"> All Category </div>


                            <table class="table">
                                <thead>


                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">User ID</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Action</th>
                                    <th scope="col"></th>

                                </tr>

                                </thead>

                                <tbody>

                                @foreach($categories as $category)
                                    <tr>
                                        <th scope="row">{{$categories->firstItem()+$loop->index}}</th>
                                        <td >{{$category->user_id}}</td>
                                        <td >{{ $category->users->name}}</td>
                                        <td>{{$category->category_name}}</td>
                                        <td>{{$category->created_at->diffForHumans()}}</td>
                                        <td> <a href ="{{url('category/edit/'.$category->id)}}" class="btn btn-info"> Edit </a></td>
                                        <td> <a href ="{{url('softdelete/category/'.$category->id)}}" class="btn btn-danger"> Delete </a></td>

                                    </tr>
                                @endforeach


                                </tbody>
                            </table>


                        </div>
                    </div>

                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-header"> Add Category </div>
                            <div class="card-body">
                                <form action="{{route('store.category')}}" method="POST" >
                                    @csrf
                                    <div class="form-group">
                                        <label for="exampleInputEmail1" class="form-label">Category Name</label>
                                        <input type="text" name="category_name" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp">
                                    </div>

                                    @error('category_name')
                                    <span class="text-danger">{{$message}}</span>
                                    @enderror

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

            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">


                            {{$trashCategories->appends(['cat'=>$categories->currentPage()])->links()}}
                            <div class="card-header"> Trash Categories</div>


                            <table class="table">
                                <thead>


                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">User ID</th>
                                    <th scope="col">User Name</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Restore</th>
                                    <th scope="col">Delete</th>

                                </tr>

                                </thead>

                                <tbody>

                                @foreach($trashCategories as $category)
                                    <tr>
                                        <th scope="row">{{$trashCategories->firstItem()+$loop->index}}</th>
                                        <td >{{$category->user_id}}</td>
                                        <td >{{ $category->users->name}}</td>
                                        <td>{{$category->category_name}}</td>
                                        <td>{{$category->created_at->diffForHumans()}}</td>
                                        <td> <a href ="{{url('category/restore/'.$category->id)}}" class="btn btn-info"> Restore </a></td>
                                        <td> <a href ="{{url('category/pdelete/'.$category->id)}}" class="btn btn-danger"> Delete permanetly </a></td>

                                    </tr>
                                @endforeach


                                </tbody>
                            </table>


                        </div>
                    </div>

                    <div class="col-md-4">

                    </div>

                </div>

            </div>




        </div>

    </x-app-layout>

@endsection
