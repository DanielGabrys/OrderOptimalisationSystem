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
          //console.log("ind",individual);
           //break;
           this.reselectFinalContainers(individual);


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
            object["possible_containers"] = real_cont;
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
            object["possible_containers"] = real_cont;
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

        for(let k=0;k<object.length;k++)
        {
            let map = object[k]["containers_map"];
            let possible_containers = object[k]["possible_containers"].slice();
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

    }

    orderContFitness(sequence)
    {

        let arr =[];
        let sum_distance=0.00001;
        for (const i in sequence)
        {
            sum_distance+= sequence[i]["distance"];
        }

        //console.log("sequence",sequence,sum_distance)

        for (const i in sequence)
        {
            let fitness= sequence[i]["distance"]/sum_distance;
            sequence[i]["fitness"]=fitness;
            sequence[i]["products_id"]=[];
            sequence[i]["products_id_map"]={};

        }

        this.order = arr.splice(0,arr.length);

    }

    nextContGeneration()
    {
        for(let i=0;i<this.orderPopulation.length;i++)
        {
           let best = JSON.parse(JSON.stringify(this.bestCombination))
           delete best.dist
           this.orderPopulation[i] = best

           let multiple = this.getRandomGens(this.orderPopulation[i])


           this.singleReplace(i)
           this.doubleReplace(i,multiple)
        }

    }
    nextContGenerationAnn(k)
    {
                let base = JSON.parse(JSON.stringify(this.orderPopulation[0]))

                if(an.best_cost===Infinity)
                    an.init(base,this.iteration)

                this.doubleReplace(0, 1)
                for (const key2 in this.orderPopulation[0])
                {
                    //this.orderFitness(this.orderPopulation[0][key2]);
                   // this.startGenetic();
                    this.setOrderNodeShortestPathData(this.orderPopulation[0][key2]);
                    this.orderContFitness(this.orderPopulation[0]);
                    this.getPopNodeMaxDistances(this.orderPopulation[0]);

                }
                //console.log(JSON.parse(JSON.stringify(this.orderPopulation[0])))
                an.solveAnnealing(base, JSON.parse(JSON.stringify(this.orderPopulation[0])))
                delete this.orderPopulation[0].dist

    }


    singleReplace(i)
    {
        let toSwitch = this.getPopNodeMaxDistances(this.orderPopulation[i])
        let A = this.orderPopulation[i][toSwitch[0]]
        let B = this.orderPopulation[i][toSwitch[1]]

        let toselect;
        let tobeput;
        let switcher_id
        let base_id

        if(toSwitch[0]<toSwitch[1])
        {
            toselect =A
            base_id=toSwitch[0]

            tobeput =B
            switcher_id=toSwitch[1]

        }
        else
        {
            toselect=B
            base_id=toSwitch[1]

            tobeput =A
            switcher_id=toSwitch[0]
        }


        let temp_orders = tobeput["order"].slice()
        let temp_orders2 = toselect["order"].slice()

        let random_index = Math.floor(Math.random()*toselect["order"].length)
        let random =toselect["order"][random_index];
        let rand_size= toselect["containers"][random]
        temp_orders.push(random)

        temp_orders2.splice(random_index,1)


        let result = this.checkIfSwitchPossible(temp_orders,temp_orders2,base_id,switcher_id)

        if(result!==0)
        {

           // console.log("control",toselect["order"],toSwitch,this.orderPopulation[i],random,rand_size,temp_orders,temp_orders2)
            this.orderPopulation[i][ result["base_id"] ]["order"] = result["base"]
            this.orderPopulation[i][ result["joined_id"] ]["order"] = result["joined"]

            this.orderPopulation[i][ result["base_id"] ]["containers"] = result["base_containers"]
            this.orderPopulation[i][ result["joined_id"] ]["containers"] = result["joined_containers"]

          //  console.log("result",result);
        }
    }

    getRandomProperty(obj)
    {
        const keys = Object.keys(obj);

        return keys[Math.floor(Math.random() * keys.length)];
    }

    getRandomGens(obj)
    {
        const keys = Object.keys(obj);

        return Math.floor(Math.random() * keys.length/2);
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
                let toSwitch = this.getPopNodeMaxDistances(this.orderPopulation[i])

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


                let AcontSum = this.getsumArr(contA)
                let BcontSum = this.getsumArr(contB)


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

