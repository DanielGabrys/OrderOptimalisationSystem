let colorized_id="0";
let colorized_class_name="";

let global_size =700;
let size = 700
let x_global = 0;
let y_global =0;

let data=0;
let shelves={};

function getData(products_positions,products)
{

   data=products_positions;
   shelves=products;
}

function editProductOnGridProductOnCell(position_id)
{
   // console.log(cell);
    const found = data.filter(e => e.pivot.position === position_id);

    //if(found.length>0)
    //console.log(found);

    let name='';
    let text='';
    let counter =0;

    for (const key in found)
    {
        name = '<p>' + found[key]['name']+ '</p>';
        text += '<h6>' + found[key]['name'] + '</h6>';

        counter ++;
    }



    if(counter>0)
    {


        let hint = document.getElementById("b" + position_id);
        let tooltip = new bootstrap.Tooltip(hint,
            {
                title: text,
                placement: "bottom",
                html: true,

            });

       this.in_use=position_id;
    }




}

function editProductsOnGrid(X,Y)
{
    x_global =parseInt(X);
    y_global =parseInt(Y);

    size = global_size/y_global;

    let reload =document.getElementById("reload");

    reload.innerHTML='';
    reload.style.width=size*y_global+"px";
    reload.style.height=size*x_global+"px";


};


function generateGridCells(x,y,counter)
{
    let count =parseInt(counter)-1;
    let counter2  =parseInt(count/x);
    let counter3  =parseInt(count%x);


;    //console.log(counter2,counter3);
    if(shelves[counter2][counter3]=="-1")
    {
          document.getElementById("b"+counter).innerHTML += '<div id=' + counter + ' class="selected_cell" >'+counter+'</div>';
    }
    else  if(shelves[counter2][counter3]=="1")
    {
        document.getElementById("b"+counter).innerHTML += '<div id=' + counter + ' class="entry_cell" >'+counter+'</div>';
        document.getElementById("a"+counter).setAttribute('href',"#");
    }
    else
    {
        document.getElementById("b"+counter).innerHTML +='<div id=' + counter + ' class="unselected_cell" >'+counter+'</div>';
        document.getElementById("a"+counter).setAttribute('href',"#");
    }

    if(this.in_use===counter)
        document.getElementById(counter).className="product_cell";

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


function ColorizeSelectedCell(id)
{

   let counter=id;

    if(colorized_id!=="0") {
        document.getElementById(colorized_id).className = colorized_class_name;
    }

    colorized_class_name = document.getElementById(counter).className;
    colorized_id= counter;

    document.getElementById(counter).className="colorized_cell";

}

