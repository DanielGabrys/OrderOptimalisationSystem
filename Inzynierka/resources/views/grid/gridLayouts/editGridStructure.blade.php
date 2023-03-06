<div id="reload">

    <script>

        editgridstructure = new EditStructureGrid()
        editgridstructure.setSize({{$grid->height}},{{$grid->width}},700);
        editgridstructure.getProductsData({!! $products_array !!},{{$grid->shelfs}});
        editgridstructure.editSelectedGrid({{$grid->shelfs}});

        document.getElementById('editGrid').addEventListener("click", function ()
        {
            editgridstructure.setGridValues()
        })

    </script>

</div>
