class RectangleDivision extends Naive {

    center_x;
    center_y;
    divider = 2;

    rectangles = {};
    result =[];
    checking_indexes =[];
    indexes_counter=0;

    path_matrix;
    detailedPathMatrix;
    detailedKeyPathArray;

    final_final_path=[];


    constructor()
    {
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
        //this.calculateNewCentralPoints();

        this.detailedKeyPathArray = this.createDetailedMatrix();
        this.getSelectedPathMatrix();
        this.calculateDistanceFromRegionCenter();
        //console.log(this.rectangles);

        this.sort();
        //console.log(this.rectangles);

         let result = new Array(4);

            result[0] = this.result.concat(this.getFinalResult("one"));
            result[1] = this.result.concat(this.getFinalResult("two"));
            result[2] = this.result.concat(this.getFinalResult("three"));
            result[3] = this.result.concat(this.getFinalResult("four"));

         console.log(result);

         let endings =[];

         for(let i=0;i<4;i++)
         {
             this.final_path = result[i];


             let entry = [this.entry];
             let beggining = 0;
             let end = 0;


             if(result[i].length===0)
             {
                 continue;
             }
             else if(this.final_final_path.length===0)
             {
                 this.final_path.unshift(this.entry);
             }
             else
             {
                 if(result[i - 1][result[i - 1].length-1])
                     this.final_path.unshift(result[i - 1][result[i - 1].length - 1]);
             }

             if (i === 3)
             {
                 this.final_path = this.final_path.concat(entry);
             }
             else
             {
                 if(result[i + 1][0])
                    this.final_path = this.final_path.concat(result[i + 1][0]);
             }


             // this.final_path = beggining.concat(this.final_path, beggining);
             //console.log(this.final_path);
             //this.swip();


             let max_size = 8;
             let size = 0;
             if (result[i].length > max_size)
             {
                 size = max_size;
             }
             else
             {
                 size = result[i].length;
             }

             if(size<=2)
             {
                 this.final_path
             }

             console.log("test ",this.final_path);
             for (let j = 1; j < this.final_path.length - size +1; j++)
             {
                 let size2=size;
                 if(i===3)
                 {
                     size2--;
                 }
                 console.log(j,size2);
                 this.nextOrder(j, size2); //works for size2>2
                 //console.log("j ",j,this.final_path.length - size);

             }




             if(i!==0)
             {
                 endings.push(this.final_final_path.length - 2);

                 if(endings.length>0 && endings[endings.length-1]-endings[endings.length-2]<4)
                 {
                    // console.log("elo");
                     endings.splice(-1);
                 }
             }


             this.final_final_path= this.final_final_path.concat(this.final_path);


             console.log("result", this.final_final_path);



         }
        this.final_path=this.cutFinalPath(endings);
        if(this.final_path[this.final_path.length-1]!==this.entry)
         {
             this.final_path.push(this.entry);
         }


        this.getFinalDistance();
        this.getDetailedNaivePath();
        this.create_result_table();


        console.log("final",this.final_path);
        console.log(endings);



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
                    let name = this.rectangles[key]["min"] + "->" + key2
                    this.rectangles[key]["position"][key2] = this.path_matrix[name];
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

    getPathMatrix(path)
    {
        this.path_matrix=path;
        console.log(this.path_matrix);
    }

    getSelectedPathMatrix()
    {
        for (let i=0; i<this.detailedKeyPathArray.length;i++)
        {

        }

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

    nextOrder(start,size)
    {

        let counter =1;
        let arr =[];
        let point_array =[];

        for(let i=0;i<size;i++)
        {
            arr[i]=i;
        }

        for(let i=0;i<size;i++)
        {
            point_array[i]=this.final_path[start+i];
        }

        let part_path=[];
        this.distance=Infinity;

        while(true)
        {


            let index = arr[0];
            //console.log(index,arr.length);
            if (index === arr.length - 1 || arr.length<2)
            {
                console.log('finished');
                break;
            }

             console.log(arr);


            //this.percentage(counter);
            counter++;


            //console.log(counter, arr);

             {
                     //let temp_dist = this.calculateDistance(arr);
                     let temp_dist = this.calculateDistanceFromFile(start, arr, point_array);
                     //console.log("distance", temp_dist, this.distance, );

                     if (temp_dist < this.distance)
                     {
                         //console.log("distance", temp_dist, this.distance, arr);
                         this.distance = temp_dist;
                         part_path = this.getNaivePath(start, arr, point_array);
                     }
            }
            //console.log(arr,temp_dist,this.distance,this.final_path);

            // STEP 1 of the algorithm
            let largestI = -1;
            for (let i = 0; i < arr.length - 1; i++)
            {
                if (arr[i] < arr[i + 1]) {
                    largestI = i;
                }
            }

            // STEP 2
            let largestJ = -1;
            for (let j = 0; j < arr.length; j++)
            {
                if (arr[largestI] < arr[j]) {
                    largestJ = j;
                }
            }

            // STEP 3

            this.swap(arr, largestI, largestJ);


            // STEP 4: reverse from largestI + 1 to the end

            let endArray = arr.splice(largestI + 1);
            endArray.reverse();
            arr = arr.concat(endArray);


        }

        //this.getDetailedNaivePath();
        //this.create_result_table();

        console.log(part_path,this.final_path);

    }

    calculateDistanceFromFile(start_point,arr,point_arr)
    {

        let start = this.final_path[start_point-1] + "->" +  point_arr[arr[0]];
        let tepm_dist = this.path_matrix[start];


        if(this.final_path.length - start_point - arr.length===0)
        {
            let end = point_arr[arr[arr.length-1]] + "->" +  this.final_path[this.final_final_path.length-1];
            tepm_dist += this.path_matrix[end];
        }
       // console.log("tm",start,tepm_dist,this.final_path,start_point);

        for(let i=0;i<arr.length-1;i++)
        {

            let name = point_arr[arr[i]] + "->" + point_arr[arr[i+1]];

            tepm_dist+= this.path_matrix[name];

        }

       // console.log(tepm_dist,arr,point_arr,start_name);
        return tepm_dist;
    }

    getNaivePath(start,arr,point_array)
    {
        let path = [];

        for(let i=0;i<arr.length;i++)
        {

            path[i]=point_array[arr[i]];
        }

        for(let i=start;i<start+arr.length;i++)
        {
            this.final_path[i] = path[i-start];
        }

        //console.log("start",start,"path: ",path,"final",this.final_path);
       return path;

    }

    getFinalDistance()
    {
        for(let i=0;i<this.final_path.length-1;i++)
        {

            let name = this.final_path[i] + "->" +  this.final_path[i+1];
            this.distance+= this.path_matrix[name];
        }

    }

    loadExample(products)
    {
        let dictstring = JSON.stringify(document.getElementById("nodes").value);

        dictstring= dictstring.substring(1);
        dictstring= dictstring.substring(0,dictstring.length-1);
        let arr = dictstring.split(',');


        console.log(arr);

        for (let i=0;i<arr.length;i++)
        {

            this.colorize_selected(arr[i]);
            const found = products.filter(e => e.pivot.position == arr[i]);

            for (const key in found)
            {
                //console.log(arr[i], found);
                this.order.push(found[key]['pivot']['desired_position']);
            }

        }

        //console.log(this.order);
        this.divideGrid();

    }


    cutFinalPath(endings)
    {
        let path =[]
        let index=0;
        console.log(index,this.final_final_path.length);
        while(index <this.final_final_path.length)
        {

            console.log(index);
            if(endings.includes(index))
            {
                if(this.final_final_path[index]===this.final_final_path[index+2] && this.final_final_path[index+1]===this.final_final_path[index+3])
                {
                    index++;

                }
                else
                {
                   let search =index+4;
                   for(let i=index;i<index+3;i++)
                   {
                       let temp =-1;
                       for(let j=search;j<this.final_final_path.length;j++)
                       {

                           //console.log(this.final_path[j],this.final_path[i],i);
                           if(this.final_final_path[j] === this.final_final_path[i])
                           {
                               temp = i;
                               let sum = temp-index;
                               console.log("temp ",temp,index,sum);

                               if(sum>1)
                               {

                                   path.push(this.final_final_path[index]);
                                   path.push(this.final_final_path[index+1]);
                                   index++
                               }
                               else
                               {
                                   index++;
                               }
                               break;
                           }

                       }
                   }
                }
            }
            else
            {
               path.push(this.final_final_path[index]);
            }

            index++;

        }
        return path;
    }

}

rectangleDiv = new RectangleDivision();
