function editProductOnGridProductOnCell(cell,position_id)
{
   // console.log(cell);

    const found = cell.filter(e => e.pivot.position === position_id);

    //if(found.length>0)
    //console.log(found[0]['pivot']['position']);

    let table='';

    for (const key in found)
    {

        let name= '<td>' + found[key]['name']+ '</td>';
        let id= '<td>' + found[key]['id']+ '</td>';
        let position = '<td>' + found[key]['pivot']['position'] + '</td>';

        table += '<tr>' + name + id +position + '</tr>';

    }



    var text = '<table class="table table table-success table-striped" id="actProducts">' +
                    '<thead>' +
                        ' <tr>' +
                            ' <th scope="col">Product Name</th>' +
                            ' <th scope="col">Product ID</th>' +
                            ' <th scope="col">position</th>' +
                        ' </tr>' +
                    '</thead>'+
                    '<tbody>'+
                            table+
                    '</tbody> '+
                '</table>';

    return text;

}

function editProductsOnGrid(X,Y,elements)
{
    let x =parseInt(X);
    let y =parseInt(Y);


    var arr = elements;


    let size = 700/y;

    let digits = (x*y).toString().length;
    if (digits<=1)
        digits=2;

    document.getElementById("reload").innerHTML='';
    let counter = 1

    for (let rows = 0; rows < x; rows++)
    {
        for (let columns = 0; columns < y; columns++)
        {

            if(arr[rows][columns]=="-1")
            {
                document.getElementById("reload").innerHTML +=
                    '<a href ="#" data-toggle="modal" data-whatever=' + counter + ' data-target=".bd-example-modal-lg" > <div id=' + counter + ' class="unselected_cell" onclick="" >'+counter+'</div> </a>';

                document.getElementById(counter.toString()).style.background = "green";
            }
            else  if(arr[rows][columns]=="1")
            {
                document.getElementById("reload").innerHTML +=
                    '<div id=' + counter + ' class="unselected_cell" >'+counter+'</div>';
                document.getElementById(counter.toString()).style.background = "yellow";
            }
            else
            {
                document.getElementById("reload").innerHTML +=
                    '<div id=' + counter + ' class="unselected_cell" >'+counter+'</div>';
            }

            counter++;
        };

    };

    let block_size=document.getElementsByClassName("unselected_cell");  // Find the elements
    for(let i = 0; i < block_size.length; i++)
    {
        block_size[i].style.width=size +"px";    // Change the content
        block_size[i].style.height=size +"px";

        let b_size= size;

        block_size[i].style.fontSize = b_size/(digits)+"px";
        //console.log(b_size);
    }
    document.getElementById("reload").style.width=size*y+"px";
    document.getElementById("reload").style.height=size*x+"px";



};
