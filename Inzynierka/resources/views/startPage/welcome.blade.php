<!doctype html>
<html class="no-js" lang="en">

<head>
    <meta charset="utf-8">

    <!--====== Title ======-->
    <title>Smash - Bootstrap Business Template</title>

    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <!--====== Favicon Icon ======-->
    <link rel="shortcut icon" href="{{asset('MainPageTemplate/assets/images/favicon.png')}}" type="image/png">

    <!--====== Magnific Popup CSS ======-->
    <link rel="stylesheet" href="{{asset('MainPageTemplate/assets/css/magnific-popup.css')}}">

    <!--====== Slick CSS ======-->
    <link rel="stylesheet" href="{{asset('MainPageTemplate/assets/css/slick.css')}}">

    <!--====== Line Icons CSS ======-->
    <link rel="stylesheet" href="{{asset('MainPageTemplate/assets/css/LineIcons.css')}}">

    <!--====== Bootstrap CSS ======-->
    <link rel="stylesheet" href="{{asset('MainPageTemplate/assets/css/bootstrap.min.css')}}">

    <!--====== Default CSS ======-->
    <link rel="stylesheet" href="{{asset('MainPageTemplate/assets/css/default.css')}}">

    <!--====== Style CSS ======-->
    <link rel="stylesheet" href="{{asset('MainPageTemplate/assets/css/style.css')}}">

</head>

<body>
<!--[if IE]>
<p class="browserupgrade">You are using an <strong>outdated</strong> browser. Please <a href="https://browsehappy.com/">upgrade your browser</a> to improve your experience and security.</p>
<![endif]-->

<!--====== PRELOADER PART START ======-->

<div class="preloader">
    <div class="loader">
        <div class="ytp-spinner">
            <div class="ytp-spinner-container">
                <div class="ytp-spinner-rotator">
                    <div class="ytp-spinner-left">
                        <div class="ytp-spinner-circle"></div>
                    </div>
                    <div class="ytp-spinner-right">
                        <div class="ytp-spinner-circle"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!--====== PRELOADER PART ENDS ======-->

<!--====== NAVBAR TWO PART START ======-->

<section class="navbar-area">
    <div class="container">
        <div class="row">
            <div class="col-lg-12">
                <nav class="navbar navbar-expand-lg">

                    <a class="navbar-brand" href="#">

                    </a>

                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTwo" aria-controls="navbarTwo" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="toggler-icon"></span>
                        <span class="toggler-icon"></span>
                        <span class="toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse sub-menu-bar" id="navbarTwo">
                        <ul class="navbar-nav m-auto">
                            <li class="nav-item active"><a class="page-scroll" href="#home">home</a></li>
                            <li class="nav-item"><a class="page-scroll" href="#info">O Aplikacji</a></li>
                            <li class="nav-item"><a class="page-scroll" href="#aim">Optymalizacja</a></li>
                            <li class="nav-item"><a class="page-scroll" href="#galery">Galeria</a></li>
                            <li class="nav-item"><a class="page-scroll" href="#tutorial">Tutorial</a></li>
                        </ul>
                    </div>

                    <div class="navbar-btn d-none d-sm-inline-block">
                        <ul>
                            <li><a class="solid" href="https://github.com/DanielGabrys/OrderOptimalisationSystem" target ="blank" >
                                    <i class="bi bi-github"></i>
                                    Download
                                </a>
                            </li>
                        </ul>
                    </div>
                </nav> <!-- navbar -->
            </div>
        </div> <!-- row -->
    </div> <!-- container -->
</section>

<!--====== NAVBAR TWO PART ENDS ======-->

<!--====== SLIDER PART START ======-->

