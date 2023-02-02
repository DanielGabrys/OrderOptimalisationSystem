class GeneticAlgo extends FarthestNeighbor
{
    populationSize=5;
    population =[];
    fitness =[];
    bestDistance = Infinity;
    bestPath =[];
    iteration =1;
    currentIteration=0;

    setPopulationData(population,iteration)
    {

        this.populationSize=parseInt(population);
        this.iteration=parseInt(iteration);

        if(this.populationSize<=0) this.populationSize=1;
        if(this.iteration<=0) this.iteration=1;
    }

    createPopulation()
    {
        //create basic population
        for(let i=0;i<this.populationSize;i++)
        {
            this.population[i] = new Array(this.order.length);
            for(let j=0;j<this.order.length;j++)
            {
                this.population[i][j]=j
            }
        }

        //mixing basic population
        for(let i=1;i<this.populationSize;i++)
        {

           // this.population[i] = this.shuffle(this.population[i]);
            this.population[i] = this.population[0];
        }

        //console.log(this.population);

    }

    shuffle(array)
    {
    let currentIndex = array.length,  randomIndex;

    // While there remain elements to shuffle.
        while (currentIndex !== 0)
        {

            // Pick a remaining element.
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // And swap it with the current element.
            [array[currentIndex], array[randomIndex]] = [
                array[randomIndex], array[currentIndex]];
        }

       // console.log("swap",array);
    return array;
    }

    calcFitness()
    {

        for(let i=0;i<this.populationSize;i++)
        {

            let d = this.calculateDistance(this.population[i]);
            if (d < this.bestDistance)
            {
                this.bestDistance = d;
                this.bestPath = this.population[i];
            }
            this.fitness[i]= 1 / (d + 1);
           // console.log(this.population[i], "fitnes: ", this.fitness[i],d);
        }

    }

    calculateDistance(arr)
    {

        let dist = this.getNodesDistance(this.entry,this.order[arr[0]])
        dist += this.getNodesDistance(this.order[arr[arr.length-1]],this.entry)

        for(let i=0;i<arr.length-1;i++)
        {
            if(this.order[arr[i]] !== this.order[arr[i+1]])
            {
                dist += this.getNodesDistance(this.order[arr[i]],this.order[arr[i + 1]])
            }


        }
        return dist;
    }

    FI()
    {
        let farthest = new FarthestNeighbor()
        farthest.farthestInsertion(this.path_matrix,this.order,this.entry)
        this.final_path=farthest.final_path
    }

    NN()
    {
        let nearest = new Nearest()
        nearest.NearestNeightbour(this.path_matrix,this.order,this.entry)
        this.final_path=nearest.final_path
    }

    startGenetic()
    {

       this.FI();
      // this.NN();
      // this.divideGrid();

        this.doTwoOpt()




        //console.log("start")

       // console.log(this.order)




        this.rebaseOrder();
        this.createPopulation();
        this.bestPath = this.population[0];




        for(let i=0;i<this.iteration;i++)
        {
            this.calcFitness();
            this.normalizeFitness();
            this.nextGeneration();
            this.currentIteration++;
            //   console.log(i, this.bestDistance,this.bestPath);
           // console.log(i,this.population);
        }









        this.final_path = this.getFinalPath();
        this.getDetailedNaivePath();
        //this.create_result_table();
        //this.showFinalPath();
        //console.log(this.bestPath,this.bestDistance)
        //console.log(this.final_path,this.bestDistance);
        //console.log(this.detailed_final_path_array);
       // this.ColorizeAllFinalPath();

    }

    pathTracker()
    {
        document.getElementById("path_etape").hidden = false;
        document.getElementById("path_left").hidden = false;
        document.getElementById("path_right").hidden = false;
    }

    normalizeFitness()
    {
        let sum =0;
        for(let i=0;i<this.fitness.length;i++)
        {
            sum+=this.fitness[i];
        }

        for(let i=0;i<this.fitness.length;i++)
        {
            this.fitness[i] = this.fitness[i]/sum;
        }
        //console.log(this.population, "fitnes: ", this.fitness);
    }

    nextGeneration()
    {
        let newPopulation =[];
        for(let i=0;i<this.population.length;i++)
        {
            let order1 = this.pickOne(this.population,this.fitness);
            order1 = this.mutate(order1);

            newPopulation[i] = order1;
        }

        this.population=newPopulation;

    }

    pickOne(list,prob)
    {
        let index =0;
        let r = Math.random();
        //console.log("r",r);

        while(r>0)
        {
            r = r -prob[index];
            index++;
        }

        index --;
        return JSON.parse(JSON.stringify(list[index]))
    }

    mutate(order)
    {

        let rate =Math.random();
        let range = Math.floor(Math.random()*order.length/5);
        if(rate>0.4)
        {
            this.mutate_dist(order);
            return order;
        }
        if(rate>0.5)
        {
            this.mutate_dist_Random(order);
        }
        else
        {
            let arr = this.crossOver(order,range,1);
            return arr;
        }
        this.doTwoOpt();

    }

    mutate_dist(order)
    {
        let max=0;
        let distances =[];
        let dist_sum=0;
        for(let i=0;i<this.order.length-1;i++)
        {
            //let name = this.order[order[i]] + "->" + this.order[order[i + 1]];
            let dist = this.getNodesDistance(this.order[order[i]],this.order[order[i + 1]]);

            distances[i]=dist;
            dist_sum+=dist;
        }

        let normalize_arr=[]
        let index =0;
        for(let i=0;i<distances.length;i++)
        {
            for(let j=0;j<distances[i];j++)
            {
                normalize_arr[j+index]=distances[i]
            }
            index=normalize_arr.length;
        }

        let number = Math.floor(Math.random()*normalize_arr.length);

        let counter=0;
        let index2=0;
        for(let i=0;i<normalize_arr.length;i++)
        {

            if(normalize_arr[i]!==normalize_arr[i+1])
                counter++;
            if(normalize_arr[i] === normalize_arr[number])
            {
                index2 = counter;
                break;
            }
        }

        let indexA,indexB;


        if(index2<order.length-2)
        {
            indexA = index2 + 1;
            indexB = index2 + 2;
        }
        else
        {
            indexA = index2 ;
            indexB = index2 -1;
        }

        let temp =order[indexA];
        order[indexA]=order[indexB];
        order[indexB]=temp;
    }

    mutate_neighbors(order,chance)
    {

        let rate = (Math.random());
        if(rate>chance)
        {
            let index = Math.floor(Math.random() * order.length - 1);
            let temp = order[index];
            order[index] = order[index + 1];
            order[index + 1] = temp;
        }
    }

    mutate_dist_Random(order)
    {
       let i = Math.floor(Math.random()*order.length);
       let j = Math.floor(Math.random()*order.length);
       this.swap(order,i,j);
    }

    showFinalPath()
    {

        this.final_path.push(this.entry);

        for(let i=0;i<this.order.length;i++)
        {
            this.final_path[i+1]=this.order[this.bestPath[i]];
        }
        this.final_path.push(this.entry)

        console.log(this.final_path);
    }


    crossOver(orderA,range,chance)
    {
        let rate = (Math.random());

        if(chance>rate)
        {
            let start = Math.floor(Math.random()*orderA.length);
            //let end = Math.floor(Math.random() *(orderA.length - start)+start+1);
            let end = Math.floor(Math.random()*range) +start;
            if (end>orderA.length-1)
                end=orderA.length-1;

            let neworder = orderA.slice(start, end);
            let arr_start =orderA.slice(0,start);
            let arr_end =orderA.slice(end,orderA.length);

           // console.log("neworder",start,end,orderA,neworder,arr_start,arr_end);
            let shuffled =this.shuffle(neworder);
            //console.log("newo",neworder);

            let array = arr_start.concat(shuffled,arr_end);
            //console.log("end",array);

            return array;

        }

        return  orderA;

    }


    getFinalPath()
    {
        let arr=[this.entry];
        for (let i =0;i<this.bestPath.length;i++)
        {
            arr[i+1]=this.order[this.bestPath[i]];
        }
        arr.push(this.entry)

        //console.log("array",arr,this.bestPath);
        return arr;
    }

    rebaseOrder()
    {

        let order =[];
        for (let i=1;i<this.final_path.length-1;i++)
        {
            order.push(this.final_path[i]);
        }

        this.order =order;
    }

}

