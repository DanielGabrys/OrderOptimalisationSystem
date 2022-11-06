@extends('body.main_theme')

@section('main')

    <table class="table table-striped" id="result_table" name="result_table">
        <thead>
        <tr>
            <th scope="col">#</th>
            <th scope="col">Orders</th>
            <th scope="col">Distance</th>
            <th scope="col">Capability</th>
            <th scope="col">Details</th>
        </tr>
        </thead>

        <tbody>
        </tbody>
    </table>



    <script>

        let result = {!! $orderOptResults !!};
        resultToTable(result);
        console.log(result);

        addDetailsButtonListeners("result_table");

        function resultToTable(result)
        {
            let table = document.getElementById("result_table");
            for(const key in result)
            {

                if(key ==="dist")
                    break;

                let rows = table.rows.length;

                let row = table.insertRow(rows);

                let cell0 = row.insertCell(0);
                let cell1 = row.insertCell(1);
                let cell2 = row.insertCell(2);
                let cell3 = row.insertCell(3);
                let cell4 = row.insertCell(4);

                cell0.innerHTML = rows ;
                cell1.innerHTML = result[key]["order"];
                cell2.innerHTML = result[key]["distance"];
                cell4.innerHTML = '<button type="DETAILS" id="btr' + key + '" class="btn btn-primary mb-2" >DETAILS</button>';

            };
        }

        function addDetailsButtonListeners(table)
        {
            let rows = document.getElementById(table).rows.length-1;

            for(let i=0;i<rows;i++)
            {
                let key ="btr"+i;
                document.getElementById(key).addEventListener("click", function () { showOrderDetails(key);});
            }

        }

        function showOrderDetails(key)
        {
            console.log(key);
        }

    </script>

@endsection



