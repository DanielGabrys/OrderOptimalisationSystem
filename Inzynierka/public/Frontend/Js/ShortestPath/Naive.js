class Naive extends Base
{
    /*
    constructor(base)
    {
        super();
        this.entry=base.entry;
        this.nodes = base.nodes;
        this.node_graph=base.node_graph;

        this.final_path = base.final_path;
        this.detailed_final_path = base.detailed_final_path;
        this.detailed_final_distances = base.detailed_final_path

        this.distance = base.distance;
        this.calc_percentage = base.calc_percentage;
    }
    */
    order = [];

    node_graph;
    factorial_nr;

    nextOrder()
    {

        let counter =1;
        let arr =[];
        for(let i=0;i<this.order.length;i++)
        {
            arr[i]=i;
        }

        this.factorial_nr=this.factorial(arr.length);

        while(true)
        {

            let index = arr[0];

            if (index === arr.length - 1) {
                console.log('finished');
                break;
            }

           // console.log(arr);


                this.percentage(counter);
                counter++;

               // console.log(counter, arr);

            if (arr[arr.length - 1] > index)
            {

                let temp_dist = this.calculateDistance(arr);

                if (temp_dist < this.distance) {
                    this.distance = temp_dist;
                    this.final_path = this.getNaivePath(arr);
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

    factorial(n)
    {
        //base case
        if(n === 0 || n === 1)
        {
            return 1;
            //recursive case
        }

        else
        {
            return n * this.factorial(n-1);
        }
    }

    percentage(n)
    {
        let per =(n/this.factorial_nr *100).toFixed(2);
        this.calc_percentage = per;

        console.log(n,this.factorial_nr,per);
    }

    naive()
    {
        let load_button = document.getElementById("load");
        load_button.addEventListener('click',function ()
            {
                naive.nodes = base.nodes;
                console.log(naive.nodes);
                naive.setNodeGraph(naive.nodes);
                naive.setDikstraGraph();
                naive.nextOrder();

            }
        );
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

}

naive = new Naive();


