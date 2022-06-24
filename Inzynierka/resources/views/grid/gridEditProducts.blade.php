@extends('body.main_theme')

@section('main')

    @if(session('success'))

        <div class="alert alert-success alert-dismissible fade show" role="alert">
            <strong>{{session('success')}}</strong>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>

    @endif

    <div id="reload">
        <script>
            editProductsOnGrid({{$grid->height}},{{$grid->width}},{{$grid->shelfs}})
            //renew()
        </script>
    </div>

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

                <div class="modal-body">
                    <div class="form-floating">
                        <select class="form-select" id="floatingSelect" aria-label="Floating label select example">
                            <option selected>Open this select menu</option>
                            <option value="1">One</option>
                            <option value="2">Two</option>
                            <option value="3">Three</option>
                        </select>
                        <label for="floatingSelect">Delete product from shelf</label>
                    </div>
                </div>


                <table class="table table table-success table-striped" id="actProducts">

                    <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Product Name</th>
                        <th scope="col">Product ID</th>
                        <th scope="col">position</th>
                    </tr>
                    </thead>

                    <tbody>

                    @foreach($gridProducts as $gridProduct)
                        <tr>
                            <th scope="row">2</th>
                            <td>{{$gridProduct->id}}</td>
                            <td>{{$gridProduct->name}}</td>
                            <td>{{$gridProduct->position}}</td>
                        </tr>
                    </tbody>
                    @endforeach

                </table>

                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>

            </div>
        </div>
    </div>

    <script>
        $('.bd-example-modal-lg').on('show.bs.modal', function (event) {
            var button = $(event.relatedTarget) // Button that triggered the modal
            const myArray = button.data('whatever');
            // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
            // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.

            var modal = $(this)
            modal.find('.modal-title').text('Schema ' + myArray)
            modal.set

        })

    </script>


@endsection


