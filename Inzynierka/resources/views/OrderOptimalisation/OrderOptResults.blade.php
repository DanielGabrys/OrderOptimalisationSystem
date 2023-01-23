@extends('body.main_theme')

@section('main')




        <div class="container -fluid d-flex justify-content-center">

            <div class="row">


                <div class="col-sm">
                    <div class="col-md-8">


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

                <div class="col justify-content-center" >

                    <canvas id="myCanvas" width="600" height="80" style="border:1px solid #d3d3d3;"> </canvas>

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
                <th scope="col">CONTAINER</th>
                <th scope="col">AMOUNT</th>
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
        let orders ={!! $orders !!};
        console.log(obj.data);
        console.log(orders)



        addDetailsButtonListeners("result_table");
        //resultToTable(obj.data,1);

        function resultToTable(result,id)
        {

            let table = document.getElementById("table");
            table.innerHTML="";
            createTableLegend();



                let path = JSON.parse(result[id]["path"]);
                let position = JSON.parse(result[id]["products_id"]);
                let containers = JSON.parse(result[id]["containers"]);

                let color ={}
                for(const key in containers)
                {
                    randomColor = Math.floor(Math.random()*16777215).toString(16);
                    color[key] =  "#"+randomColor
                }
                //console.log("colors",color)
                let detailed_path = JSON.parse(result[id]["detailed_path"])

                drawContainers(containers,color)
                //console.log("cont",containers);
                for(let i=1;i<path.length;i++)
                {

                    let short_detailed_path;
                    if (detailed_path[i - 1].length > 20)
                        short_detailed_path = detailed_path[i - 1].slice(0, 15) + "...";
                    else
                        short_detailed_path = detailed_path[i - 1];

                    let dist = detailed_path[i - 1].length - 1;

                    //console.log(position)
                    for (const key in position[path[i]])
                    {
                        let order_id = position[path[i]][key]
                        for(let j=0;j<order_id.length;j++)
                        {

                            let found = orders.filter(e => e.id == order_id[j]);
                            found = found[0]["products"];
                            let amount = found.filter(e => e.id == key);
                            amount = amount[0]["pivot"]["amount"]

                            //console.log(found,amount);

                            let rows = table.rows.length;
                            let row = table.insertRow(rows);

                            let cell0 = row.insertCell(0);
                            let cell1 = row.insertCell(1);
                            let cell2 = row.insertCell(2);
                            let cell3 = row.insertCell(3);
                            let cell4 = row.insertCell(4);
                            let cell5 = row.insertCell(5);
                            let cell6 = row.insertCell(6);
                            let cell7 = row.insertCell(7);


                            if (i === path.length - 1) {
                                cell1.innerHTML = "END";
                            } else {
                                cell1.innerHTML = key;
                            }

                            cell0.innerHTML = rows;
                            cell2.innerHTML = path[i];

                            cell3.innerHTML = order_id[j];

                            if(containers.hasOwnProperty([order_id[j]]))
                            {

                                row.style.background= color[order_id[j]]
                                cell4.innerHTML = containers[order_id[j]]+"";
                            }

                            cell5.innerHTML = amount;

                            if(j===0)
                            {
                                cell6.innerHTML = dist;
                                cell7.innerHTML = short_detailed_path;
                            }
                        }
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
            let cell6 = row.insertCell(6);
            let cell7 = row.insertCell(7);


            cell0.outerHTML = "<th>#</th>";
            cell1.outerHTML = "<th>PRODUCT_ID</th>";
            cell2.outerHTML = "<th>POSITION</th>";
            cell3.outerHTML = "<th>ORDER_ID</th>";
            cell4.outerHTML = "<th>CONTAINER</th>";
            cell5.outerHTML = "<th>AMOUNT</th>";
            cell6.outerHTML = "<th>DISTANCE</th>";
            cell7.outerHTML = "<th>PATH</th>";
        }

    </script>


    <script>

        var c = document.getElementById("myCanvas");
        var ctx = c.getContext("2d");






        function drawContainers(cont,colors)
        {
            ctx.clearRect(0, 0, c.width, c.height);
            //let count = Object.keys(colors).length
            let count=0;

            for(const key in cont)
            {
                for(let i=0;i<cont[key].length;i++)
                {
                    count++
                }
            }

            let portion = c.width/count
            console.log(cont)
            let x=0;
            let text_font = 0.3*portion <50 ? 0.3*portion: 30
            ctx.font = text_font+"px serif";
            ctx.color='black'

            for(const key in cont)
            {
                for(let i=0;i<cont[key].length;i++)
                {
                    let c = cont[key][i] ? cont[key][i] : "no such big container/s";
                    ctx.beginPath();
                    ctx.rect(x, 0, portion, portion);
                    ctx.fillStyle = colors[key];
                    ctx.fill()
                    ctx.fillStyle = "white";
                    ctx.fillText(c, x, 50, portion);
                    ctx.closePath();
                    ctx.stroke();
                    x += portion
                }
            }


        }


    </script>




@endsection



