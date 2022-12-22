class ContainersOpt extends OrderOptimalisation
{
    max_capability=40
    ;
    containers =[];
    distinc_containers =[];
    order_containers =[];
    orders =[];
    joined_orders= [];
    order_ids =[];
    order_ids_base =[];


   constructor(orders,containers,distinct_containers)
   {
       super();
       this.orders=orders;
       this.containers=containers;
       this.distinc_containers=distinct_containers;
   }


   createContainerPopulation(pop)
   {
       this.setContainerSizeForOrders()
       let orders=[];
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
           this.reselectFinalContainers(individual);

           console.log("ind",individual);

           for(let j=0;j<individual.length;j++)
           {

               this.orderPopulation[i][j] = {};
              // this.minusOne(individual[j]["orders"]);
               this.orderPopulation[i][j]["order"]=individual[j]["orders"];
               this.orderPopulation[i][j]["containers"] =individual[j]["containers_map"]

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
        console.log("------------------------------------");
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

        if(cap>this.max_capability)
            continue

        let counter=0;
        while(cap>current_cap)
        {
            for (let j = 0; j < tem_cont.length; j++)
            {
                // console.log(tem_cont[j],cap,current_cap)
                if (tem_cont[j]+current_cap >= cap)
                {
                    proper_cont.push(tem_cont[j])
                    current_cap+=tem_cont[j];
                    break;

                }
                else if(j===tem_cont.length-1)
                {
                    proper_cont.push(tem_cont[j])
                    current_cap+=tem_cont[j];
                    tem_cont.splice(j, 1);

                }


            }
            counter++;


        }
        orders[this.orders[i]["order_id"]] = proper_cont;
    }
    this.order_containers = orders;


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

    getPossibleCombination(array)
    {
            let arr =array.splice();
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
                        //if(this.getsumArr(cont_array)<=this.max_capability)
                        {
                            arr.push(parseInt(j));
                        }
                    }
                }
            }

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
            joined_orders.push(order_index);
            let succesed =0;

            let object = {};
            let counter = 0;

            while (true)
            {

                if(this.order_ids.length<=1)
                {
                    break;
                }

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
                for(let i=0;i<this.order_ids.length;i++)
                {
                    let arr = [this.order_ids[i]]
                    this.joined_orders.push(this.singleContainerLeft(arr));
                }

                break;
            }

            this.deleteCombinedOrders(joined_orders, test)
           // console.log(this.order_containers)
           // console.log("left",this.order_ids,succesed)
           // console.log(test);
            this.joined_orders.push(object);
            console.log(object)
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

            object["orders"] = orders;
            object["optimal_containers"] = cont;
            object["possible_containers"] = real_cont;
            object["containers_map"] = current_cont;
            object["real_cap"] = real_cap;
            object["cap"] = cap;


        return object;
    }


    checkContainerConditions(comb, randomize)
    {

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
            console.log(map,possible_containers)
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
                        console.log(object[k]["possible_containers"]);
                        object[k]["containers_map"][key][i] = possible_containers[min_node];
                        index = min_node;
                    }
                    possible_containers.splice(index, 1)
                }
            }
        }

    }
}
