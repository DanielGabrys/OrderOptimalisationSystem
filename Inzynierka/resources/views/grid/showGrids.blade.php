@extends('body.main_theme')

@section('main')

        <div class="py-12">
            <div class="container">
                <div class="row">
                    <div class="col-md-10">

                        @if(session('success'))

                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>{{session('success')}}</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>

                        @endif

                            @if(session('middleware'))

                                <div class="alert alert-warning alert-dismissible fade show" role="alert">
                                    <strong>{{session('middleware')}}</strong>
                                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>

                            @endif



                        <div class="card">

                            <div class="card-header"> MODELE MAGAZYNU </div>

                            <table class="table-sm">
                                <thead>


                                <tr>
                                    <th scope="col">NR</th>
                                    <th scope="col">WYMIARY</th>
                                    <th scope="col">ID</th>
                                    <th scope="col">UTWORZONO</th>
                                    <th scope="col">AKTYWNA</th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"></th>

                                </tr>

                                </thead>

                                <tbody>

                                @foreach($grids as $grid)
                                    <tr>
                                        <td >{{$loop->iteration}}</td>
                                        <td >{{$grid->height}}x{{$grid->width}}</td>
                                        <td >{{$grid->id}}</td>
                                        <td>{{$grid->created_at->diffForHumans()}}</td>

                                        @if($grid->isActive)
                                             <td> <a href ="{{route('activateGrid',$grid->id)}}" class="btn btn-success"> AKTYWNA</a></td>
                                        @else
                                            <td> <a href ="{{route('activateGrid',$grid->id)}}" class="btn btn-secondary"> AKTYWUJ</a></td>
                                        @endif
                                        <td> <a href ="{{route('editGrid',$grid->id)}}" class="btn btn-warning"> EDYTUJ STRUKTURĘ</a></td>
                                        <td> <a href ="{{route('editGridProducts',$grid->id)}}" class="btn btn-info"> EDYTUJ PRODUKTY </a></td>
                                        <td> <a href ="{{route('deleteGrid',$grid->id)}}" class="btn btn-danger"> USUŃ </a></td>
                                        <td> <a href ="{{route('Paths',$grid->id)}}" class="btn btn-secondary"> ŚCIEŻKI </a></td>

                                    </tr>
                                @endforeach

                                </tbody>
                            </table>

                        </div>

                    </div>

                </div>


                <!--modal windows-->
                <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">

                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>

                            <div class="modal-body">
                                <div id="reload">
                                </div>
                            </div>

                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                            </div>

                        </div>
                    </div>
                </div>

        </div>


@endsection
