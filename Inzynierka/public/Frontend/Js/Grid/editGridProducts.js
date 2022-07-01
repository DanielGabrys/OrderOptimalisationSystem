
let global_size =700;
let size = 700
let x_global = 0;
let y_global =0;

function editProductOnGridProductOnCell(cell,position_id)
{
   // console.log(cell);
    const found = cell.filter(e => e.pivot.position === position_id);

    //if(found.length>0)
    //console.log(found);

    let name='';

    for (const key in found)
    {
        name+= '<p>' + found[key]['name']+ '</p>';
    }

    let hint = document.getElementById(position_id);

    hint.setAttribute('title',name);

    var tooltip = new bootstrap.Tooltip(hint, {
        title : name
    });



}

function editProductsOnGrid(X,Y,elements)
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
          document.getElementById("b"+counter).innerHTML += '<div id=' + counter + ' class="selected_cell" data-bs-toggle="tooltip" data-bs-placement="top" data-bs-html="true"  title="Tooltip on top" >'+counter+'</div>';
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

