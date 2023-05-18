@extends('grid.gridLayouts.spinner')

@section('spinner')

    @include('grid.gridLayouts.basicGrid')

    <div class="container-fluid mt-2 d-flex justify-content-center">

        <form class="form-inline">

            <button type="button" id="load_database" class="btn btn-success btn" >OPTYMALIZUJ</button>

            <div class="input-group">
                <div class="input-group-prepend">
                    <div class="input-group-text">CZAS KALKULACJI [s]</div>
                </div>
                <input type="number" class="form-control" id="max_time" name="max_time" value=60 style="width: 80px;">
                <button type="button" id="stop" name="stop" class="btn bg-secondary " >Stop</button>
            </div>


        </form>
    </div>

    <div class="container-fluid d-flex justify-content-center" id="partial">
        <div class="form-check">
            <input class="form-check-input" type="checkbox" name="split" value="" id="split">
            <label class="form-check-label" for="flexCheckDefault">
                Rozdziel ponadwymiarowe zamówienia do kilku kontenerów
            </label>
        </div>
    </div>

    <div class="container-fluid d-flex justify-content-center">
    </div>

    <div class="container-fluid mt-6 d-flex justify-content-center">

        <table id="iteration_table" class="table table-striped table-dark">
            <thead class="thead-dark"><thead>
            <tr>
                <th scope="col">Dystans</th>
                <th scope="col">Czas</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td id="dist">-</td>
                <td id="time">-</td>
            </tr>
            </tbody>
        </table>
    </div>


    <div class="container-fluid mt-3 d-flex justify-content-center">


            <div class="input-group-prepend">
                <div id="listy" class="input-group-text"> NR LISTY</div>
            </div>
            <input type="number" class="form-control" id="path_etape" name="path_etape" value="0" style="width: 70px;">
            <a class="btn btn-primary " id="path_right" > RYSUJ ŚCIEŻKĘ </a>


        <form class="form-inline" action="{{route('orderOptResults')}}" target="_blank" method="POST">
            @csrf
            <input type="hidden" class="form-control" id="results" name="results"  value=15 style="width: 80px;">
            <button type="submit" id="show_results" class="btn btn-warning " >Listy kompletacyjne</button>
        </form>

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
                    <th scope="col" style="width: 80px;" >Ładowność</th>
                    <th scope="col" style="width: 80px;" >Liczba</th>
                    <th scope="col" style="width: 80px;" ></th>
                </tr>

                </thead>
                <tbody>

                <tr>
                    <th scope="row">1</th>
                    <td > <input type="number" class="form-control" id="capability1" name="capability1" style="width: 80px;" value=50></td>
                    <td > <input type="number" id="amount1" class="form-control" id="amount" name="amount" style="width: 80px;"  value=4></td>
                    <td> <button type="button" class="btn" id="delete1" >x</button> </td>
                </tr>


                </tbody>
            </table>
            <button type="button" id="add_container" class="btn btn-secondary btn-sm" >DODAJ KONTENER</button>
        </form>
    </div>


    <script>


        let obj = {!! $orders !!};
        let obj2 ={!! $order_sizes !!};
        let start;
        let containers =[];
        let distinct_containers =[];


        let time = 1
        let interval
        console.log(obj);
        console.log(obj2);

        let worker = new Worker('../../Frontend/Js/OrderOptimalisation/worker.js')


        hideDivElements();
        deleteContainerEvents()


        document.getElementById("load_database").addEventListener("click", function()
        {
            loadContainersData();
            setStartData();
            cont.loadDatabase(obj)
            solver2OPT()

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

        function setStartData()
        {
            cont.setPopulationData(1, 1);
            cont.getEntry({{$grid->entry}});
            cont.getPathMatrix({!! $path_matrix !!});
            cont.setGeneticData(1, 1);
            cont.orderList=cont.loadDatabase(obj)
        }


         function solver2OPT()
         {
             interval = setInterval(function () {document.getElementById("time").innerHTML = time.toString();time++ }, 1000);
             let max_time = document.getElementById("max_time").value;

             cont.setStartVariables(obj2, containers, distinct_containers,document.getElementById('split').checked);
             cont.createContainerPopulation(cont.orderPopulationSize);

             console.log(cont.orderPopulation)

             cont.randomOrderColor()
             cont.colorizeOrders();
             cont.createLegend();


             for (const key2 in cont.orderPopulation[0])
             {
                 cont.orderFitness(cont.orderPopulation[0][key2]);
                 cont.startSolve();
                 cont.setOrderNodeShortestPathData(cont.orderPopulation[0][key2]);

                 cont.orderContFitness(cont.orderPopulation[0]);
                 cont.getPopNodeMaxDistances(cont.orderPopulation[0]);
             }
            worker2opt(cont,max_time,interval)
         }

        function worker2opt(cont,max_time,interval)
        {
            let data
            worker.postMessage({
                batch: JSON.stringify(cont),
                max_time: max_time,
                end: false
            })

            worker.onmessage = function (en)
            {
                data = en.data.batch;
                let result = JSON.parse(en.data.batch)
                let ended = en.data.end
                console.log(result)
                document.getElementById("dist").innerHTML = result.dist.toString();
                cont.bestCombination = result
                showDivElements();

               if(ended)
               {
                worker.terminate()
                FinalResults(cont)
               }
            }

        }


       function FinalResults(solver)
       {
                showEndDivElements();

                clearInterval(interval)
                solver.getOrderFinalResultDetailedPath()
                solver.getProductsIdIntoResult();
                solver.getOrderFinalResult();
                resultToJSON(solver);
       }

       function hideDivElements()
       {
                document.getElementById("iteration_table").hidden = true;
                document.getElementById("show_results").hidden = true
                document.getElementById("listy").hidden = true;
                document.getElementById("path_right").hidden = true;
                document.getElementById("path_etape").hidden = true;
            }

       function showDivElements()
       {

                document.getElementById("time").hidden = false;
                document.getElementById("iteration_table").hidden = false;

            }

        function showEndDivElements()
        {
            document.getElementById("show_results").hidden = false;
            document.getElementById("path_right").hidden = false;
            document.getElementById("path_etape").hidden = false;
            document.getElementById("listy").hidden = false;
        }

        function resultToJSON(solver)
        {
                let result = JSON.stringify(solver.bestCombination);
                document.getElementById("results").value = result;
            }


        document.getElementById("path_right").addEventListener("click", function()
        {
            let id = document.getElementById("path_etape").value
            delete cont.bestCombination.dist
            let path = cont.bestCombination[id].detailed_path
            cont.colorizeSelectedOrders(id);
            cont.colorizeSinglePathNodes(path)
        });

        document.getElementById("stop").addEventListener("click", function()
        {
            FinalResults(cont)
            worker.terminate()
        });


    </script>


@endsection


