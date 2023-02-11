@extends('body.main_theme')

@section('main')

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/1.3.4/jspdf.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.6/jspdf.plugin.autotable.min.js"></script>


    <div class="container -fluid d-flex justify-content-center">

            <div class="row">

                            <div class="container mt-12" >All Products </div>



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
                                                <td id=btr{{$loop->index+1}}> <button type="button" class="btn btn-warning btn-sm"  > Show </button></td>

                                            </tr>
                                        @endforeach
                                    </tbody>
                                </table>

                            <div class="d-flex justify-content-center col-md-12">
                                {!! $products->links('pagination::bootstrap-4') !!}
                            </div>


                    <canvas id="myCanvas" width="400" height="50" style="border:1px solid #d3d3d3;"> </canvas>
            </div>
        </div>




    <div class="container-fluid d-flex justify-content-center" id="legend">

        <div  id="result" >All Products

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
                    for(let i=0;i<containers[key].length;i++)
                    randomColor = Math.floor(Math.random()*16777215).toString(16);
                    color[key] =  "#"+randomColor
                }


            let counter =0;

            for(const key in containers)
            {
                containers[key]["id"] = [];
                for(let i=0;i<containers[key].length;i++)
                {
                    counter++
                    containers[key]["id"][i] = counter;
                }

            }

                console.log("colors",containers)
                let detailed_path = JSON.parse(result[id]["detailed_path"])

                drawContainers(containers,color)
                console.log("cont",containers);
                for(let i=1;i<path.length;i++)
                {

                    let short_detailed_path;
                    if (detailed_path[i - 1].length > 20)
                        short_detailed_path = detailed_path[i - 1].slice(0, 20) + "...";
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
                                cell4.innerHTML = containers[order_id[j]]+"("+containers[order_id[j]].id+")";
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
                document.getElementById(key).addEventListener("click", function ()
                {
                    var doc = new jsPDF('p', 'pt', 'letter');


                    var pageHeight = 0;
                    pageHeight = doc.internal.pageSize.height;
                    specialElementHandlers = {
                        // element with id of "bypass" - jQuery style selector
                        '#bypassme': function(element, renderer) {
                            // true = "handled elsewhere, bypass text extraction"
                            return true
                        }
                    };
                    margins = {
                        top: 150,
                        bottom: 60,
                        left: 40,
                        right: 40,
                        width: 600
                    };



                    var y = 20;
                    doc.setLineWidth(4);
                    doc.text(200, y = y + 30, "LISTA KOMPLETACYJNA");
                    doc.autoTable({

                        didParseCell: function(data)
                        {
                            //console.log(data.row.cells)
                            if (data.row.index%2 === 1)
                            {
                              //  data.row.cells[0].styles.fillColor = [58,121,152]
                            }
                        },


                        html: '#table',
                        startY: 70,
                        theme: 'grid',
                        lineColor: 10,
                        font: 'helvetica',
                        columnStyles:
                        {
                            0: {
                                cellWidth: 20,
                            },
                            1: {
                                cellWidth: 60,
                            },
                            2: {
                                cellWidth: 40,
                            }
                        },
                        styles: {
                            minCellHeight: 10,
                            fontSize: 5,

                        },
                    })
                    doc.save('List.pdf');

            })

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
            let text_font = 0.3*portion
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
                    ctx.fillText(c, x, 30, portion);
                    ctx.closePath();
                    ctx.stroke();
                    x += portion
                }
            }


        }

    </script>


    <style>
        canvas{
            margin-right: auto;
            margin-left: auto;
            display: block;
        }

    </style>


@endsection



