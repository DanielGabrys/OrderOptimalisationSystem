@extends('body.main_theme')

@section('main')

    <div class="py-12">
        <div class="container">
            <div class="row">
                <div class="col-md-10">

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
                                <th scope="col">ID</th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>
                                <th scope="col"></th>

                            </tr>

                            </thead>

                            <tbody>


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
