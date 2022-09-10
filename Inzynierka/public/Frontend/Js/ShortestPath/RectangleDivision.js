class RectangleDivision extends Base {

    center_x;
    center_y;
    divider = 2;

    rectangles = {};
    result =[];
    checking_indexes =[];
    indexes_counter=0;

    constructor() {
        super();
        let x_devider = this.width / this.divider //pionowo
        let y_devider = this.height / this.divider //poziomo


        this.rectangles["one"] = {};
        this.rectangles["one"]["position"] = {};
        this.rectangles["two"] = {};
        this.rectangles["two"]["position"] = {};
        this.rectangles["three"] = {};
        this.rectangles["three"]["position"] = {};
        this.rectangles["four"] = {};
        this.rectangles["four"]["position"] = {};

    }

    divideGrid()
    {
        this.center_x = this.width / 2 + 1;
        this.center_y = -this.height / 2;

        this.calculatePoints("position",this.center_x,this.center_y);
        this.minimumNode();
        //console.log(this.rectangles);

        this.calculateNewCentralPoints();
       // console.log(this.rectangles);

        this.sort();
        //console.log(this.rectangles);

         this.result = this.result.concat(this.getFinalResult("one"));
         this.result = this.result.concat(this.getFinalResult("two"));
         this.result = this.result.concat(this.getFinalResult("three"));
         this.result = this.result.concat(this.getFinalResult("four"));

         this.final_path = this.result;
         let beggining = [this.entry];
         this.final_path= beggining.concat(this.final_path,beggining);
         this.swip();

        this.getDetailedNaivePath();
        this.create_result_table();

        console.log(this.rectangles);
        console.log(this.final_path);
        console.log(this.detailed_final_path);

    }

    calculatePoints(pos,center_x,center_y)
    {
        for (let i = 0; i < this.order.length; i++)
        {
            let position = this.calculatePositionXY(this.order[i]);
            let dist = this.calculatePointsDistance(this.order[i], center_x, center_y);
           // console.log(position["x"],position["y"],dist,this.center_x,this.center_y);


            switch (true) {
                case ( position["x"] <= center_x && position["y"] < center_y):
                {
                    this.rectangles["one"][pos][this.order[i]] = dist;
                }
                    break;

                case (position["x"] > center_x && position["y"] < center_y): {
                    this.rectangles["two"][pos][this.order[i]] = dist;
                }
                    break;


                case (position["x"] >= center_x && position["y"] >= center_y): {
                    this.rectangles["three"][pos][this.order[i]] = dist;
                }
                    break;

                case (position["x"] < center_x && position["y"] >= center_y): {
                    this.rectangles["four"][pos][this.order[i]] = dist;
                }
                    break;
            }
        }
    }

    calculateNewCentralPoints()
    {
        for (const key in this.rectangles)
        {
            let pos =this.calculatePositionXY(this.rectangles[key]["min"]);
            //this.rectangles[key]["center_x"]=pos["x"];
            //this.rectangles[key]["center_y"]=pos["y"];

            for (const key2 in this.rectangles[key]["position"])
            {
                let dist = this.calculatePointsDistance(key2,pos["x"],pos["y"]);
                this.rectangles[key]["position"][key2] = dist;
            }
        }
    }

    calculatePointsDistance(node, c_x, c_y) {

        let position = this.calculatePositionXY(node)

        let dist = Math.sqrt((c_x - position["x"]) * (c_x - position["x"]) + (c_y - position["y"]) * (c_y - position["y"])).toFixed(2);

        return dist;
    }

    calculatePositionXY(node)
    {
        let position = {}

        let x1 = Math.floor((node - 1) / this.width);
        let x2 = ((node - 1) % this.width);

        position["x"]= x2
        position["y"] = -(x1 + 1);

        return position;
    }

    RectangleStart()
    {
        let load_button = document.getElementById("load");
        load_button.addEventListener('click',function ()
            {
                rectangleDiv.nodes = base.nodes;
                console.log(rectangleDiv.nodes)
                rectangleDiv.setNodeGraph(rectangleDiv.nodes);
                rectangleDiv.divideGrid();


            }
        );
    }

    minimumNode()
    {
        for (const key in this.rectangles)
        {
            let minimum = Infinity;

            let index_of_min = 0;

            for (const key2 in this.rectangles[key]["position"])
            {

                    let element = parseInt(this.rectangles[key]["position"][key2]);
                    if (element < minimum)
                    {
                        minimum = this.rectangles[key]["position"][key2];
                        index_of_min = key2;
                    }
            }
            this.rectangles[key]["min"] = index_of_min;
            this.rectangles[key]["min_value"] = minimum;
            this.rectangles[key][index_of_min] = minimum;
        }


    }

    sort()
    {
        for (const key in this.rectangles)
        {
            let area = {};
            let sortable = [];
            for (const node in this.rectangles[key]["position"])
            {
                sortable.push([node, this.rectangles[key]["position"][node]]);
            }

            sortable.sort(function(a, b)
            {
                return a[1] - b[1];
            });

            //console.log(sortable);
            let objSorted = {};

            this.rectangles[key]["position"] = {};

            for(let i=0;i<sortable.length;i++)
            {
                this.rectangles[key]["position"][i] = sortable[i][0];

            }

          //  console.log(this.rectangles[key])



        }

       // console.log(this.rectangles);
       // console.log(this.result);
    }

    getFinalResult(field)
    {
        let arr=[];
        for (const key in this.rectangles)
        {
            if(key===field)
            {

                let found=this.rectangles[key]["position"];

                if(Object.keys(found).length !== 0)
                {
                    this.checking_indexes.push(this.indexes_counter);
                }

                for (const key2 in found)
                {
                        arr.push(found[key2]);
                        this.indexes_counter++;

                }

                if(key==="three" || key==="one")
                {
                    arr.reverse();
                }

            }
        }

        return arr;
    }

    swip()
    {
        //console.log(this.checking_indexes,this.final_path);

        let temp_path = this.final_path;
        let distance = this.distance;

        for(let i=0;i<this.checking_indexes.length;i++)
        {
           // console.log(this.final_path);

            let min=this.dijkstra(this.graph,this.final_path[this.checking_indexes[i]],this.final_path[this.checking_indexes[i]+1]);
            let min2=this.dijkstra(this.graph,this.final_path[this.checking_indexes[i]],this.final_path[this.checking_indexes[i]+2]);

                //console.log(this.steps,min,this.final_path[this.checking_indexes[i]],this.final_path[this.checking_indexes[i]+j]);
                if(min2<min)
                {
                    let temp = this.final_path[this.checking_indexes[i]+1];
                    this.final_path[this.checking_indexes[i]+1] = this.final_path[this.checking_indexes[i]+2]
                    this.final_path[this.checking_indexes[i]+2] = temp;

                    console.log(this.steps,min,min2, this.final_path);
                    distance = this.distance;

                    min= this.steps;
                }



        }


    }

}

rectangleDiv = new RectangleDivision();
