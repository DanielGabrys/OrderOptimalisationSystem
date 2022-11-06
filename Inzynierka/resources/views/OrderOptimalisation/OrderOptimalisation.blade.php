@extends('body.main_theme')

@section('main')

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


    <div id="reload">

        <script>
            genetic = new OrderOptimalisation();
            genetic.setSize({{$grid->height}},{{$grid->width}},700)
            genetic.getProductsData({!! $products_array !!},{{$grid->shelfs}});
            genetic.shelvesToGraph();
        </script>


        @foreach(range(1, $grid->height*$grid->width) as $y)

            <a id="{{"a".$y}}" >
                <div id ="{{"b".$y}}" class="cell" >
                    <script>
                        genetic.generateGridCells({{$grid->height}},{{$grid->width}},{{$y}})
                        genetic.getHints({{$y}})
                        genetic.colorizeProductsOnGrid({{$y}})
                    </script>
                </div>
            </a>

        @endforeach
    </div>

    <div class="row">
        <div class="col">


            <div class="collapse multi-collapse" id="multiCollapseExample1">

                <div class="container-fluid d-flex justify-content-center" id="data_block">
                    <div class="overflow-auto p-3 mb-3 mb-md-4 mr-md-4 bg-light" style="max-height: 200px; cursor: pointer">

                        <table class="table table-active table-striped" id="products_table">

                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Schelf</th>
                                <th scope="col">Desired Position</th>
                                <th scope="col">Add</th>
                            </tr>
                            </thead>

                            <tbody>
                            @foreach($gridProducts as $product)

                                <tr id="{{"tr".$loop->iteration}}" >
                                    <th scope="row">{{$loop->iteration}}</th>
                                    <td>{{$product->name}}</td>
                                    <td>{{$product->pivot->position}}</td>
                                    <td>{{$product->pivot->desired_position}}</td>
                                    <td>
                                        <button type="button" id="{{"bt".$loop->index}}" class="btn btn-primary mb-2" >ADD</button>
                                    </td>
                                </tr>
                            @endforeach
                            </tbody>
                        </table>

                    </div>
                    <div class="overflow-auto p-3 mb-3 mb-md-4 mr-md-4 bg-light" style="max-height: 200px; cursor: pointer">

                        <table class="table table-primary table-striped" id="selection_table">

                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Schelf</th>
                                <th scope="col">Desired Position</th>
                                <th scope="col">DELETE</th>
                            </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>

                    </div>
                </div>

            </div>
        </div>
    </div>

    <div class="container-fluid mt-2 d-flex justify-content-center">
        <form class="form-inline">

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">MAX ORDER SIZE</div>
                </div>
                <input type="number" class="form-control" id="join_size" name="join_size"  value=15 style="width: 80px;">
            </div>


            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">ORDERS</div>
                </div>
                <input type="number" class="form-control" id="orders_number" name="orders_number" value=5 style="width: 80px;">
            </div>

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">DIVISION</div>
                </div>
                <input type="number" class="form-control" id="division" name="division"  value=2 style="width: 80px;">
            </div>

            <button type="button" id="load_random" class="btn btn-warning btn-sm" >RANDOM</button>

        </form>


    </div>
    <div class="container-fluid d-flex justify-content-center">
        <form class="form-inline">

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">POPULATION</div>
                </div>
                <input type="number" class="form-control" id="population" name="population"  value=10 style="width: 80px;">
            </div>

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">ITERATION</div>
                </div>
                <input type="number" class="form-control" id="iteration" name="iteration" value=3 style="width: 80px;">
            </div>


        </form>

    </div>

    <div class="container-fluid d-flex justify-content-center" id="legend">
    </div>


    <div class="container-fluid mt-1 d-flex justify-content-center">
        <div class="loader" name="loader" id="loader"></div>
    </div>

    <div class="container-fluid mt-1 d-flex justify-content-center" name="progress" id="progress">
    </div>

    <div class="container-fluid mt-3 d-flex justify-content-center" id="finalCombination">
    </div>

    <div class="container-fluid mt-2 d-flex justify-content-center" >
        <form class="form-inline" action="{{route('orderOptResults')}}" method="POST">
            @csrf
                <input type="hidden" class="form-control" id="results" name="results"  value=15 style="width: 80px;">

            <button type="submit" id="show_results" class="btn btn-warning btn-sm" >Show Results</button>
        </form>

    </div>






    <script>


        hideDivElements();

        let element2 = document.getElementById("load_random");
        element2.addEventListener("click", function()
        {

            document.getElementById("loader").hidden = false;
            let size = document.getElementById("join_size").value;
            let orders_num = document.getElementById("orders_number").value;
            let divider = document.getElementById("division").value;
            let population = document.getElementById("population").value;
            let iteration = document.getElementById("iteration").value;

            genetic.getEntry({{$grid->entry}});
            genetic.getPathMatrix({!! $path_matrix !!});
            genetic.setGeneticData(population, iteration);
            genetic.orderList = genetic.createRandomOrders(orders_num, size);
            genetic.createPopulation();
            genetic.createOrderPopulation(divider);

            genetic.colorizeOrders();
            genetic.createLegend();

            console.log("orderList",genetic.orderList);
            console.log("colors",genetic.orderColors);
            console.time('start')
            for(let i=0;i<genetic.orderIteration;i++)
            {
                for (let key=0;key<genetic.orderPopulationSize;key++)
                {
                    setTimeout(SingleIteration,0,key,i);
                }
                setTimeout(FinalizeIteration,0);
            }
            setTimeout(FinalResults,0);


        });

        function SingleIteration(key,iter)
        {
            document.getElementById("progress").innerHTML=iter+"/"+genetic.orderIteration+" "+(parseInt(key)+1)+"/"+genetic.orderPopulationSize;

            for (const key2 in genetic.orderPopulation[key])
            {
                genetic.orderFitness(genetic.orderPopulation[key][key2]);
                genetic.startGenetic();
                genetic.setOrderNodeShortestPathData(genetic.orderPopulation[key][key2]);
            }
            genetic.orderNormaliseFitness(genetic.orderPopulation[key],genetic.orderPopulationSummary[key]);
            genetic.setPopulationNodeShortestPathData(genetic.orderPopulation[key],genetic.orderPopulationSummary[key],iter,key);
            //genetic.newOrderGeneration(genetic.orderPopulation[key],genetic.orderPopulationSummary[key]);

        }

        function FinalizeIteration ()
        {
            //console.log("result",genetic.orderPopulation,genetic.orderPopulationSummary,genetic.bestOrderVariationDistance);
            genetic.newOrderGeneration(genetic.orderPopulation,genetic.orderPopulationSummary);
            console.log("summary",genetic.orderPopulationSummary);

            console.log("new pop",genetic.orderPopulation);


            console.log("finish",genetic.bestOrderVariationDistance,genetic.bestCombination);
            //genetic.clearPopulationData();
        }

        function FinalResults ()
        {
            document.getElementById("loader").hidden = true;
            document.getElementById("progress").innerHTML=""
            console.timeEnd('start');

            showDivElements();
            console.log(genetic.bestCombination);

            genetic.getOrderFinalResult();
            resultToJSON();

        }

        function hideDivElements()
        {
            document.getElementById("loader").hidden = true;
            document.getElementById("show_results").hidden = true;
        }

        function showDivElements()
        {
            document.getElementById("show_results").hidden = false;
        }

        function resultToJSON()
        {
            let result = JSON.stringify(genetic.bestCombination);
            document.getElementById("results").value=result;
        }




    </script>


@endsection


