class OrderOptimalisation extends GeneticAlgo
{

    interval =0;
    orderList ={};
    orders_number;
    division;
    divisionNr;
    orderPopulation =[];
    orderPopulationSummary =[];
    orderPopulationSize
    orderIteration=10;
    bestOrderVariation=this.orderPopulation[0];
    bestOrderVariationDistance=Infinity;
    bestOrderNodes ={};
    bestCombination = {};
    orderColors = {}
    OrderProducts_Id_Map = new Map();
    order_ids = [];
    order_colors ={};
    currentlyColorised =[];
    current_cont = {}

    setGeneticData(pop,iter)
    {
        this.orderPopulationSize=pop;
        this.orderIteration =iter;

        for(let i=0;i<this.orderPopulationSize;i++)
        {
            this.orderPopulationSummary[i]={};
        }
    }

    createOrderPopulation(divider)
    {

        this.division=divider;
        let orders=[];
        this.divisionNr = Math.ceil(this.orders_number/divider);

       // console.log("number",this.orders_number);

        for(let i=0;i<this.orders_number;i++)
        {
            orders[i]=i;
        }

        for(let i=0;i<this.order_ids.length;i++)
        {

            orders[i]=this.order_ids[i];
        }



        for(let i=0;i<this.orderPopulationSize;i++)
        {
            let size =Math.ceil(this.orders_number/divider);
            this.orderPopulation[i] = {};
            //this.orderPopulationSummary[i] = {};

            let temp_orders= orders.slice();
            let counter =0;
            for(let j=0;j<size;j++)
            {

                this.orderPopulation[i][j] = {};
                this.orderPopulation[i][j]["order"] = [];
                for(let k=0;k<divider;k++)
                {
                    if(counter>this.orders_number-1)
                        break;
                    let index = Math.floor(Math.random()*temp_orders.length)
                    let elem = temp_orders[index];
                    temp_orders.splice(index,1);
                    this.orderPopulation[i][j]["order"][k]=elem;
                    this.orderPopulation[i][j]["containers"] ={};
                    //console.log(elem,this.orderPopulation[i][j][k]);

                    counter++;
                }
            }
        }



    }

    createRandomOrders(orders_number,product_limit)
        {

                this.orders_number = orders_number;
                let orders = {};

                for(let k=0;k<orders_number;k++)
                {
                    orders[k] = {};
                    orders[k]['positions'] = [];
                    orders[k]['real_positions'] = [];
                    orders[k]['primary'] = [];

                    let array = [];
                    let randomized = [];
                    let order = [];
                   // console.log("products",this.products_positions);
                    for (const key in this.products_positions) {
                        let pos = this.products_positions[key]['pivot']['position'];

                        if (!array.includes(pos))
                        {
                            array.push(pos);
                        }
                    }

                    for (let i = 0; i < Math.floor((Math.random() * product_limit+1)); i++)
                    {
                        let random = Math.floor((Math.random() * array.length)+1);
                        if(array[random])
                        {
                            randomized.push(array[random]);
                            array.splice(random, 1);
                        }
                    }


                    // console.log(array);
                    // console.log("rand",randomized);

                    for (let i = 0; i < randomized.length; i++) {

                        const found = this.products_positions.filter(e => e.pivot.position == randomized[i]);

                        for (const key in found) {
                            // console.log(arr[i], found);
                            let pos = found[key]['pivot']['desired_position'];
                            if (!order.includes(pos))
                            {
                                order.push(pos);
                            }

                        }

                    }
                    orders[k]['positions']=randomized;
                    orders[k]['real_positions']=order;

                   // this.randomOrderColor(order);

                }

                return orders
        }


    createRandomOrders2(orders_number,product_limit)
    {

        this.orders_number = orders_number;
        let orders = {};

        for(let k=0;k<orders_number;k++) //for numbers of orders
        {
            orders[k] = {};
            orders[k]['positions'] = [];
            orders[k]['real_positions'] = [];
            orders[k]['products_id'] = [];
            orders[k]['primary'] = [];

            let array = [];
            let randomized = [];
            let order = [];
            let positions = [];

            // get all possible randoms products
           // console.log("products",this.products_positions);
            for (const key in this.products_positions) {
                let prod_key = this.products_positions[key]["id"];

                if (!array.includes(prod_key))
                {
                    array.push(prod_key);
                }
            }

            for (let i = 0; i < Math.floor((Math.random() * product_limit+1)); i++) // random order size
            {
                let random = Math.floor((Math.random() * array.length)+1); //random product
                if(array[random])
                {
                    randomized.push(array[random]);
                    array.splice(random, 1);
                }
            }


            // console.log(array);
            //console.log("rand",randomized);

            for (let i = 0; i < randomized.length; i++)
            {

                const found = this.products_positions.filter(e => e.id == randomized[i]);

               // console.log("found",found);
                    let pos = found[0]['pivot']['desired_position'];
                    let real_pos = found[0]['pivot']['position'];
                    if (!order.includes(pos))
                    {
                        order.push(pos);
                    }
                    positions.push(real_pos)

            }
            orders[k]['positions']=positions;
            orders[k]['real_positions']=order;
            this.OrderProducts_Id_Map.set(k,randomized);

           // console.log(this.OrderProducts_Id_Map);


        }
        this.randomOrderColor();

       // console.log("orders",orders);
        this.orderList = orders
        return orders
    }

