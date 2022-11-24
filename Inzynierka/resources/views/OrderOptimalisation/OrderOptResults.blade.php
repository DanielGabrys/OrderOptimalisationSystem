@extends('body.main_theme')

@section('main')

    <div class="py-12">
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <div class="card">

                        @if(session('success'))

                            <div class="alert alert-success alert-dismissible fade show" role="alert">
                                <strong>{{session('success')}}</strong>
                                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                            </div>

                        @endif

                        <div class="container mt-12"> All Products </div>

                        <table class="table table-sm" id="result_table" >
                            <thead>


                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">ID</th>
                                <th scope="col">Orders</th>
                                <th scope="col">Distance</th>
                                <th scope="col">Path</th>

                                <th scope="col">Action</th>
                                <th scope="col"></th>

                            </tr>

                            </thead>
                            <tbody>
                                @foreach($products as $order)
                                    <tr>
                                        <th scope="row">{{$loop->index+1}}</th>
                                        <td >{{$order->id }}</td>
                                        <td >{{$order->orders}}</td>
                                        <td >{{$order->distance}}</td>
                                        <td >{{$order->path}}</td>

                                        <td id=btr{{$loop->index+1}}> <button type="button" class="btn btn-warning btn-sm" >Show Results</button></td>
                                    </tr>
                                @endforeach
                            </tbody>
                        </table>

                        <div class="d-flex justify-content-center col-md-12">
                            {!! $products->links('pagination::bootstrap-4') !!}
                        </div>

                    </div>
                </div>

            </div>

        </div>



    </div>

    <div class="container-fluid d-flex justify-content-center" id="legend">

        <table class="table table-sm" id="table" >
            <thead>

            <tr>
                <th scope="col">#</th>
                <th scope="col">PRODUCT_ID</th>
                <th scope="col">POSITION</th>
                <th scope="col">ORDER_ID</th>
                <th scope="col">DIST</th>
                <th scope="col">PATH</th>

            </tr>

            </thead>
            <tbody>

            </tbody>
        </table>

    </div>




<script>



        let obj = {!! $result !!};
        console.log(obj.data);



        addDetailsButtonListeners("result_table");
        //resultToTable(obj.data,1);

        function resultToTable(result,id)
        {

            let table = document.getElementById("table");
            table.innerHTML="";
            createTableLegend();


                let path = JSON.parse(result[id]["path"]);
                let position = JSON.parse(result[id]["products_id"]);
                console.log(position);
                let detailed_path = JSON.parse(result[id]["detailed_path"])

                for(let i=1;i<path.length;i++) {

                    let short_detailed_path;
                    if (detailed_path[i - 1].length > 20)
                        short_detailed_path = detailed_path[i - 1].slice(0, 20) + "...";
                    else
                        short_detailed_path = detailed_path[i - 1];

                    let dist = detailed_path[i - 1].length - 1;

                    for (const key in position[path[i]])
                    {
                        let rows = table.rows.length;

                        let row = table.insertRow(rows);


                        let cell0 = row.insertCell(0);
                        let cell1 = row.insertCell(1);
                        let cell2 = row.insertCell(2);
                        let cell3 = row.insertCell(3);
                        let cell4 = row.insertCell(4);
                        let cell5 = row.insertCell(5);


                        if (i === path.length - 1)
                        {
                            cell1.innerHTML = "END";
                        }
                        else
                        {
                                cell1.innerHTML =key;
                        }

                        cell0.innerHTML = rows;
                        cell2.innerHTML = path[i];


                        cell3.innerHTML = position[path[i]][key];


                        cell4.innerHTML = dist;
                        cell5.innerHTML = short_detailed_path;
                    }
                }


        }

        function addDetailsButtonListeners(table)
        {
            let rows = document.getElementById(table).rows.length-1;
           // let start_row = document.getElementById(table).rows[1].cells[1].innerHTML;
            console.log(rows)

            for(let i=1;i<=rows;i++)
            {
                let key ="btr"+i;
                document.getElementById(key).addEventListener("click", function () { resultToTable(obj.data,i-1)});
            }

        }

        function createTableLegend()
        {
            let table = document.getElementById("table");
            let row = table.insertRow(0);

            let cell0 = row.insertCell(0);
            let cell1 = row.insertCell(1);
            let cell2 = row.insertCell(2);
            let cell3 = row.insertCell(3);
            let cell4 = row.insertCell(4);
            let cell5 = row.insertCell(5);


            cell0.outerHTML = "<th>#</th>";
            cell1.outerHTML = "<th>PRODUCT_ID</th>";
            cell2.outerHTML = "<th>POSITION</th>";
            cell3.outerHTML = "<th>ORDER_ID</th>";
            cell4.outerHTML = "<th>DISTANCE</th>";
            cell5.outerHTML = "<th>PATH</th>";
        }

    </script>



@endsection



