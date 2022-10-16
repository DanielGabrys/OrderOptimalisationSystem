class CreateGridCreateDikstraGraph extends DikstraGrid
{
    nodes;
    graph = [];

    constructor(createGrid)
    {
        super();

        this.nodes =createGrid.shelfs;
        this.height = createGrid.height;
        this.width = createGrid.width;
    }

    start()
    {

    }
}
