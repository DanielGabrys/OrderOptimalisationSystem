class SimulatedAnnealing extends ContainersOpt {
// initialization
    temperature = 200;
    T0=this.temperature
    COOLING_RATE = 0.97;
    ABSOLUTE_ZERO= 0;      // final temperature

    current = [];
    best_cost = Infinity;
    no_change =0
    restart_t=0.01
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

        return an;


       // console.log(this,this.best_cost)
    }

    newTempResults()
    {


        let multiple = this.getRandomGens(this.orderPopulation[0])
        this.doubleReplace(0, 1)
        for (const key2 in this.orderPopulation[0])
        {
            this.orderFitness(this.orderPopulation[0][key2]);
            this.startGenetic();
            this.setOrderNodeShortestPathData(this.orderPopulation[0][key2]);
           // this.orderContFitness(this.orderPopulation[0]);
            this.getPopNodeMaxDistances(this.orderPopulation[0]);
        }

        return JSON.parse(JSON.stringify(this.orderPopulation[0]))
    }

    Replace2opt(key,key2)
    {

        let A = this.orderPopulation[0][key]
        let B = this.orderPopulation[0][key2]

        //console.log(A.distance,B.distance,JSON.parse(JSON.stringify(this.orderPopulation[0])))
        let temp_A = A["order"].slice();
        let temp_B = B["order"].slice();


        // console.log(this.orderPopulation[0][key],this.orderPopulation[0][key2])

        // console.log(key,key2,temp_A,temp_B)
        let dist_curr=A["distance"] + B["distance"]


        for (let j = 0; j < temp_A.length; j++)
        {
            for (let k = 0; k < temp_B.length; k++)
            {
                let tmp = temp_A[j]
                temp_A[j] = temp_B[k]
                temp_B[k] = tmp;


                let real_contA = this.checkMatchingContainers(this.getContainers(temp_A), this.containers);
                let real_contB = this.checkMatchingContainers(this.getContainers(temp_B), this.containers)
                let real_capA = this.getsumArr(real_contA);
                let real_capB = this.getsumArr(real_contB);

                if (real_capA <= this.max_capability && real_capB <= this.max_capability && real_contA.length > 0 && real_contB.length > 0)
                {


                    // console.log(JSON.parse(JSON.stringify(this.orderPopulation[i])))
                    let current_contA = this.getContainersByOne(temp_A)
                    let current_contB = this.getContainersByOne(temp_B)

                    // console.log(JSON.parse(JSON.stringify(this.orderPopulation[0][key])))
                    //console.log(temp_A,temp_B)

                    let temp_A1 =this.resetdata2opt(temp_A)
                    let temp_B1 =this.resetdata2opt(temp_B)

                    let dist_new = temp_A1.distance+temp_B1.distance


                    if(dist_new <dist_curr)
                    {

                        //    console.log("tttt",temp_A,temp_B,A["order"],B["order"])
                        let pop = (JSON.parse(JSON.stringify(this.orderPopulation[0])))
                        let obj = {}
                        obj["order"] = temp_B.slice()
                        obj["containers"] = current_contB
                        obj["path"]  = temp_B1.path
                        obj["distance"] = temp_B1.distance
                        obj["detailed_path"] = temp_A1.detailed_path
                        obj["products_id"] = []
                        obj['products_id_map'] ={}

                        //  console.log("obj",obj)

                        this.orderPopulation[0][key]["order"] = temp_A.slice()
                        this.orderPopulation[0][key]["path"] = temp_A1.path
                        this.orderPopulation[0][key]["distance"] = temp_A1.distance
                        this.orderPopulation[0][key]["detailed_path"] = temp_A1.detailed_path
                        this.orderPopulation[0][key]["containers"] = current_contA

                        pop[key]=this.orderPopulation[0][key]
                        pop[key2]=obj

                        // console.log(JSON.parse(JSON.stringify(pop)),key,key2)


                        // console.log("elo",temp_A,temp_B,dist_curr,dist_curr,JSON.parse(JSON.stringify(this.orderPopulation[0])))
                        return JSON.parse(JSON.stringify(pop))

                    }
                    else
                }


            }

        }
        return 0;

    }


    SA()
    {
        let base = JSON.parse(JSON.stringify(this.orderPopulation[0]))
        let next = this.newTempResults()

        let newPop = this.solveAnnealing(base, next)
        this.orderPopulation[0]=newPop
       // delete this.orderPopulation[0].dist
    }


    solveAnnealing(cur,next)
    {


        let current =JSON.parse(JSON.stringify(cur))
        let result = current
        let neighbor =JSON.parse(JSON.stringify(next))

        if(this.restart_t>this.temperature)
        {
           // this.temperature=this.T0

          //  this.orderPopulation[0]=JSON.parse(JSON.stringify(this.bestCombination))

        }


       // if(this.temperature>this.ABSOLUTE_ZERO)
        {
            let neighbor_cost = this.getDistanceAnn(neighbor)
            let current_cost = this.getDistanceAnn(current)


            let prob = this.acceptanceProbability(current_cost, neighbor_cost)
            console.log("neb",current_cost,neighbor_cost,this.best_cost,this.temperature,this.current_epos);
            if(Math.random() < prob && this.temperature>1)
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