    loadDatabase(obj)
    {
        this.orders_number = obj.length;
        let orders = {};
        for( let key =0; key<obj.length; key++)
        {

            this.order_ids.push(obj[key]['id']);
            let id =obj[key]["id"];
            orders[id] = {};
            orders[id]['positions'] = [];
            orders[id]['real_positions'] = [];
            orders[id]['products_id'] = [];
            orders[id]['primary'] = [];

            let order = [];
            let positions = [];
            let products_id = [];


            for(let key2 = 0 ; key2< obj[key]["products"].length; key2++)
            {
                const found = this.products_positions.filter(e => e.id == obj[key].products[key2].id);
                if((found.hasOwnProperty(0)))
                {
                    let pos = found[0]['pivot']['desired_position'];
                    let real_pos = found[0]['pivot']['position'];
                    if (!order.includes(pos)) {
                        order.push(pos);
                    }
                    positions.push(real_pos)
                    products_id.push(obj[key].products[key2].id)
                }
            }

            orders[id]['positions']=positions;
            orders[id]['real_positions']=order;
            this.OrderProducts_Id_Map.set(id,products_id);

            // console.log(this.OrderProducts_Id_Map);


        }

        this.randomOrderColor();

       // console.log(orders)

        return orders;
    }

    orderFitness(sequence)
    {


        let arr =[];
        let duplicats=0;
        for (let i=0;i<sequence["order"].length;i++)
        {

                //console.log("esq",this.orderList,sequence["order"][i])
                for (let j=0;j<this.orderList[sequence["order"][i]]['real_positions'].length;j++)
                {
                    if(arr.includes(this.orderList[sequence["order"][i]]['real_positions'][j]))
                    {
                        duplicats++;
                    }
                    else
                    {
                        arr.push(this.orderList[sequence["order"][i]]['real_positions'][j])
                     }
                }
        }
        let fitness= 1/(arr.length-duplicats+1);
        this.order = arr.splice(0,arr.length);
        sequence["fitness"]=fitness;
        sequence["products_id"]=[];
        sequence["products_id_map"]={};
        //console.log(this.order,arr,duplicats,fitness);

        return this.order
    }

    orderFitness2opt(sequence)
    {

        let arr =[];
        let duplicats=0;
        for (let i=0;i<sequence.length;i++)
        {

            //console.log("esq",this.orderList,sequence["order"][i])
            for (let j=0;j<this.orderList[sequence[i]]['real_positions'].length;j++)
            {
                if(arr.includes(this.orderList[sequence[i]]['real_positions'][j]))
                {
                    duplicats++;
                }
                else
                {
                    arr.push(this.orderList[sequence[i]]['real_positions'][j])
                }
            }
        }
        this.order = arr.splice(0,arr.length);

        //console.log(this.order,arr,duplicats,fitness);

        return this.order
    }

    colorizeOrders()
    {
        let multipleColors;
        let nodes ={}
        for (const key in this.orderList)
        {
            let arr =[];


            arr = this.orderList[key]["positions"];
            for(let i=0;i<arr.length;i++)
            {

                if(!document.getElementById(arr[i]).style.background)
                {
                    this.currentlyColorised.push(arr[i])
                    document.getElementById(arr[i]).style.background = this.orderColors[key];
                    nodes[arr[i]]=[];
                    nodes[arr[i]].push(this.orderColors[key]);

                }
                else
                {
                    nodes[arr[i]].push(this.orderColors[key]);
                }

            }

        }
        //console.log("nodes",nodes);

        for (const key in nodes)
        {

            let colorBase = 0;
            let colorPercentage=100/nodes[key].length;
            let colorMix = "linear-gradient(to right, ";
            for(let i=0;i<nodes[key].length;i++)
            {
                colorBase = i*colorPercentage +"% ";
                colorMix+=nodes[key][i]+" "+colorBase + colorPercentage+"%";
                if(i!==nodes[key].length-1)
                    colorMix+=', ';
            }
            colorMix+=')';
            document.getElementById(key).style.background = colorMix;
            //console.log("colorMix",colorMix)
        }

    }

