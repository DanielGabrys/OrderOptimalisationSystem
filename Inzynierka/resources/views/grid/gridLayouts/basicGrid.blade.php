
<div id="reload">

    <script>

        document.getElementById("reload").style.visibility="hidden"
        cont = new ContainersOpt()
        cont.setSize({{$grid->height}},{{$grid->width}},700);
        cont.getProductsData({!! $products_array ??"null"!!},{{$grid->shelfs}});
        cont.shelvesToGraph();

    </script>

    @foreach(range(1, $grid->height*$grid->width) as $y)

        @if($grid->id)
        <a id="{{"a".$y}}" href ="{{route('editGridCellProducts',[$grid->id,$y])}}" >
            <div id ="{{"b".$y}}" class="cell" >
                <script>

                    cont.generateGridCells({{$grid->height}},{{$grid->width}},{{$y}})
                    cont.getHints({{$y}})
                    cont.colorizeProductsOnGrid({{$y}})
                </script>
            </div>
        </a>

        @else
            <a id="{{"a".$y}}" >
                <div id ="{{"b".$y}}" class="cell" >
                    <script>
                        cont.generateGridCells({{$grid->height}},{{$grid->width}},{{$y}})
                    </script>
                </div>
            </a>
        @endif

    @endforeach

</div>


<script>
    document.getElementById("reload").style.visibility="visible"
</script>
