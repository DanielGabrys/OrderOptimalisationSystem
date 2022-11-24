class RectangleDivision extends Naive {

    center_x;
    center_y;
    RecDivider = 2;

    rectangles = {};
    result =[];
    checking_indexes =[];
    indexes_counter=0;

    detailedKeyPathArray;


    constructor()
    {
        super();
        let x_devider = this.width / this.RecDivider //pionowo
        let y_devider = this.height / this.RecDivider //poziomo

        this.resetRectangle();
    }

    resetRectangle()
    {
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
        console.log(this.rectangles);
        //this.calculateNewCentralPoints();

        this.detailedKeyPathArray = this.createDetailedMatrix();
        this.calculateDistanceFromRegionCenter();
        //console.log(this.rectangles);

        this.sort();
        //console.log(this.rectangles);

         let result = new Array(4);

            result[0] = [this.entry].concat(this.getFinalResult("one"));
            result[1] = this.result.concat(this.getFinalResult("two"));
            result[2] = this.result.concat(this.getFinalResult("three"));
            result[3] = this.result.concat(this.getFinalResult("four"));
            result[3].push(this.entry);

         console.log(result);

         for(let i=0;i<4;i++)
         {
            this.final_path=this.final_path.concat(result[i]);
         }

         this.getFinalDistance();
         console.log("best",this.distance);

    }

    createResults()
    {
        this.getRawFinalPath();
        this.getFinalDistance();
        this.getDetailedNaivePath();
        this.create_result_table();

        console.log("final",this.final_path);
        //this.finalPathToString(this.final_path);
        //this.finalPathByNodesToString(this.final_path)
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

    calculateDistanceFromRegionCenter()
    {
        for (const key in this.rectangles)
        {

            for (const key2 in this.rectangles[key]["position"]) {
                if (this.rectangles[key]["min"] === key2)
                {
                    this.rectangles[key]["position"][key2] = 0;
                }
                else
                {
                    //let name = this.rectangles[key]["min"] + "->" + key2
                    this.rectangles[key]["position"][key2] = this.getNodesDistance(this.rectangles[key]["min"],key2);

                }


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
                        arr.push(parseInt(found[key2]));
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

    getPathMatrix(path)
    {
        this.path_matrix=path;
       // console.log(this.path_matrix);
    }

    createDetailedMatrix()
    {
        let arr = [];
        for (let i=0; i<this.order.length;i++)
        {
            for (let j=0; j<this.order.length;j++)
            {

                if(i!==j)
                {
                    let key =this.order[i]+"->"+this.order[j];
                    arr.push(key);
                }

            }
        }

        return arr;

    }

    getFinalDistance()
    {
        let dist =0;
        for(let i=0;i<this.final_path.length-1;i++)
        {
          dist+= this.getNodesDistance(this.final_path[i],this.final_path[i+1]);
        }

        this.distance=dist;
    }



    calculateFullDistance(arr)
    {
        let dist=0;
        for(let i=0;i<arr.length-1;i++)
        {
            let name = arr[i] + "->" + arr[i+1];

            if(arr[i] !== arr[i+1])
                 dist+= this.getNodesDistance(arr[i],arr[i+1]);
            //console.log(name,this.path_matrix[name]);
        }
        return dist;
    }

    getRawFinalPath()
    {
        let temp=[];
        for(let i=0;i<this.final_path.length;i++)
        {
            temp[i]=this.final_path[i];
        }
        this.raw_final_path= temp.splice(1,temp.length-2);
    }
}

rectangleDiv = new RectangleDivision();