<section id="home" class="slider_area">
    <div id="carouselThree" class="carousel slide" data-ride="carousel">
        <ol class="carousel-indicators">
            <li data-target="#carouselThree" data-slide-to="0" class="active"></li>
        </ol>

        <div class="carousel-inner">
            <div class="carousel-item active">
                <div class="container">
                    <div class="row">
                        <div class="col-lg-6">
                            <div class="slider-content">
                                <h1 class="title"> WMS </h1>
                                <p class="text">Aplikacja usprawniająca proces realizacji zamówień na hali magazynowej</p>



                                    @if (Route::has('login'))
                                    <ul class="slider-btn rounded-buttons">
                                            @auth
                                            <li>   <a href="{{ url('/dashboard') }}" class="main-btn rounded-one">Menu</a> </li>
                                            @else
                                            <li> <a href="{{ route('login') }}" class="main-btn rounded-one" >ZALOGUJ SIĘ</a> </li>

                                                @if (Route::has('register'))
                                                <li>  <a href="{{ route('register') }}" class="main-btn rounded-one" >REJESTRACJA</a> </li>
                                                @endif
                                            @endauth
                                    </ul>
                                    @endif
                            </div>
                        </div>
                    </div> <!-- row -->
                </div> <!-- container -->
                <div class="slider-image-box d-none d-lg-flex align-items-end">
                    <div class="slider-image">
                        <img src="{{asset('MainPageTemplate/assets/images/slider/1.png')}}" alt="Hero">
                    </div> <!-- slider-imgae -->
                </div> <!-- slider-imgae box -->
            </div> <!-- carousel-item -->


        </div>


        <a class="carousel-control-prev" href="#carouselThree" role="button" data-slide="prev">
            <i class="lni lni-arrow-left"></i>
        </a>
        <a class="carousel-control-next" href="#carouselThree" role="button" data-slide="next">
            <i class="lni lni-arrow-right"></i>
        </a>
    </div>
</section>



<section id="info" class="features-area">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-10">
                <div class="section-title text-center pb-10">
                    <h3 class="title"> Motywacja</h3>
                    <p class="text">

                        Pomysł do stworzenia aplikacji narodził się podczas pracy na
                        hali magazynowej. Każdego dnia pracodawca określał pulę zamówień do realizacji.
                        Do zadań pracownika należało skompletowanie zamówień oraz ich zapakowanie. Po
                        magazynie przemieszano się wózkiem na którym znajdowały się kontenery,
                        do kontenerów umieszczano zamówienie. Standardowe podejście polega na realizacji
                        jednego zamówienia po drugim tzn. dobranie odpowiednio dużego kontenera pozyskanie
                        produktów z listy, powrót do pozycji startowej, dobranie kolejnego zamówienia i
                        powtarzanie cyklu aż do realizacji wszystkich zamówień z puli. Takie podejście staje się
                        szczególnie nieoptymalne, jeśli mamy do czynienia z magazynem o dużej powierzchni
                        kwadratowej.



                    </p>
                </div> <!-- row -->
            </div>
        </div> <!-- row -->
        <div class="row justify-content-center">
            <img src="{{asset('MainPageTemplate/assets/images/slider/warehouse.jpeg')}}" alt="Hero">
        </div> <!-- row -->
    </div> <!-- container -->
</section>

<section id="aim" class="features-area">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-10">
                <div class="section-title text-center pb-10">
                    <h3 class="title"> Optymalizacja</h3>
                    <p class="text">

                        Zadaniem aplikacji jest podział puli zamówień na podgrupy tak,
                        aby można było realizować równolegle kilka, w możliwie jak najkrótszej sumarycznej
                        drodze przy uwzględnieniu ładowności kontenerów oraz pojazdu. Celem podziału jest
                        przekazanie pracownikowi wygenerowanej listy produktów w celu przeprowadzenia
                        procesu kompletacji. Powyższe podejście pozwoli skrócić drogę przemieszczania, a zatem
                        i czas potrzebny na realizację zamówień w hali magazynowej.

                    </p>
                </div> <!-- row -->
            </div>
        </div> <!-- row -->
        <div class="row justify-content-center">
            <img src="{{asset('MainPageTemplate/assets/images/mechanizm.png')}}" alt="Hero">
        </div> <!-- row -->
    </div> <!-- container -->
</section>