    colorizeSelectedOrders(id)
    {

        if(! (this.bestCombination.hasOwnProperty(id)))
        return 0;

        let array = this.bestCombination[id]["order"]
        this.decolorizeSelectedOrders();
        let nodes ={}
        let colorised=[];
        for (const key in this.orderList)
        {
            let arr =[];

            if(array.includes(parseInt(key)))
            {
                arr = this.orderList[key]["positions"];
              //  const found = this.orderList.filter(e => e.id == products[i]);
                //console.log(arr)
               // console.log(key,this.orderList[key])
                for (let i = 0; i < arr.length; i++)
                {
                    if (! colorised.includes(arr[i]))
                    {
                        this.currentlyColorised.push(arr[i])
                        document.getElementById(arr[i]).style.background = this.orderColors[key];
                        nodes[arr[i]] = [];
                        nodes[arr[i]].push(this.orderColors[key]);
                        colorised.push(arr[i])

                    } else
                    {
                       // console.log(arr[i])
                        nodes[arr[i]].push(this.orderColors[key]);

                    }

                }
            }

        }
        //console.log(this.currentlyColorised);

        for (const key in nodes)
        {

            let colorBase = 0;
            let colorPercentage=100/nodes[key].length;
            let colorMix = "linear-gradient(to right, ";
            for(let i=0;i<nodes[key].length;i++)
            {
                colorBase = i*colorPercentage +"% ";
                colorMix+=nodes[key][i]+" "+colorBase + colorPercentage+"%";
                if(i!==nodes[key].length-1)
                    colorMix+=', ';
            }
            colorMix+=')';
            document.getElementById(key).style.background = colorMix;
            //console.log("colorMix",colorMix)
        }



    }

    decolorizeSelectedOrders()
    {
        for(let i=0;i<this.currentlyColorised.length;i++)
        {
            document.getElementById(this.currentlyColorised[i]).style.background="#FFA07A";
        }
    }

    setOrderNodeShortestPathData(population)
    {
        population["distance"]=this.bestDistance;
        population["path"] = this.final_path;
        population["detailed_path"] = this.detailed_final_path_array;

        this.order = [];
        this.bestDistance=Infinity;
        this.final_path=[];
        this.detailed_final_path_array=[];
        this.detailed_final_path = new Map();

       this.resetRectangle();
    }


    setPopulationNodeShortestPathData(main_pop,sec_pop,iter)
    {
        let dist = 0;
        let counter =0;
        for (const key in main_pop)
        {
           dist +=main_pop[key]["distance"];
           //console.log(main_pop[key]["distance"]);
        }

        //console.log("oh",this.bestOrderVariationDistance,dist,iter,main_pop);
        sec_pop["TotalDistance"] = dist;
        if(dist<this.bestOrderVariationDistance)
        {
           // console.log("main",main_pop,"sec",sec_pop)
            let copied1 = JSON.parse(JSON.stringify(main_pop));
            let copied2 = JSON.parse(JSON.stringify(sec_pop));
            copied1["dist"]=dist;

            this.bestOrderNodes[iter] = copied2;
            this.bestCombination= copied1;
            this.bestOrderVariationDistance= dist;
            //console.log("test",this.bestOrderVariationDistance,main_pop,sec_pop);
          //  console.log("dist",this.bestOrderVariationDistance,iter);
        }
    }

    orderNormaliseFitness(main_pop,sec_pop)
    {
       //  console.log("sec",sec_pop)
        let fitness = 0;
        for (const key in main_pop)
        {
            fitness +=main_pop[key]["fitness"];
        }

        for (const key in main_pop)
        {
            main_pop[key]["percentage"]= Math.round(main_pop[key]["fitness"]/fitness*100);
        }

        sec_pop["FitnessSum"]=fitness;

        let arr = new Array(100).fill(0);
        let index =0;
        for (const key in main_pop)
        {
            arr.fill(key,0+index,0+index+main_pop[key]['percentage']);
            index+=main_pop[key]['percentage'];
        }

        sec_pop["FitnessArr"]=arr;
       // console.log("sec",sec_pop)

    }

