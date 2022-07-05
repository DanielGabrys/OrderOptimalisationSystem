@extends('body.main_theme')

@section('main')

    @if(session('success'))

        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{session('success')}}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    @endif

    <div class="py-12">
        <div class="container">
            <div class="row">
                <div class="col-md-8">

                    <div class="form-floating">
                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label for="floatingSelect">Place product on shelf</label>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <div class="py-12">
        <div class="container">
            <div class="row">
                <div class="col-md-8">

                    <table class="table table-success table-striped">
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
                            <td>{{$product->grid->position}}</td>
                            <td>@mdo</td>
                        </tr>
                        @endforeach

                        </tbody>
                    </table>

                </div>
            </div>
        </div>
    </div>



@endsection