<section id="galery" class="portfolio-area portfolio-four pb-100">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-10">
                <div class="section-title text-center pb-10">
                    <h3 class="title">Galeria</h3>
                    <p class="text"></p>
                </div>
            </div>
        </div> <!-- row -->
        <div class="row">
            <div class="col-lg-3 col-md-3">
                <div class="portfolio-menu text-center mt-50">
                    <ul>
                        <li data-filter="*" class="active">Wszystko</li>
                        <li data-filter=".model-4">Model Hali</li>
                        <li data-filter=".products-4">Produkty</li>
                        <li data-filter=".orders-4">Zamówienia</li>
                        <li data-filter=".opt-4">Optymalizacja</li>
                        <li data-filter=".result-4">Rezultat</li>
                    </ul>
                </div> <!-- portfolio menu -->
            </div>
            <div class="col-lg-9 col-md-9">
                <div class="row no-gutters grid mt-50">

                    <div class="col-lg-4 col-sm-6 model-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/schemat_hali1.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"  href="{{asset('MainPageTemplate/assets/images/dzialanie/schemat_hali1.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/schemat_hali1.png')}}" alt="shape" class="shape">

                                        </div>
                                        <div class="portfolio-icon">

                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/schemat_hali1.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- single portfolio -->
                    </div>
                    <div class="col-lg-4 col-sm-6 model-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/tworzenie_siatki.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"  href="{{asset('MainPageTemplate/assets/images/dzialanie/tworzenie_siatki.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/tworzenie_siatki.png')}}" alt="shape" class="shape">

                                        </div>
                                        <div class="portfolio-icon">

                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/tworzenie_siatki.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- single portfolio -->
                    </div>
                    <div class="col-lg-4 col-sm-6 model-4 products-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/schemat_hali3.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"  href="{{asset('MainPageTemplate/assets/images/dzialanie/schemat_hali3.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/schemat_hali3.png')}}" alt="shape" class="shape">

                                        </div>
                                        <div class="portfolio-icon">

                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/schemat_hali3.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- single portfolio -->
                    </div>
                    <div class="col-lg-4 col-sm-6 model-4 products-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/zarzadzaj.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"  href="{{asset('MainPageTemplate/assets/images/dzialanie/zarzadzaj.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/zarzadzaj.png')}}" alt="shape" class="shape">

                                        </div>
                                        <div class="portfolio-icon">

                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/zarzadzaj.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- single portfolio -->
                    </div>

                    <div class="col-lg-4 col-sm-6 products-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/produkty.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"  href="{{asset('MainPageTemplate/assets/images/dzialanie/produkty.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/produkty.png')}}" alt="shape" class="shape">

                                        </div>
                                        <div class="portfolio-icon">

                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/produkty.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- single portfolio -->
                    </div>
                    <div class="col-lg-4 col-sm-6 products-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/produkty2.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"  href="{{asset('MainPageTemplate/assets/images/dzialanie/produkty2.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/produkty2.png')}}" alt="shape" class="shape">

                                        </div>
                                        <div class="portfolio-icon">

                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/produkty2.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- single portfolio -->
                    </div>
                    <div class="col-lg-4 col-sm-6 orders-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/zamówienia.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"  href="{{asset('MainPageTemplate/assets/images/dzialanie/zamówienia.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/zamówienia.png')}}" alt="shape" class="shape">

                                        </div>
                                        <div class="portfolio-icon">

                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/zamówienia.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- single portfolio -->
                    </div>
                    <div class="col-lg-4 col-sm-6 orders-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/zamówienia2.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"  href="{{asset('MainPageTemplate/assets/images/dzialanie/zamówienia2.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/zamówienia2.png')}}" alt="shape" class="shape">

                                        </div>
                                        <div class="portfolio-icon">

                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/zamówienia2.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- single portfolio -->
                    </div>

                    <div class="col-lg-4 col-sm-6 opt-4 result-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/wyniki_opt.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"  href="{{asset('MainPageTemplate/assets/images/dzialanie/wyniki_opt.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/wyniki_opt.png')}}" alt="shape" class="shape">

                                        </div>
                                        <div class="portfolio-icon">

                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/wyniki_opt.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- single portfolio -->
                    </div>
                    <div class="col-lg-4 col-sm-6 opt-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/optymalizacja_menu.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"  href="{{asset('MainPageTemplate/assets/images/dzialanie/optymalizacja_menu.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/optymalizacja_menu.png')}}" alt="shape" class="shape">

                                        </div>
                                        <div class="portfolio-icon">

                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/optymalizacja_menu.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div > <!-- single portfolio -->
                    </div>

                    <div class="col-lg-4 col-sm-6 result-4">

                        <div class="single-portfolio">
                            <div class="portfolio-image">
                                <img class="img-galery" src="{{asset('MainPageTemplate/assets/images/dzialanie/lista_pdf.png')}}" alt="">
                                <div class="portfolio-overlay d-flex align-items-center justify-content-center">
                                    <div class="portfolio-content">
                                        <div class="portfolio-icon">
                                            <a class="image-popup"   href="{{asset('MainPageTemplate/assets/images/dzialanie/lista_pdf.png')}}"><i class="lni lni-zoom-in"></i></a>
                                            <img   src="{{asset('MainPageTemplate/assets/images/dzialanie/lista_pdf.png')}}" alt="shape" class="shape">

                                        </div>

                                        <div class="portfolio-icon">
                                            <img  src="{{asset('MainPageTemplate/assets/images/dzialanie/lista_pdf.png')}}" alt="shape" class="shape">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> <!-- single portfolio -->
                    </div>



                </div> <!-- row -->
            </div>
        </div> <!-- row -->
    </div> <!-- container -->
