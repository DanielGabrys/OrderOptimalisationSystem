@extends('body.main_theme')

@section('main')


        <div class="loader text-center" id="loader_container">
            <div class="loader-inner">

                <!-- Animated Spinner -->
                <div class="lds-roller mb-3">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>

                <!-- Spinner Description Text [For Demo Purpose]-->
                <h4 class="text-uppercase font-weight-bold">Loading</h4>
                <p class="font-italic text-muted">Trwa wczytywanie siatki </p>
            </div>
        </div>


    @yield('spinner')

    <script>  document.getElementById('loader_container').style.display = "none" </script>


@endsection

