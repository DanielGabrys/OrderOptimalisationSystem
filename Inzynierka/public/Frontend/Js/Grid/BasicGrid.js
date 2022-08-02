class BasicGrid
{
    width=0; // rows
    height=0; //columns
    size=0; // px

    shelfs={};

    setSize(height,width,size)
    {
        this.height = height;
        this.width = width;
        this.size = size / this.width;

        let reload =document.getElementById("reload");
        reload.innerHTML='';
        reload.style.width=this.size*width+"px";
        reload.style.height=this.size*height+"px";
    }

    generateGridCells(x,y,counter)
    {
    let counter0  =parseInt(counter)-1;

    let counter2  =parseInt(counter0/y);
    let counter3  =parseInt(counter0%y);

    //console.log(x,y,counter,counter2,counter3,this.shelfs[counter2][counter3]);

    if(this.shelfs[counter2][counter3]=="-1")
    {
        document.getElementById("b"+counter).innerHTML += '<div id=' + counter + ' class="selected_cell" >'+counter+'</div>';
    }
    else  if(this.shelfs[counter2][counter3]=="1")
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
    cell.style.width=this.size +"px";
    cell.style.height=this.size +"px";

    let cell2 = document.getElementById(counter);
    cell2.style.width=this.size +"px";
    cell2.style.height=this.size +"px";


    let digits = (this.height*this.width).toString().length;
    if (digits<=1)
        digits=2;

    cell.style.fontSize = this.size/(digits)+"px"
    cell2.style.fontSize = this.size/(digits)+"px"


}

}