    newOrderGeneration(main_pop,sec_pop)
    {

        for(let i=0;i<main_pop.length;i++)
        {

            for (const key in sec_pop[i])
            {
                let random = Math.floor(Math.random() * 100)
                let elem = sec_pop[i]["FitnessArr"][random];
                sec_pop[i]['nodeToStay'] = elem;
            }

            let order_arr = []
            //delete main_pop.sum;
            for (const key in main_pop[i])
            {
                if (key !== sec_pop[i]['nodeToStay'] && key !== "sum")
                {
                    order_arr = order_arr.concat(main_pop[i][key]["order"])
                }
            }

            let temp_arr =order_arr.slice();
           // console.log("shuffle",order_arr,this.shuffle(temp_arr));
            sec_pop[i]['arrayToRandom']= this.shuffle(temp_arr);
            //console.log("shuffle",order_arr,sec_pop[i]['arrayToRandom']);
            //console.log("shuffle",order_arr,sec_pop[i]['arrayToRandom']);




            let cut_array = sec_pop[i]['arrayToRandom'].slice();
            for (const key in main_pop[i])
            {

                if(key !== sec_pop[i]['nodeToStay'])
                {
                    main_pop[i][key]["order"] = cut_array.splice(0, this.division);
                    //console.log(main_pop[i][key]["order"]);
                }

            }


        }

    }

    getProductsIdIntoResult()
    {

        for (const key in this.bestCombination)
        {

            if(key==="dist")
                break;


            let path2= this.bestCombination[key]["path"].slice(1,this.bestCombination[key]["path"].length-1)
            let result = {}


            for(let i=0;i<path2.length;i++)
            {
                result[path2[i]] = {};
            }

           // this.bestCombination[key]["orders_id"] ={};

            for(let i=0;i<this.bestCombination[key]["order"].length;i++)
            {
                let product_id = this.OrderProducts_Id_Map.get(this.bestCombination[key]["order"][i]);
                this.setProductsIdMap(path2,product_id,this.bestCombination[key]["order"][i],result);

                this.bestCombination[key]["products_id"] = this.bestCombination[key]["products_id"].concat(product_id);
                //this.bestCombination[key]["orders_id"][this.bestCombination[key]["order"][i]] = product_id;

            }

            this.bestCombination[key]["products_id_map"]=result
            //this.bestCombination[key]["path"]= JSON.stringify(this.bestCombination[key]["path"]);
        }

    }

    setProductsIdMap(path,products,order_id,result)
    {
        for(let i=0;i<products.length;i++)
        {
            const found = this.products_positions.filter(e => e.id == products[i]);

                let pos = found[0]['pivot']['desired_position'];

                if(result[pos].hasOwnProperty([products[i]]))
                {
                    result[pos][products[i]].push(order_id);
                }
                else
                {
                    result[pos][products[i]] =[];
                    result[pos][products[i]].push(order_id);
                }

        }
    }

    randomOrderColor()
    {
        for(const key in this.orderList)
        {
            let randomColor;
            {
                randomColor = Math.floor(Math.random() * 16777215).toString(16);
                this.orderColors[key]="#" + randomColor;
            }
        }
    }

    createLegend()
    {
        let block = document.getElementById("legend");

        let counter =0;

        for(const i in this.orderList)
        {

            let order = "Order  "+i;
            this.order_colors[i] = this.orderColors[i];
            block.innerHTML+= '<div class="badge text-wrap" style="width: 4rem; color: #1a1e21; background:' + this.orderColors[i] + '">' +order + ' </div>';
            block.innerHTML+= '<div class="badge bg" style="width: 1rem;"> <div>';
            counter ++;
        }

    }

    getOrderFinalResult()
    {
        let block = document.getElementById("finalCombination");
        block.innerHTML=""
        for (const key in this.bestCombination)
        {
            if(key !=="dist")
            {
                this.bestCombination[key].detailed_path = this.getDetailedNaivePathOrder(this.bestCombination[key].path)

                let cont = ' <div class="row" style="cursor: pointer"> <div class="col-xl-12 d-flex align-items-center justify-content-center id="joined'+key+'" "> '
                let inside ='';

                for (let i = 0; i < this.bestCombination[key]["order"].length; i++)
                {

                    let color = this.order_colors[this.bestCombination[key]["order"][i]];
                    let order = "Order " + this.bestCombination[key]["order"][i];
                    inside += '<div class="badge text-wrap" id="' + order + '" style="width: 4rem; color: #1a1e21; background:' + color + ';' + this.bestCombination[key]["order"][i] + '">' + order + ' </div>';
                }
                    inside += '<div class="badge bg" style="width: 5rem;"> </div> </div> </div>';

                block.innerHTML+= cont+inside
            }

        }
    }



}
