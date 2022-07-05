
let global_size =700;
let size = 700
let x_global = 0;
let y_global =0;

let data=0;

function getData(products_positions)
{

   data=products_positions;
}

function editProductOnGridProductOnCell(position_id)
{
   // console.log(cell);
    const found = data.filter(e => e.pivot.position === position_id);

    //if(found.length>0)
    //console.log(found);

    let name='';
    let id='';
    let table='';
    let text2='';
    let counter =0;

    for (const key in found)
    {
        name = '<p>' + found[key]['name']+ '</p>';
        id= '<td>' + found[key]['id']+ '</td>';

        table += '<tr>' + name + id + '</tr>';
        text2 += '<h6>' + found[key]['name'] + '</h6>';

        counter ++;
    }

    /*
    let text = '<table class="table table table-success table-striped" id="actProducts">' +
        '<thead>' +
        ' <tr>' +
        ' <th scope="col">Product Name</th>' +
        ' <th scope="col">Product ID</th>' +
        ' </tr>' +
        '</thead>'+
        '<tbody>'+
        table+
        '</tbody> '+
        '</table>';

     */


    if(counter>0)
    {
        let hint = document.getElementById("b" + position_id);
        let tooltip = new bootstrap.Tooltip(hint,
            {
                title: text2,
                placement: "bottom",
                html: true,

            });
    }




}

function editProductsOnGrid(X,Y)
{
    x_global =parseInt(X);
    y_global =parseInt(Y);

    size = global_size/y_global;

    document.getElementById("reload").innerHTML ='';
    document.getElementById("reload").style.width=size*y_global+"px";
    document.getElementById("reload").style.height=size*x_global+"px";

};


function generateGridCells(x,y,arr,counter)
{
    let count =parseInt(counter)-1;
    let counter2  =parseInt(count/x);
    let counter3  =parseInt(count%x);


;    //console.log(counter2,counter3);
    if(arr[counter2][counter3]=="-1")
    {
          document.getElementById("b"+counter).innerHTML += '<div id=' + counter + ' class="selected_cell" >'+counter+'</div>';
    }
    else  if(arr[counter2][counter3]=="1")
    {
        document.getElementById("b"+counter).innerHTML += '<div id=' + counter + ' class="entry_cell" >'+counter+'</div>';
        document.getElementById("a"+counter).setAttribute('href',"#");
    }
    else
    {
        document.getElementById("b"+counter).innerHTML +='<div id=' + counter + ' class="unselected_cell" >'+counter+'</div>';
        document.getElementById("a"+counter).setAttribute('href',"#");
    }

    let cell = document.getElementById("b"+counter);
    cell.style.width=size +"px";
    cell.style.height=size +"px";

    let cell2 = document.getElementById(counter);
    cell2.style.width=size +"px";
    cell2.style.height=size +"px";


    let digits = (x*y).toString().length;
    if (digits<=1)
        digits=2;

    cell.style.fontSize = size/(digits)+"px"
    cell2.style.fontSize = size/(digits)+"px"

}

