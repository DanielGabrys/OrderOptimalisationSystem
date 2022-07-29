let fields = 0;

function detailedProductsOnGrid(X,Y,siz)
{
    x_global =parseInt(X);
    y_global =parseInt(Y);

    size = siz/y_global;

    document.getElementById("reload").innerHTML ='';
    document.getElementById("reload").style.width=size*y_global+"px";
    document.getElementById("reload").style.height=size*x_global+"px";
}

function initialize_fields(fields)
{
    this.fields = (fields);
    console.log(fields);
}

function changeFieldsColorToOrange(counter)
{
    for(let i=0; i<this.fields.length;i++)
    {
        if(counter===this.fields[i])
        {
            document.getElementById(counter).className="field_cell";
        }
    }

}
