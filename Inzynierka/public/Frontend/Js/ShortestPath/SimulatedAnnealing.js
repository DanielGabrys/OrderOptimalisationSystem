class SimulatedAnnealing extends ContainersOpt {
// initialization
    temperature = 200;
    T0=this.temperature
    COOLING_RATE = 0.97;
    ABSOLUTE_ZERO= 0;      // final temperature

    current = [];
    best_cost = Infinity;
    no_change =0
    restart_t=0.001
    epos =0
    current_epos =0;

    getDistanceAnn(pop)
    {
        let dist =0
        for(const key in pop)
        {
            dist+= pop[key].distance
        }

        return dist
    }

    init(cont,an)
    {

        for(const key in cont)
        {
            an[key]=cont[key]
        }

        this.best_cost= Infinity
        this.bestCombination = this.orderPopulation[0];
        this.current=this.orderPopulation[0];
        this.start_time=Date.now()
        return an;


       // console.log(this,this.best_cost)
    }

    newTempResults()
    {


        let multiple = this.getRandomGens(this.orderPopulation[0])
        this.doubleReplace(0, multiple)
        for (const key2 in this.orderPopulation[0])
        {
            this.orderFitness(this.orderPopulation[0][key2]);
            this.startSolve();
            this.setOrderNodeShortestPathData(this.orderPopulation[0][key2]);
           // this.orderContFitness(this.orderPopulation[0]);
            this.getPopNodeMaxDistances(this.orderPopulation[0]);
        }

        return JSON.parse(JSON.stringify(this.orderPopulation[0]))
    }




    SA()
    {


        let time = (Date.now()- this.start_time)/1000
        console.log(time)
        if(time>=this.time)
        {
            this.timestamps[this.time]=this.best_cost
            this.time+=60;
        }

        let base = JSON.parse(JSON.stringify(this.orderPopulation[0]))
        let next = this.newTempResults()

        let newPop = this.solveAnnealing(base, next)
        this.orderPopulation[0]=newPop
    }


    solveAnnealing(cur,next)
    {


        let current =JSON.parse(JSON.stringify(cur))
        let result = current
        let neighbor =JSON.parse(JSON.stringify(next))

        if(this.restart_t>this.temperature)
        {
          //  this.temperature=this.T0
            //this.orderPopulation[0]=JSON.parse(JSON.stringify(this.bestCombination))

        }


       // if(this.temperature>this.ABSOLUTE_ZERO)
        {
            let neighbor_cost = this.getDistanceAnn(neighbor)
            let current_cost = this.getDistanceAnn(current)


            let prob = this.acceptanceProbability(current_cost, neighbor_cost)
            console.log("neb",current_cost,neighbor_cost,this.best_cost,this.temperature,this.current_epos);
            if(Math.random() < prob)
            {
                this.current = JSON.parse(JSON.stringify(neighbor))
                current_cost = this.getDistanceAnn(neighbor)
                result = neighbor;

            }
           // console.log("sa",this.best_cost,current_cost,prob,this.temperature);
            if(neighbor_cost < this.best_cost)
            {

                this.bestCombination = JSON.parse(JSON.stringify(neighbor))
                this.best_cost = current_cost;
                result = neighbor;
                this.no_change=0
            }

                this.temperature *= this.COOLING_RATE;

        }

        return result

    }
    acceptanceProbability(current_cost, neighbor_cost)
    {
        if(neighbor_cost < current_cost)
        return 1;
        return Math.exp((current_cost - neighbor_cost)/this.temperature);
    }
}




