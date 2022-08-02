class ProductsGrid extends BasicGrid
{
    products_positions;

    colorized_id="0";
    colorized_class_name="";

    getProductsData(products_positions,shelfs)
    {
        this.products_positions=products_positions;
        this.shelfs=shelfs;
    }

    getHints(position_id)
    {
        // console.log(cell);
        const found = this.products_positions.filter(e => e.pivot.position === position_id);

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
        }

    }

    colorizeSelectedCell(id)
    {

        if(this.colorized_id!=="0")
            document.getElementById(this.colorized_id).className="product_cell";

        this.colorized_id= id;

        document.getElementById(id).className="colorized_cell";
    }

    colorizeProductsOnGrid(id)
    {
        const found = this.products_positions.filter(e => e.pivot.position === id);

        if(found.length>0)
        {
            document.getElementById(id).className="product_cell";

        }
    }
}

ProductGrid = new ProductsGrid();