</section>

<section id="tutorial" class="features-area">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6 col-md-10">
                <div class="section-title text-center pb-10">
                    <h3 class="title"> Tutorial</h3>
                    <p class="text">

                    </p>
                </div> <!-- row -->
            </div>
        </div> <!-- row -->
        <div class="row justify-content-center">
            <div class="embed-responsive embed-responsive-16by9">
                <iframe class="embed-responsive-item" src="https://www.youtube.com/embed/zpOULjyy-n8?rel=0" allowfullscreen></iframe>
            </div>
        </div> <!-- row -->
    </div> <!-- container -->
</section>





<!--====== FOOTER PART START ======-->

<section class="footer-area footer-dark">
    <div class="container">
        <div class="row justify-content-center">
            <div class="col-lg-6">

                <ul class="social text-center mt-60">
                    <li><a href="https://facebook.com/uideckHQ"><i class="lni lni-facebook-filled"></i></a></li>
                    <li><a href="https://twitter.com/uideckHQ"><i class="lni lni-twitter-original"></i></a></li>
                    <li><a href="https://instagram.com/uideckHQ"><i class="lni lni-instagram-original"></i></a></li>
                    <li><a href="#"><i class="lni lni-linkedin-original"></i></a></li>
                </ul> <!-- social -->
                <div class="footer-support text-center">
                    <span class="number">+8801234567890</span>
                    <span class="mail">support@wms.com</span>
                </div>
                <div class="copyright text-center mt-35">

                </div> <!--  copyright -->
            </div>
        </div> <!-- row -->
    </div> <!-- container -->
</section>

<!--====== FOOTER PART ENDS ======-->

<!--====== BACK TOP TOP PART START ======-->

<a href="#" class="back-to-top"><i class="lni lni-chevron-up"></i></a>

<!--====== BACK TOP TOP PART ENDS ======-->

<!--====== PART START ======-->

<!--
    <section class="">
        <div class="container">
            <div class="row">
                <div class="col-lg-">

                </div>
            </div>
        </div>
    </section>
-->

<!--====== PART ENDS ======-->




<!--====== Jquery js ======-->
<script src="{{asset('MainPageTemplate/assets/js/vendor/jquery-1.12.4.min.js')}}"></script>
<script src="{{asset('MainPageTemplate/assets/js/vendor/modernizr-3.7.1.min.js')}}"></script>

<!--====== Bootstrap js ======-->
<script src="{{asset('MainPageTemplate/assets/js/popper.min.js')}}"></script>
<script src="{{asset('MainPageTemplate/assets/js/bootstrap.min.js')}}"></script>

<!--====== Slick js ======-->
<script src="{{asset('MainPageTemplate/assets/js/slick.min.js')}}"></script>

<!--====== Magnific Popup js ======-->
<script src="{{asset('MainPageTemplate/assets/js/jquery.magnific-popup.min.js')}}"></script>

<!--====== Ajax Contact js ======-->
<script src="{{asset('MainPageTemplate/assets/js/ajax-contact.js')}}"></script>

<!--====== Isotope js ======-->
<script src="{{asset('MainPageTemplate/assets/js/imagesloaded.pkgd.min.js')}}"></script>
<script src="{{asset('MainPageTemplate/assets/js/isotope.pkgd.min.js')}}"></script>

<!--====== Scrolling Nav js ======-->
<script src="{{asset('MainPageTemplate/assets/js/jquery.easing.min.js')}}"></script>
<script src="{{asset('MainPageTemplate/assets/js/scrolling-nav.js')}}"></script>

<!--====== Main js ======-->
<script src="{{asset('MainPageTemplate/assets/js/main.js')}}"></script>

</body>

</html>

<style>

    .img-galery
    {
        width: 275px ;
        height: 164px;
    }

</style>
