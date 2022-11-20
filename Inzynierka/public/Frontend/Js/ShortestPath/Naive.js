class Naive extends Base
{
    node_graph;

    nextOrder()
    {

        let counter =1;
        let arr =[];
        for(let i=0;i<this.order.length;i++)
        {
            arr[i]=i;
        }

        while(true)
        {

            let index = arr[0];

            if (index === arr.length - 1) {
                console.log('finished');
                break;
            }

           // console.log(arr);


                counter++;

               // console.log(counter, arr);

           // if (arr[arr.length - 1] > index)


                //let temp_dist = this.calculateDistance(arr);
                let temp_dist= this.calculateDistanceFromFile(arr);

                if (temp_dist < this.distance)
                {
                    this.distance = temp_dist;
                    this.final_path = this.getFinalPath(arr);
                    //console.log("elo",this.final_path);
                }

                console.log(arr,temp_dist,this.distance,this.final_path);

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

        this.getDetailedNaivePath();
        this.create_result_table();

        console.log(this.distance,this.final_path);

    }

    swap(a,i,j)
    {
        let temp =a[i];
        a[i]=a[j];
        a[j]=temp;
    }

    naive()
    {
        let load_button = document.getElementById("load");
        load_button.addEventListener('click',function ()
            {
                naive.nodes = base.nodes;
                console.log(naive.nodes);
                naive.setNodeGraph(naive.nodes);
               // naive.setDikstraGraph();
                naive.nextOrder();

            }
        );
    }

    naive2()
    {
                naive.nextOrder();
    }

    setOrderInArray(map)
    {
        let array=[];

        let counter =0;
        map.forEach (function(value)
        {
            array[counter]=value
            counter++;
        })

        this.order=array;
    }

    calculateDistanceFromFile(arr)
    {
            let start_name = this.entry + "->" + this.order[arr[0]];
            let end_name =   this.order[arr[arr.length-1]] + "->" +  this.entry ;

            let reverse_start_name = this.order[arr[0]]+ "->"+ this.entry;
            let reverse_end_name =   this.entry+"->" +this.order[arr[arr.length-1]] ;

            console.log(start_name,end_name)
            if(!(start_name in this.path_matrix))
            {
                start_name = reverse_start_name;

            }

             if(!(end_name in this.path_matrix))
             {
                 end_name = reverse_end_name;
             }
            console.log(start_name);


            let start = this.path_matrix[start_name];
            let end = this.path_matrix[end_name];

            let tepm_dist = start + end;

            for(let i=0;i<arr.length-1;i++)
            {

                let name = this.order[arr[i]] + "->" + this.order[arr[i+1]];
                let reverse_name = this.order[arr[i+1]] + "->" + this.order[arr[i]];

                if(!(this.path_matrix.hasOwnProperty(name)))
                    name=reverse_name;

                tepm_dist+= this.path_matrix[name];

            }

            console.log(tepm_dist,arr);
            return tepm_dist;
    }

    getPathMatrix(path)
    {
        this.path_matrix=path;
    }

}



