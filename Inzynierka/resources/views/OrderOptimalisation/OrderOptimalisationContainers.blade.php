@extends('body.main_theme')

@section('main')

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>


    <div id="reload">

        <script>
            cont.setSize({{$grid->height}},{{$grid->width}},700)
            cont.getProductsData({!! $products_array !!},{{$grid->shelfs}});
            cont.shelvesToGraph();
        </script>


        @foreach(range(1, $grid->height*$grid->width) as $y)

            <a id="{{"a".$y}}" >
                <div id ="{{"b".$y}}" class="cell" >
                    <script>
                        cont.generateGridCells({{$grid->height}},{{$grid->width}},{{$y}})
                        cont.getHints({{$y}})
                        cont.colorizeProductsOnGrid({{$y}})
                    </script>
                </div>
            </a>

        @endforeach
    </div>


    <div class="container-fluid mt-2 d-flex justify-content-center">

        <form class="form-inline">

            <button type="button" id="load_database" class="btn btn-success btn-sm" >FROM DATABASE</button>

        </form>


    </div>
    <div class="container-fluid d-flex justify-content-center">
        <form class="form-inline">

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">POPULATION</div>
                </div>
                <input type="number" class="form-control" id="population" name="population"  value=200 style="width: 80px;">
            </div>

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">ITERATION</div>
                </div>
                <input type="number" class="form-control" id="iteration" name="iteration" value=1 style="width: 80px;">
            </div>

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">MAX TIME</div>
                </div>
                <input type="number" class="form-control" id="max_time" name="max_time" value=60 style="width: 80px;">
            </div>



        </form>

    </div>

    <div class="container-fluid d-flex justify-content-center">
        <form class="form-inline">

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">BASE POPULATION</div>
                </div>
                <input type="number" class="form-control" id="Basepopulation" name="Basepopulation"  value=1 style="width: 80px;">
            </div>

            <div class="input-group mb-2 mr-sm-2">
                <div class="input-group-prepend">
                    <div class="input-group-text">BASE ITERATION</div>
                </div>
                <input type="number" class="form-control" id="Baseiteration" name="Baseiteration" value=1 style="width: 80px;">
            </div>




        </form>

    </div>

    <div class="container-fluid d-flex justify-content-center" id="partial">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="split" value="" id="split">
            <label class="form-check-label" for="flexCheckDefault">
                Allow split single order into multiple containers
            </label>
        </div>
    </div>

    <div class="container-fluid d-flex justify-content-center">
    </div>

    <div class="container-fluid d-flex justify-content-center" id="legend">
    </div>

    <div class="container-fluid mt-3 d-flex justify-content-center">
        <h3> <span class="badge bg-danger" id="time_label">Time:</span></h3>
        <h3> <span class="badge ml-1" id="time" name="time" style="color: #1a1e21"></span></h3>
        <h3> <span class="badge bg-success" id="dist_label">Dist:</span></h3>
        <h3> <span class="badge ml-1" id="dist" name="dist" style="color: #1a1e21"></span></h3>


            <input type="number" class="form-control" id="path_etape" name="path_etape" value="0" style="width: 70px;">
            <a class="btn btn-primary " id="path_right" > SHOW COMBINATION </a>


            <form class="form-inline" action="{{route('orderOptResults')}}" target="_blank" method="POST">
                @csrf
                <input type="hidden" class="form-control" id="results" name="results"  value=15 style="width: 80px;">

                <button type="submit" id="show_results" class="btn btn-warning " >Show Results</button>
            </form>




    </div>


    <div class="container-fluid mt-1 d-flex justify-content-center">
        <div class="loader" name="loader" id="loader"></div>
        <button type="button" id="stop" name="stop" class="btn bg-secondary " >Stop</button>
    </div>

    <div class="container-fluid mt-1 d-flex justify-content-center" name="progress" id="progress">
    </div>

    <div class="container-fluid  justify-content-center" id="finalCombination">
    </div>

    <div class="container-fluid mt-3 d-flex justify-content-center">
        <form class="form-inline">

           <!-- <td > <input type="number" id="max_cap" class="form-control" name="max_cap" style="width: 180px;" placeholder="max capability" value="40" ></td> -->
            <table class="table table-sm" id="order_containers" >
                <thead>


                <tr>
                    <th scope="col" style="width: 80px;" ># </th>
                    <th scope="col" style="width: 80px;" >Capability</th>
                    <th scope="col" style="width: 80px;" >Amount</th>
                    <th scope="col" style="width: 80px;" ></th>
                </tr>

                </thead>
                <tbody>

                @foreach($containers as $container)
                    <tr>
                        <th scope="row">{{$loop->index+1}}</th>
                        <td > <input type="number" class="form-control" id="capability{{$loop->iteration}}" name="capability{{$loop->iteration}}" style="width: 80px;" value={{$container->capability }}></td>
                        <td > <input type="number" id="amount{{$loop->iteration}}" class="form-control" id="amount" name="capability" style="width: 80px;"  value={{$container->amount }}></td>
                        <td> <button type="button" class="btn" id="delete{{$loop->iteration}}" >x</button> </td>
                    </tr>
                @endforeach
                </tbody>
            </table>
            <button type="button" id="add_container" class="btn btn-secondary btn-sm" >Add Comntainer</button>
        </form>
    </div>






    <script>

        let obj = {!! $orders !!};
        let obj2 ={!! $order_sizes !!};
        let start;
        let containers =[];
        let flag = true;
        let interval =null;
        let iteration =0;
        let max_iteration =0;


        let distinct_containers =[];

        console.log(obj);
        console.log(obj2);

        hideDivElements();
        deleteContainerEvents()


        document.getElementById("load_database").addEventListener("click", function()
        {
            loadContainersData();
            setStartData();
            cont.loadDatabase(obj)
            solverGA();
           // solverSA()

        });

        document.getElementById("add_container").addEventListener("click", function()
        {
            let table = document.getElementById("order_containers")

            let rows = table.rows.length;
            let row = table.insertRow(rows);
            let id= parseInt(table.rows[rows-1].cells[0].innerHTML) +1;
            if(!id) {id=1;}

            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);

            cell0.innerHTML = id;
            cell1.outerHTML = '<td > <input type="number" class="form-control" id="capability'+id+'" name="capability" style="width: 80px;" value=10></td>';
            cell2.outerHTML = '<td > <input type="number" class="form-control" id="amount'+id+'" name="capability" style="width: 80px;" value=1></td>';
            cell3.outerHTML = '<td> <button type="button" class="btn" id="delete'+id+'" >x</button> </td>';

            document.getElementById("delete"+id).addEventListener("click",function ()
            {
                table.deleteRow(id);
            })
        });

        function loadContainersData()
        {
            let table = document.getElementById("order_containers")
            let rows = table.rows.length;


            for(let i=1;i<rows;i++)
            {
                let capability = parseInt(document.getElementById("capability"+i).value);
                let amount = parseInt(document.getElementById("amount"+i).value);

                distinct_containers.push(capability);
                for(let j=0;j<amount;j++)
                {
                    containers.push(capability);
                }

            }
            containers.sort(compareNumbers);
            //console.log(containers,max_cap);

        }


        function compareNumbers(a, b) {
            return a - b;
        }

        function deleteContainerEvents()
        {
            let table =document.getElementById("order_containers");
            for (let i = 1; i < table.rows.length; i++)
            {
                document.getElementById("delete" + i).addEventListener("click", function () {
                    if(i>document.getElementById("order_containers").rows.length-1)
                        table.deleteRow(document.getElementById("order_containers").rows.length-1)
                    else
                        table.deleteRow(i);
                })
            }
        }

        function setStartData() {
            document.getElementById("loader").hidden = false;
            let population = document.getElementById("population").value;
            let iteration = document.getElementById("iteration").value;
            max_iteration = parseInt(iteration)

            let base_population = document.getElementById("Basepopulation").value;
            let base_iteration = document.getElementById("Baseiteration").value;

            cont.setPopulationData(base_population, base_iteration);
            cont.getEntry({{$grid->entry}});
            cont.getPathMatrix({!! $path_matrix !!});
            cont.setGeneticData(population, iteration);
            cont.orderList=cont.loadDatabase(obj)
        }

        function solverGA()
        {
                let max_time = document.getElementById("max_time").value;
                let max_cap =0// document.getElementById("max_cap").value

               // cont.createPopulation();
                cont.setStartVariables(obj2, containers, distinct_containers,document.getElementById('split').checked);
                cont.createContainerPopulation(cont.orderPopulationSize);

                cont.randomOrderColor()
                cont.colorizeOrders();
                cont.createLegend();

                start = window.performance.now();

                interval = setInterval(SingleIteration, 10, iteration, max_time);

            }

        function solverSA()
        {

            let max_time = document.getElementById("max_time").value;
            an = new SimulatedAnnealing();
            sa = an.init(cont)
            sa.setStartVariables(obj2, containers, distinct_containers,document.getElementById('split').checked);
            sa.createContainerPopulation(1);
            sa.newTempResults()
            console.log(sa.orderPopulation)


            sa.randomOrderColor()
            sa.colorizeOrders();
            sa.createLegend();
            start = window.performance.now();

            interval = setInterval(SAInterval, 10, iteration,max_time);


        }

        function SAInterval(iter,max_time)
        {

            document.getElementById("progress").innerHTML = iteration + "/" + cont.orderIteration ;
            document.getElementById("dist").innerHTML = cont.bestOrderVariationDistance.toString();
            let end = window.performance.now();
            let time = parseInt(end - start - max_time * 1000);

            an.SA()
            an.setPopulationNodeShortestPathData(cont.orderPopulation[0], cont.orderPopulationSummary[0], iter, 0);
            iteration++;
            if(max_iteration<=iteration || time >0)
            {
                clearInterval(interval)
                FinalResults(an);


            }


        }


       function SingleIteration(iter, max_time)
            {
                for (let key = 0; key < cont.orderPopulationSize; key++)
                {

                    document.getElementById("progress").innerHTML = iteration + "/" + cont.orderIteration ;
                    document.getElementById("dist").innerHTML = cont.bestOrderVariationDistance.toString();

                    let end = window.performance.now();
                    let time = parseInt(end - start - max_time * 1000);
                    if(max_iteration===iteration || time >0)
                    {
                        clearInterval(interval)
                        FinalResults(cont);
                        break;
                    }


                    for (const key2 in cont.orderPopulation[key])
                    {

                            cont.orderFitness(cont.orderPopulation[key][key2]);
                            cont.startGenetic();
                            cont.setOrderNodeShortestPathData(cont.orderPopulation[key][key2]);

                            cont.orderContFitness(cont.orderPopulation[key]);
                            cont.getPopNodeMaxDistances(cont.orderPopulation[key]);

                    }

                        cont.setPopulationNodeShortestPathData(cont.orderPopulation[key], cont.orderPopulationSummary[key], iter, key);
                        cont.nextContGeneration()


                }
                iteration++



;
            }

       function FinalResults(solver) {

                document.getElementById("loader").hidden = true;
                document.getElementById("progress").innerHTML = ""


                let end = window.performance.now();
                let time = end - start;

                document.getElementById("time").innerHTML = parseInt(time) / 1000;
                document.getElementById("time").innerHTML += "s";

                console.log(time);

                showDivElements();
               console.log(solver);
                solver.getProductsIdIntoResult();


                solver.getOrderFinalResult();
                resultToJSON(solver);

            }

            function hideDivElements() {
                document.getElementById("loader").hidden = true;
                document.getElementById("show_results").hidden = true;
                document.getElementById("time_label").hidden = true;
                document.getElementById("path_right").hidden = true;
                document.getElementById("path_etape").hidden = true;
            }

            function showDivElements() {
                document.getElementById("show_results").hidden = false;
                document.getElementById("time_label").hidden = false;
                document.getElementById("path_right").hidden = false;
                document.getElementById("path_etape").hidden = false;
            }

            function resultToJSON(solver) {
               console.log(solver.bestCombination)
                let result = JSON.stringify(solver.bestCombination);
                document.getElementById("results").value = result;
            }

        let right_path = document.getElementById("path_right");
        right_path.addEventListener("click", function()
        {
            //cont.colorizeSelectedOrders(document.getElementById("path_etape").value);
            an.colorizeSelectedOrders(document.getElementById("path_etape").value);
        });


        document.getElementById("stop").addEventListener("click", function()
        {
            flag=false;
            clearInterval(interval)
            FinalResults(an);
        });





    </script>


@endsection


