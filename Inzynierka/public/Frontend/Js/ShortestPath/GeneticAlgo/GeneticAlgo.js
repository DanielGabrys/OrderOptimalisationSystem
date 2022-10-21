
class GeneticAlgo extends Base
{
    populationSize=1000;
    population =[];
    fitness =[];
    bestDistance = Infinity;
    bestPath =[];

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
        for(let i=0;i<this.populationSize;i++)
        {
            this.population[i] = this.shuffle(this.population[i]);
        }

        console.log(this.population);



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

        let start = this.entry + "->" + this.order[arr[0]];
        let end= this.order[arr[arr.length-1]] + "->"+ this.entry;

        let dist = this.path_matrix[start] + this.path_matrix[end];

        for(let i=0;i<arr.length-1;i++)
        {

            if(this.order[arr[i]] !== this.order[arr[i+1]])
            {
                let name = this.order[arr[i]] + "->" + this.order[arr[i + 1]];
                dist += this.path_matrix[name];
            }

            //console.log(name,this.path_matrix[name]);

        }
        return dist;
    }

    startGenetic()
    {
        this.createPopulation();
        this.loadPopulation();

        for(let i=0;i<1000;i++)
        {
            this.calcFitness();
            this.normalizeFitness();
            this.nextGeneration();


            console.log("final", this.bestPath, this.bestDistance);
            console.log(i,this.population);
        }

        this.showFinalPath();
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
            let order2 = this.pickOne(this.population,this.fitness);
            //let order = crossOver(order1,order2);
            order1 = this.mutate(order1);

            newPopulation[i] = order1;
        }

        this.population=newPopulation;

    }

    pickOne(list,prob)
    {
        let index =0;
        let r = Math.random(1);
        //console.log("r",r);

        while(r>0)
        {
            r = r -prob[index];
            index++;
        }

        index --;
        return list[index].slice();

    }

    mutate(order)
    {
        let indexA=Math.floor(Math.random() * order.length);
        let indexB=Math.floor(Math.random() * order.length);

        let temp =order[indexA];
        order[indexA]=order[indexB];
        order[indexB]=temp;

        //console.log("o",order,indexB,indexA)
        return order
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

    loadPopulation()
    {
        ;
    }


}

