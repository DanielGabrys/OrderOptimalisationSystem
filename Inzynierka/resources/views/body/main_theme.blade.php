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
    <link href="{{asset('Frontend/css/loader/loader.css')}}" rel="stylesheet">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/css/bootstrap.min.css" integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm" crossorigin="anonymous">
    <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.12.9/dist/umd/popper.min.js" integrity="sha384-ApNbgh9B+Y1QKtv3Rn7W3mgPxhU9K/ScQsAP7hUibX39j7fakFPskvXusvfa0b4Q" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.0.0/dist/js/bootstrap.min.js" integrity="sha384-JZR6Spejh4U02d8jOt6vLEHfe/JQGiRRSQQxSfFWpi1MquVdAyjUar5+76PVCmYl" crossorigin="anonymous"></script>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>

<body class="sb-nav-fixed">
<nav class="sb-topnav navbar navbar-expand navbar-dark bg-dark">
    <!-- Navbar Brand-->
    <a class="navbar-brand ps-3" href="index.html"> WMS</a>
    <!-- Sidebar Toggle-->
    <button class="btn btn-link btn-sm order-1 order-lg-0 me-4 me-lg-0" id="sidebarToggle" href="#!"><i class="fas fa-bars"></i></button>
    <!-- Navbar Search-->
    <!--
    <form class="d-none d-md-inline-block form-inline ms-auto me-0 me-md-3 my-2 my-md-0">
        <div class="input-group">
            <input class="form-control" type="text" placeholder="Search for..." aria-label="Search for..." aria-describedby="btnNavbarSearch" />
            <button class="btn btn-primary" id="btnNavbarSearch" type="button"><i class="fas fa-search"></i></button>
        </div>
    </form>
     Navbar-->
    <ul class="navbar-nav ms-auto ms-md-0 me-3 me-lg-4">
        <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false"><i class="fas fa-user fa-fw"></i></a>
            <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                <li><a class="dropdown-item" href="{{route('profile.edit')}}">Profile</a></li>

                <form method="POST" action="{{ route('logout') }}">
                    @csrf
                    <li><a class="dropdown-item" href="" onclick="event.preventDefault(); this.closest('form').submit();">Logout</a></li>
                </form>

            </ul>
        </li>
    </ul>
</nav>
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
            <div class="sb-sidenav-footer">
                <div class="small">Logged in as:</div>
                Start Bootstrap
            </div>
        </nav>
    </div>
    <div id="layoutSidenav_content">

                @yield('main')

        <footer class="py-4 bg-light mt-auto">
            <div class="container-fluid px-4">
                <div class="d-flex align-items-center justify-content-between small">
                    <div class="text-muted">Copyright &copy; Your Website 2022</div>
                    <div>
                        <a href="#">Privacy Policy</a>
                        &middot;
                        <a href="#">Terms &amp; Conditions</a>
                    </div>
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



