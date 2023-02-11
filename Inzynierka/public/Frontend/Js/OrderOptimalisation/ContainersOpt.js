class ContainersOpt extends OrderOptimalisation
{
    max_capability=0;

    containers =[];
    distinc_containers =[];
    order_containers =[];
    orders =[];
    joined_orders= [];
    order_ids =[];
    order_ids_base =[];
    partial =false;
    containerFitness =[]
    containerFitnessVal =[]
    timestamps = {}
    time=0;
    start_time =0


   setStartVariables(orders,containers,distinct_containers,partial)
   {
       this.orders=orders;
       this.containers=containers;
       this.distinc_containers=distinct_containers;
       this.max_capability= this.getsumArr(containers);
       this.partial =partial

       console.log(this.partial,"partial")

   }


   createContainerPopulation(pop)
   {
       if(this.partial===true)
            this.setContainerSizeForOrders()
       else
            this.setContainerSizeForOrdersNoSplit()
       let orders=[];
      // return 0;
       // console.log("number",this.orders_number);
       for(let i=0;i<this.orders_number;i++)
       {
           orders[i]=i;
       }
       for(let i=0;i<pop;i++)
       {

           this.order_ids = this.order_ids_base.slice();
           this.orderPopulation[i] = {};
           this.orderPopulationSummary[i] = {};

           let temp_orders= orders.slice();
           let counter =0;
           let individual = this.individual();
         // console.log("ind",individual);
           //break;
         //  this.reselectFinalContainers(individual);
          // console.log("ind",individual);


           for(let j=0;j<individual.length;j++)
           {
               // break;
               this.orderPopulation[i][j] = {};
              // this.minusOne(individual[j]["orders"]);
               this.orderPopulation[i][j]["order"]=individual[j]["orders"];
               this.orderPopulation[i][j]["containers"] =individual[j]["containers_map"]

               console.log(i);
           }

       }


       //console.log("individual",this.orderPopulation);
       return this.orderPopulation;
   }

    individual()
    {
        this.joined_orders=[];
        let order_combination = this.getPossibleCombinations(this.order_containers);
        this.randomContainerSelection(order_combination);
       // console.log("------------------------------------");
        return this.joined_orders;
    }

    setContainerSizeForOrders()
    {
    let orders ={};
    for (let i=0;i<this.orders.length;i++)
    {
        let tem_cont = this.containers.slice();
        let proper_cont =[];
        this.order_ids.push(this.orders[i]["order_id"]);
        this.order_ids_base.push(this.orders[i]["order_id"]);
        let cap =parseInt(this.orders[i]["capability"]);
        let current_cap =0;
        let containers_sum_cap = this.getsumArr(this.containers)

        if(cap<=this.max_capability && cap<containers_sum_cap)
        {
            let counter = 0;
            while (cap > current_cap)
            {
                //console.log(this.orders[i],cap,this.getsumArr(this.containers));
                for (let j = 0; j < tem_cont.length; j++) {
                    //console.log(tem_cont[j], cap, current_cap)
                    if (tem_cont[j] + current_cap >= cap)
                    {
                        proper_cont.push(tem_cont[j])
                        current_cap += tem_cont[j];
                        break;

                    }
                    else if (j === tem_cont.length - 1) {
                        proper_cont.push(tem_cont[j])
                        current_cap += tem_cont[j];
                        tem_cont.splice(j, 1);

                    }

                }
                counter++;

                if(counter>100) break;
            }
        }
        orders[this.orders[i]["order_id"]] = proper_cont;
    }

    this.order_containers = orders;

}

    setContainerSizeForOrdersNoSplit()
    {
        let orders ={};
        for (let i=0;i<this.orders.length;i++)
        {
            let tem_cont = this.containers.slice();
            let proper_cont =[];
            this.order_ids.push(this.orders[i]["order_id"]);
            this.order_ids_base.push(this.orders[i]["order_id"]);
            let cap =parseInt(this.orders[i]["capability"]);
            let current_cap =0;

                    for (let j = 0; j < tem_cont.length; j++)
                    {

                        if (tem_cont[j] + current_cap >= cap)
                        {
                            proper_cont.push(tem_cont[j])
                            current_cap += tem_cont[j];
                            break;
                        }
                    }

            if(proper_cont.length===0)
                proper_cont.push(Infinity)
            orders[this.orders[i]["order_id"]] = proper_cont;
        }

        this.order_containers = orders;
        console.log(this.order_containers)

    }


    minusOne(arr)
    {
        for(let i=0;i<arr.length;i++)
        {
            arr[i]--;
        }
    }

    compareNumbers(a, b)
    {
    return a - b;
}

    getPossibleCombinations(orders)
    {
        let orders_comb ={};
        for (const i in orders)
        {
            let arr =[];
            let cap = this.getsumArr(orders[i]);
            for (const j in orders)
            {
                if(i!==j)
                {
                    let cap2 =this.getsumArr(orders[j]);
                    if(cap+cap2<=this.max_capability)
                    {
                        let cont_array=orders[i];
                        cont_array = cont_array.concat(orders[j])
                        cont_array.sort(this.compareNumbers);
                       // console.log(cont_array);
                        //if(this.getsumArr(cont_array)<=this.max_capability && this.checkMatchingContainers(cont_array,this.containers))
                        if(this.getsumArr(cont_array)<=this.max_capability)
                        {
                            arr.push(parseInt(j));
                        }
                    }
                }
            }
            orders_comb[i] = arr;
        }
        //console.log(orders_comb)
        return orders_comb;
    }


    compareNumbers(a, b)
    {
    return a - b;
    }

    checkMatchingContainers(arr,arr2)
    {

        let containers = arr.slice();
        let containers_base =arr2.slice();
        let size=0;
        let real_containers=[];

        if(containers.length>containers_base.length)
        {
            return [];
        }

        while(containers.length>0)
        {

            let index = this.findNotSmaller(containers_base,containers[0])


           // console.log(containers,containers_base,index)
            if(index===-1) return [];
            else
            {
                real_containers.push(containers_base[index]);
                containers_base.splice(index,1);
                containers.splice(0,1);

                //console.log(containers_base,containers)
            }

        }

        return real_containers;

    }

    randomContainerSelection(order_combinations)
    {

        let test = JSON.parse(JSON.stringify(order_combinations));


        //console.log("elo",this.order_ids,this.order_ids_base)
        while(this.order_ids.length>0)
        {
            let joined_orders =[];
            let order_index = (Math.floor(Math.random() * (this.order_ids.length -1) + 1));
            order_index =this.order_ids[order_index];

            if(this.order_ids.length===1)
                joined_orders=this.order_ids;
            else
            joined_orders.push(order_index);

            let succesed =0;

            let object = {};
            let counter = 0;


            //console.log("joined_index /////////////",joined_orders,this.order_ids)
            while (true)
            {

                if(this.order_ids.length<=1)
                {
                    break;
                }

                //console.log("joined_index ////",joined_orders)
                //console.log(JSON.parse(JSON.stringify(test)),this.order_ids)
                let order_joined_index = Math.floor(Math.random() * (test[order_index].length));
                let result = this.singleContainerSelectionIsPossible(joined_orders, test, order_index, order_joined_index);

                if (counter === 0) {
                    this.deleteFromContainersSelection(test, joined_orders[0]);
                }

                if (!(result.hasOwnProperty("added"))) {
                    this.deleteFromContainersSelection(test, result["orders"][result["orders"].length - 1]);
                    joined_orders = result["orders"];
                    object = JSON.parse(JSON.stringify(result));
                    succesed=1;

                } else {
                    test[order_index].splice(result["added"], 1)
                }
               // console.log(counter)
               // console.log(JSON.parse(JSON.stringify(test)))
                counter++;

                if (test[order_index].length === 0) break;

            }


            if(succesed!==1)
            {
                    object = this.singleContainerLeft(joined_orders);
            }

            this.deleteCombinedOrders(joined_orders, test)
            //console.log(this.order_containers)
            //console.log("left",this.order_ids,succesed,joined_orders)
           // console.log(test);
            if( !(Object.keys(obj).length === 0 && obj.constructor === Object))
                this.joined_orders.push(object);

           // console.log("joined_orders",JSON.parse(JSON.stringify(this.joined_orders)))
        }
    }

    deleteCombinedOrders(arr,test)
    {
        for(let i=0;i<arr.length;i++)
        {
            let id =this.order_ids.indexOf(arr[i]);
            this.order_ids.splice(id,1);
            delete test[arr[i]];
        }
    }

    singleContainerSelectionIsPossible(joined_orders,orders,i,j)
    {
        let object ={};
        let test = JSON.parse(JSON.stringify(orders));
        let joined = JSON.parse(JSON.stringify(joined_orders))

        joined.push(test[i][j]);

        let current_cont =this.getContainersByOne(joined)
        let cont = this.getContainers(joined);

        cont = cont.sort(this.compareNumbers)

        let cap = this.getsumArr(cont);
        let real_cont = this.checkMatchingContainers(cont, this.containers);
        let real_cap = this.getsumArr(real_cont);

        //console.log(joined, cont, real_cont, cap,real_cap);
        if(real_cap>this.max_capability || real_cont.length===0)
            object["added"] = j
        else
        {
            object["orders"] = joined;
            object["optimal_containers"] = cont;
            object["containers"] = real_cont;
            object["containers_map"] = current_cont;
            object["real_cap"] = real_cap;
            object["cap"] = cap;


        }
        return object;
    }

    singleContainerLeft(orders)
    {
        let object ={};

        let cont = this.getContainers(orders);
        let current_cont =this.getContainersByOne(orders)
        cont = cont.sort(this.compareNumbers)

        let cap = this.getsumArr(cont);
        let real_cont = this.checkMatchingContainers(cont, this.containers);
        let real_cap = this.getsumArr(real_cont);

            object["orders"] = orders.slice();
            object["optimal_containers"] = cont;
            object["containers"] = real_cont;
            object["containers_map"] = current_cont;
            object["real_cap"] = real_cap;
            object["cap"] = cap;


        return object;
    }


    deleteFromContainersSelection(order_combination,el)
    {
        for(const key in order_combination)
        {
            var index = order_combination[key].indexOf(el);
            if (index !== -1)
            {
                order_combination[key].splice(index, 1);
            }
        }
    }

    findNotSmaller(arr,number)
    {
        for(let i=0;i<arr.length;i++)
        {
            if(arr[i]>=number)
            {
                return i;
            }
        }
        return -1
    }

    getsumArr(arr)
    {
        let sum =0
        for(let i=0;i<arr.length;i++)
        {
            sum+=arr[i]
        }
        return sum;
    }

    getContainers(arr)
    {

        let containers_array =[];
        for(let i=0;i<arr.length;i++)
        {
            containers_array = containers_array.concat(this.order_containers[arr[i]]);
        }
        containers_array.sort(this.compareNumbers)

        return containers_array;
    }

    getContainersByOne(arr)
    {

        let containers = {};
        for(let i=0;i<arr.length;i++)
        {
           containers[arr[i]]=this.order_containers[arr[i]];

        }
        return containers;
    }

    reselectFinalContainers(object)
    {

        /*
        console.log("reselectContainers",object)
        for(const k in object)
        {
            let map = object[k]["containers_map"];
            let possible_containers = object[k]["containers"].slice();
            //console.log(map,possible_containers)
            for (const key in map) {
                for (let i = 0; i < map[key].length; i++) {
                    let index = possible_containers.indexOf(map[key][i])

                    if (index === -1)
                    {
                        let node = map[key][i];
                        let min = Infinity;
                        let min_node = 0;
                        for (let j = 0; j < possible_containers.length; j++) {
                            if (containers[j] > node) {
                                if (containers[j] - node < min) {
                                    min = containers[j] - node
                                    min_node = j;
                                }
                            }
                        }
                       // console.log(object[k]["possible_containers"]);
                        object[k]["containers_map"][key][i] = possible_containers[min_node];
                        index = min_node;
                    }
                    possible_containers.splice(index, 1)
                }
            }
        }

         */

    }

    orderContFitness(sequence)
    {

        let part_sum =[]
        let fitness =[]
        let sum_distance = 0;
        for(let i=0;i<sequence.length; i++) //population
        {

            part_sum.push(0)
            for (const k in sequence[i]) //batch
            {
                sum_distance += sequence[i][k]["distance"];
                part_sum[i] += sequence[i][k]["distance"]
            }
        }

        for(let i=0;i<sequence.length; i++) //population
        {
            fitness[i] = (1/ part_sum[i])

        }


        let sum =0
        for(let i=0;i<fitness.length;i++)
        {
            sum+=fitness[i];
        }
        for(let i=0;i<fitness.length;i++)
        {
            fitness[i] = fitness[i]/sum;
        }
       // console.log("fitnes",fitness,part_sum)
        this.containerFitness = fitness
        this.containerFitnessVal = part_sum

        /*
        for (const i in sequence) {
            let fitness = sequence[i]["distance"] / sum_distance;
            sequence[i]["BatchFitness"] = fitness;
            sequence[i]["products_id"] = [];
            sequence[i]["products_id_map"] = {};

        }

         */

       // this.order = arr.splice(0,arr.length);

    }

    nextContGeneration(max_time)
    {

        let time = (Date.now()- this.start_time)/1000
        if(time>=this.time)
        {
            this.timestamps[this.time]=this.bestCombination.dist
            this.time+=60;
        }
        console.log(time)

        let rate = Math.floor(Math.random() * this.orderPopulation.length)

        let newPopulation=[];

        if(Math.random()<1)
        {
            let nodeA = this.pickOneCont(this.orderPopulation, this.containerFitness)
            let nodeB = this.pickOneCont(this.orderPopulation, this.containerFitness)
            let result = this.crossOverCont(nodeA, nodeB)
            let result2 = this.crossOverCont(nodeB, nodeA)


            this.orderPopulation.push(result)
            this.orderPopulation.push(result2)


            this.addNewCroosoversToPopulation(result)
            this.addNewCroosoversToPopulation(result2)

            console.log(this.orderPopulation[this.orderPopulation.length-1])
            console.log(this.orderPopulation[this.orderPopulation.length-2])
            this.OrderBatching2OPT(max_time,this.orderPopulation.length-1)
            this.OrderBatching2OPT(max_time,this.orderPopulation.length-2)

            this.orderContFitness(this.orderPopulation)

            let the_same = this.getTheSamePopElemCounter()


            // console.log(this.orderPopulation)
            this.deleteWorstFromPopulation(the_same)
            this.deleteWorstFromPopulation(the_same)
        }


        if(Math.random()<0.1)
        {
            this.doubleReplace(rate,1)
        }

    }

    addNewCroosoversToPopulation(result)
    {
        for (const key in result)
        {

            cont.orderFitness(result[key]);
            cont.startGenetic();
            cont.setOrderNodeShortestPathData(result[key]);
            cont.getPopNodeMaxDistances(result);
        }
    }

    nextContGenerationReplaceAll()
    {
       let newPopulation=[];
       for(let i=0;i<this.orderPopulation.length;i++)
       {


          let rate =Math.random();
          let nodeA = this.pickOne(this.orderPopulation,this.containerFitness)
          let nodeB = this.pickOne(this.orderPopulation,this.containerFitness)
          let result = this.crossOverCont(nodeA,nodeB)

          newPopulation[i]=result

           if(rate<0.1)
           {
               this.doubleReplace(i,1)
           }

       }
       this.orderPopulation = newPopulation
    }

    pickOneCont(list,prob)
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

    deleteWorstFromPopulation(counter)
    {
        let worst = this.resetTheSamePopulation()

        this.containerFitness.splice(worst,1)
        this.orderPopulation.splice(worst,1)


    }

    resetTheSamePopulation(counter)
    {

        let rate =Math.floor(Math.random() * 3)
        if(rate >3 )
        {

           let node =this.modeArray(this.containerFitnessVal)
            for (let i = 0; i < this.containerFitnessVal.length; i++)
            {
                if (this.containerFitnessVal[i] === node)
                {
                   return i
                }
            }
       }
       else
        {
            return this.getWorstFitness()
        }
    }

    getTheSamePopElemCounter()
    {
        let counter =0;
        for(let i=0;i<this.containerFitnessVal.length;i++)
        {
            if(this.containerFitnessVal[i]===this.bestCombination.dist)
            {
                counter++
            }
        }

        return counter
    }

    getWorstFitness()
    {
        let min =Infinity;
        let index =-1;
        for(let i=0;i<this.containerFitness.length;i++)
        {
            if(this.containerFitness[i]<min)
            {
                min = this.containerFitness[i]
                index=i;
            }
        }
       // console.log(index)
        return index;
    }

    getBestFitness()
    {
        let max =0;
        let index =-1;
        for(let i=0;i<this.containerFitness.length;i++)
        {
            if(this.containerFitness[i].max)
            {
                max = this.containerFitness[i]
                index=i;
            }
        }
        // console.log(index)
        return index;
    }

    crossOverCont(batchA, batchB)
    {

        let batchA_temp = JSON.parse(JSON.stringify(batchA))
        let batchB_temp = JSON.parse(JSON.stringify(batchB))

        let t1 = parseInt(this.getRandomProperty(batchA))
        let t2 = parseInt(this.getRandomProperty(batchA))

        while(t1 === t2)
        {
           t1 =  this.getRandomProperty(batchB)
        }

        if(t2<t1)
        {
            let tmp =t1;
            t1=t2;
            t2=tmp
        }

       // console.log("t",t1,t2)

        let arr1 = this.batchtoArray(batchA)
        let arr2 = this.batchtoArray(batchB)
        //console.log("oldA",arr1)
        //console.log("oldB",arr2)

      //  let orders_inB = this.crossOverTransport(t1,t2,batchB)
        let A_unchatching =[]
        let B_unchatching =[]


        let childA = []
        let childAarr =[]

        //moving from  A
        for(let i=t1;i<=t2;i++)
        {
            let arr =[]
            for(let j=0;j<batchA[i].order.length;j++)
            {
                arr.push(batchA[i].order[j])
                childAarr.push(batchA[i].order[j])
            }
            if(arr.length>0)
             childA.push(arr)
        }

        this.crossOverTransport(t1,t2,batchB,childA,childAarr)
        let left = this.batchPushleft(arr1,childAarr)
       // console.log(childA,left)
        let cross = this.batchFillAll(childA,left)


       // console.log("cross",cross)
        return cross
    }

    batchPushleft(base,childarr)
    {
        let arr=[]
        {
            for(let j=0;j<base.length;j++)
            {
                if(!childarr.includes(base[j]) && base[j]!=="-")
                {
                    arr.push(base[j])
                }

            }
        }

        return arr

    }

    batchFillAll(child,left)
    {

        let final ={}

        let part = child.slice()
        let orders = left.slice()
        let succed =1
        let counter =0
        while(orders.length>0 && counter<1000)
        {
            succed=0
            let elem = orders[0]
          //  console.log(orders)
            for (let i = 0; i < part.length; i++)
            {
                let result = this.singleReplace(part[i], elem)
               // console.log((result),i)
                if (result !== 0)
                {
                    final[i] = result
                    part[i] = result.orders
                   // console.log(part, orders)
                    orders.splice(0, 1)
                    succed = 1
                    break;
                }
            }
            if(succed===0) {
               // console.log("errr")
                orders.splice(0, 1)
                if([elem])
                 part.push([elem])
            }
                counter++
        }

        let res = this.batchgetContainers(part);
        let result ={}
        for(let i=0;i<res.length;i++)
        {
            result[i] = res[i]
        }

        return result;

    }

    modeArray(array)
    {
    if (array.length === 0) return null;
    var modeMap = {},
        maxCount = 1,
        modes = [];

    for (var i = 0; i < array.length; i++) {
        var el = array[i];

        if (modeMap[el] == null) modeMap[el] = 1;
        else modeMap[el]++;

        if (modeMap[el] > maxCount) {
            modes = [el];
            maxCount = modeMap[el];
        } else if (modeMap[el] == maxCount) {
            modes.push(el);
            maxCount = modeMap[el];
        }
    }
    return modes;
}


    batchgetContainers(part)
    {
        let result =[]
        let newpart =[]
        for (let i = 0; i < part.length; i++)
        {
            if(part[i].length>0)
            {
                newpart.push(part[i]);
            }
        }




        for (let i = 0; i < newpart.length; i++)
        {
            result[i] ={}
            let base = newpart[i].slice()
            let cont = this.getContainers(newpart[i]);
            cont = cont.sort(this.compareNumbers)
            let real_cont = this.checkMatchingContainers(cont, this.containers);
            result[i]["order"] = newpart[i]
            result[i]["containers"] = real_cont;


        }
        this.reselectFinalContainers(result)

        return result


    }

    batchFillRest(batch)
    {
        let arr=[]
        for(let j=0;j<this.order_ids_base.length;j++)
        {
            if(!batch.includes(this.order_ids_base[j]))
            {
               arr.push(this.order_ids_base[j])
            }
        }

        return arr
    }

    batchtoArray(batch)
    {
       // console.log(batch)
        let arr =[]
        for (const key in batch)
        {
            for(let j=0;j<batch[key].order.length;j++)
            {
                arr.push(batch[key].order[j])
            }
            arr.push("-")
            }
        return arr
    }

    crossOverTransport(t1,t2,batch,child,childarr)
    {

        let l= Object.keys(batch).length
        for(let i=0;i<t1;i++)
        {
            let arr=[]
            for(let j=0;j<batch[i]["order"].length;j++)
            {
                let el = batch[i]["order"][j]
                if(!childarr.includes(el))
                {
                    arr.push(batch[i]["order"][j])
                    childarr.push(batch[i]["order"][j])
                }

            }
            child.push(arr)
        }


        for(let i=t2+1;i<l;i++)
        {
            let arr=[]
            for(let j=0;j<batch[i]["order"].length;j++)
            {
                let el = batch[i]["order"][j]
                if(!childarr.includes(el))
                {
                    arr.push(batch[i]["order"][j])
                    childarr.push(batch[i]["order"][j])
                }

            }
            child.push(arr)
        }

        return child
    }


    OrderBatching2OPT(max_time,index)
    {

                console.log(this.bestOrderVariationDistance)
                //console.log(this.orderPopulation[0])
                let improved = true
                let counter =0;
                let arr= Object.keys(this.orderPopulation[index])
                let time0 =0
                let startTime = Date.now();
                while(improved)
                {
                    counter++
                    improved=false
                    for (let i=0;i<arr.length;i++)
                    {

                        for (let j=i+1;j<arr.length;j++)
                        {
                                let flag = this.doubleReplace2opt(arr[i], arr[j],index)
                                let time = (Date.now()- startTime)/1000
                                if(time>=time0)
                                {
                                    this.timestamps[time0]=this.bestCombination.dist
                                    time0+=60;
                                }
                                console.log(i,j,time)
                                if (time >= max_time)
                                {
                                    this.setPopulationNodeShortestPathData(this.orderPopulation[index],this.orderPopulationSummary,0,)
                                    return
                                }
                                if(flag!==0)
                                {
                                    improved=true;
                                    this.reselectFinalContainers(flag)
                                    this.orderPopulation[index]=flag
                                   // this.setPopulationNodeShortestPathData(this.orderPopulation[0],this.orderPopulationSummary,0,)
                                    this.setPopulationNodeShortestPathData(this.orderPopulation[index],this.orderPopulationSummary,0,)
                                    console.log("improved",index,this.bestCombination.dist)

                                    //break;
                                }



                        }

                    }
                }
                this.setPopulationNodeShortestPathData(this.orderPopulation[0],this.orderPopulationSummary,0,)
                console.log(this.bestCombination)
                console.log(this.timestamps)

    }



    singleReplace(arr,elem)
    {

        let result ={}
        let base = arr.slice()
        base.push(elem)

        let cont = this.getContainers(base);
        let real_cont = this.checkMatchingContainers(cont, this.containers);
        let real_cap = this.getsumArr(real_cont);

        let current_cont =this.getContainersByOne(arr)

        if(real_cap<=this.max_capability && real_cont.length>0 )
        {
            // console.log("cont",cont, real_cont,real_cap,flag);
            result["orders"] = base
            result["containers"] = current_cont;

            return result
        }
        return 0
    }

    getRandomProperty(obj)
    {
        const keys = Object.keys(obj);

        return keys[Math.floor(Math.random() * keys.length)];
    }

    getRandomGens(obj)
    {
        const keys = Object.keys(obj);

        return Math.floor(Math.random() * keys.length);
    }

    doubleReplace(i,j)
    {
        let flag=0;

        let iter =0;
        while(flag!==1 && iter <10)
        {
            iter++
            for (let k = 0; k < j; k++)
            {

                let tempPop = JSON.parse(JSON.stringify(this.orderPopulation[i]))

                let t1 = this.getRandomProperty(tempPop)
                let t2 = this.getRandomProperty(tempPop)
                while (t1 === t2) {
                    t2 = this.getRandomProperty(tempPop)
                }

                let A = this.orderPopulation[i][t1]
                let B = this.orderPopulation[i][t2]


                let contA = this.getContainers(A["order"])
                let contB = this.getContainers(B["order"])



               //console.log(A.order,B.order)
                let temp_A = A["order"].slice();
                let temp_B = B["order"].slice();

                flag = 0;
                for (let j = 0; j < A["order"].length; j++) {
                    for (let k = 0; k < B["order"].length; k++) {
                        let tmp = A["order"][j]
                        temp_A[j] = temp_B[k]
                        temp_B[k] = tmp;


                        let real_contA = this.checkMatchingContainers(this.getContainers(temp_A), this.containers);
                        let real_contB = this.checkMatchingContainers(this.getContainers(temp_B), this.containers)
                        let real_capA = this.getsumArr(real_contA);
                        let real_capB = this.getsumArr(real_contB);

                        if (real_capA <= this.max_capability && real_capB <= this.max_capability && real_contA.length > 0 && real_contB.length > 0) {
                            // console.log("konty_base", A["containers"], B["containers"],A["order"],B["order"])
                            //console.log("konty", real_contA, real_contB, temp_A, temp_B,real_capA,real_capB)
                            // console.log(toSwitch)

                            // console.log(JSON.parse(JSON.stringify(this.orderPopulation[i])))
                            let current_contA = this.getContainersByOne(temp_A)
                            let current_contB = this.getContainersByOne(temp_B)


                            this.orderPopulation[i][t1]["order"] = this.shuffle(temp_A)
                            this.orderPopulation[i][t2]["order"] = this.shuffle(temp_B)

                            this.orderPopulation[i][t1]["containers"] = current_contA
                            this.orderPopulation[i][t2]["containers"] = current_contB
                            //console.log(this.orderPopulation[i])


                            flag = 1;
                            return 1
                        }

                        temp_A = A["order"].slice();
                        temp_B = B["order"].slice();
                    }

                }
            }
        }
        return flag;


        //console.log("sum",AcontSum,BcontSum)
    }

    doubleReplace2opt(key,key2,i)
    {

                let A = this.orderPopulation[i][key]
                let B = this.orderPopulation[i][key2]

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

                       // console.log("max",real_capA,real_capB,this.max_capability)
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
                                let pop = (JSON.parse(JSON.stringify(this.orderPopulation[i])))
                                let obj = {}
                                obj["order"] = temp_B.slice()
                                obj["containers"] = current_contB
                                obj["path"]  = temp_B1.path
                                obj["distance"] = temp_B1.distance
                                obj["detailed_path"] = temp_A1.detailed_path
                                obj["products_id"] = []
                                obj['products_id_map'] ={}

                              //  console.log("obj",obj)

                                this.orderPopulation[i][key]["order"] = temp_A.slice()
                                this.orderPopulation[i][key]["path"] = temp_A1.path
                                this.orderPopulation[i][key]["distance"] = temp_A1.distance
                                this.orderPopulation[i][key]["detailed_path"] = temp_A1.detailed_path
                                this.orderPopulation[i][key]["containers"] = current_contA

                                pop[key]=this.orderPopulation[i][key]
                                pop[key2]=obj

                               // console.log(JSON.parse(JSON.stringify(pop)),key,key2)


                               // console.log("elo",temp_A,temp_B,dist_curr,dist_curr,JSON.parse(JSON.stringify(this.orderPopulation[0])))
                                return JSON.parse(JSON.stringify(pop))

                            }
                        }


                    }

                }
                return 0;

    }

    resetdata2opt(orders)
    {


        this.order =this.orderFitness2opt(orders);
        this.startSolve()


        let population ={}
        population["distance"]=this.bestDistance;
        population["path"] = this.final_path;
        population["detailed_path"] = this.detailed_final_path_array;

        this.order = [];
        this.bestDistance=Infinity;
        this.final_path=[];
        this.detailed_final_path_array=[];
        this.detailed_final_path = new Map();



       // console.log("orders",population,orders)
        return population


    }

    checkIfSwitchPossible(temp_orders,temp_orders2,base_id,switch_id)
    {

        let result ={}
        let flag =0;
        let cont = this.getContainers(temp_orders);
        let cont2 = this.getContainers(temp_orders2);
        cont = cont.sort(this.compareNumbers)
        cont2 = cont2.sort(this.compareNumbers)


        let real_cont = this.checkMatchingContainers(cont, this.containers);
        let real_cont2 = this.checkMatchingContainers(cont2, this.containers);
        let real_cap = this.getsumArr(real_cont);

        let current_contA =this.getContainersByOne(temp_orders)
        let current_contB =this.getContainersByOne(temp_orders2)


        if(real_cap<=this.max_capability && real_cont.length>0 )
        {
           // console.log("cont",cont, real_cont,real_cap,flag);
            result["base"] = temp_orders2
            result["base_id"] = base_id
            result["joined"] = temp_orders;
            result["joined_id"] = switch_id;
            result["base_containers"] = current_contB
            result["joined_containers"] = current_contA;

            return result
        }
        return flag;
    }

    getPopNodeMaxDistances(node)
    {
        let max = [0,Infinity] //max, min
        let max_key = [0,0] //max1, min

        for(const key in node) //max1
            {
                if(node[key]["fitness"]>max[0])
                {
                        max[0] = node[key]["fitness"]
                        max_key[0] = key
                }

                if(node[key]["fitness"]<max[1])
                {

                    max[1] = node[key]["fitness"]
                    max_key[1] = key
                }
            }


        return max_key;



    }




}

cont = new ContainersOpt();

