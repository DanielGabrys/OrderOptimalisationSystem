<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
    <meta name="description" content="" />
    <meta name="author" content="" />
    <title>Dashboard - SB Admin</title>
    <link href="https://cdn.jsdelivr.net/npm/simple-datatables@latest/dist/style.css" rel="stylesheet" />
    <link href="{{asset('css/styles.css')}}" rel="stylesheet" />
    <script src="https://use.fontawesome.com/releases/v6.1.0/js/all.js" crossorigin="anonymous"></script>



    <script src="{{asset('Frontend/Js/Grid/BasicGrid.js')}}"></script>
    <script src="{{asset('Frontend/Js/Grid/CreateGrid.js')}}"></script>
    <script src="{{asset('Frontend/Js/Grid/ProductsGrid.js')}}"></script>
    <script src="{{asset('Frontend/Js/Grid/DetailedGrid.js')}}"></script>
    <script src="{{asset('Frontend/Js/Grid/ShowGrid.js')}}"></script>
    <script src="{{asset('Frontend/Js/Grid/EditStructureGrid.js')}}"></script>

    <script src="{{asset('Frontend/Js/Dikstra/DikstraGrid.js')}}"></script>

    <script src="{{asset('Frontend/Js/ShortestPath/Base.js')}}"></script>
    <script src="{{asset('Frontend/Js/ShortestPath/Naive.js')}}"></script>
    <script src="{{asset('Frontend/Js/ShortestPath/RectangleDivision.js')}}"></script>
    <script src="{{asset('Frontend/Js/ShortestPath/FarthestNeighbor.js')}}"></script>
    <script src="{{asset('Frontend/Js/ShortestPath/Nearest.js')}}"></script>
    <script src="{{asset('Frontend/Js/ShortestPath/GeneticAlgo/GeneticAlgo.js')}}"></script>


    <script src="{{asset('Frontend/Js/OrderOptimalisation/OrderOptimalisation.js')}}"></script>
    <script src="{{asset('Frontend/Js/OrderOptimalisation/ContainersOpt.js')}}"></script>
    <script src="{{asset('Frontend/Js/ShortestPath/SimulatedAnnealing.js')}}"></script>
    <script src="{{asset('Frontend/Js/OrderOptimalisation/worker.js')}}"></script>





    <link href="{{asset('Frontend/css/grid/grid.css')}}" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>


</head>

<body class="sb-nav-fixed">

<div id="layoutSidenav">
    <div id="layoutSidenav_nav">
        <nav class="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div class="sb-sidenav-menu">
                <div class="nav">
                    <div class="sb-sidenav-menu-heading">Siatka</div>
                    <a class="nav-link" href="{{route('addGrid')}}" >
                        <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                        Stwórz
                    </a>

                    <a class="nav-link" href="{{route('showGrids')}}">
                        <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                        Zarządzaj istniejącymi
                    </a>

                    <div class="sb-sidenav-menu-heading">Produkty</div>
                    <a class="nav-link" href="{{route('showProducts')}}" >
                        <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                        Dodaj produkty
                    </a>

                    <div class="sb-sidenav-menu-heading">Zamówienia</div>
                    <a class="nav-link" href="{{route('showOrders')}}" >
                        <div class="sb-nav-link-icon"><i class="fas fa-columns"></i></div>
                        Zamówienia
                    </a>

                    <div class="sb-sidenav-menu-heading">Optymalizacja zamówień</div>
                    <a class="nav-link" href="{{route('orderOptimalisationContainers')}}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                        Optymalizacja kontenerowa</a>

                    </a>

                    <a class="nav-link" href="{{route('orderOptResult')}}">
                        <div class="sb-nav-link-icon"><i class="fas fa-book-open"></i></div>
                        Listy kompletacyjne</a>

                    </a>

                </div>
            </div>
        </nav>
    </div>
    <div id="layoutSidenav_content">

        @yield('main')

        <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
                <div class="d-flex align-items-center justify-content-between small">
                    <div class="text-muted">Copyright &copy; Daniel Gabryś 2023</div>
                </div>
            </div>
        </footer>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js" crossorigin="anonymous"></script>
<script src="https://cdn.jsdelivr.net/npm/simple-datatables@latest" crossorigin="anonymous"></script>

</body>
</html>
