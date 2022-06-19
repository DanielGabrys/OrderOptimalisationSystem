@extends('body.main_theme')

@section('main')

    <x-app-layout>

        <div class="py-12">
            <div class="container">
                <div class="row">
                    <div class="col-md-8">
                        <div class="card">


                            <div class="card-header"> All Category </div>

                            <table class="table">
                                <thead>


                                <tr>
                                    <th scope="col">ID</th>
                                    <th scope="col">Height</th>
                                    <th scope="col">Entry</th>
                                    <th scope="col">Created</th>
                                    <th scope="col">Updated</th>
                                    <th scope="col"></th>

                                </tr>

                                </thead>

                                <tbody>

                                @foreach($grids as $grid)
                                    <tr>
                                        <th scope="row">{{$grid->firstItem()+$loop->index}}</th>
                                        <td >{{$grid->id}}</td>
                                        <td >{{$grid->width}} </td>
                                        <td >{{$grid->height}}</td>
                                        <td >{{$grid->entry}}</td>
                                        <td>{{$grid->created_at->diffForHumans()}}</td>
                                        <td> <a href ="{{url('category/edit/'.$grid->id)}}" class="btn btn-info"> Edit </a></td>
                                        <td> <a href ="{{url('softdelete/category/'.$grid->id)}}" class="btn btn-danger"> Delete </a></td>

                                    </tr>
                                @endforeach


                                </tbody>
                            </table>


                        </div>
                    </div>

                </div>

            </div>

        </div>

    </x-app-layout>

@endsection
