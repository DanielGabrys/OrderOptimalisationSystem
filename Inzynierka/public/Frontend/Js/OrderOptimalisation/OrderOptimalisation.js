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
    orderColors = [];

    fitnessMatrix=[];

    setGeneticData(pop,iter)
    {
        this.orderPopulationSize=pop;
        this.orderIteration =iter;
    }

    createOrderPopulation(divider)
    {
        this.division=divider;
        let orders=[];
        this.divisionNr = Math.ceil(this.orders_number/divider);

        for(let i=0;i<this.orders_number;i++)
        {
            orders[i]=i;
        }

        for(let i=0;i<this.orderPopulationSize;i++)
        {
            let size =Math.ceil(this.orders_number/divider);
            this.orderPopulation[i] = {};
            this.orderPopulationSummary[i] = {};

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
                     console.log("rand",randomized);

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

                    this.randomOrderColor();

                }

                return orders
        }


    orderFitness(sequence)
    {

        let arr =[];
        let duplicats=0;
        for (let i=0;i<sequence["order"].length;i++)
        {

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
        console.log(this.order,arr,duplicats,fitness);
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
        console.log("nodes",nodes);

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
            console.log("colorMix",colorMix)
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

        console.log("oh",this.bestOrderVariationDistance,dist,iter,main_pop);
        sec_pop["TotalDistance"] = dist;
        if(dist<this.bestOrderVariationDistance)
        {
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
            console.log("shuffle",order_arr,sec_pop[i]['arrayToRandom']);




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

    randomOrderColor()
    {
        let randomColor;
        //while(!this.orderColors.includes(randomColor))
        {
            randomColor = Math.floor(Math.random() * 16777215).toString(16);
            this.orderColors.push("#" + randomColor);
        }
    }

    createLegend()
    {
        let block = document.getElementById("legend");

        for(let i=0;i<this.orderColors.length;i++)
        {
            let order = "Order  "+i;
            block.innerHTML+= '<div class="badge text-wrap" style="width: 4rem; color: #1a1e21; background:' + this.orderColors[i] + '">' +order + ' </div>';
            block.innerHTML+= '<div class="badge bg" style="width: 1rem;"> <div>';
        }

    }

    getOrderFinalResult()
    {
        let block = document.getElementById("finalCombination");
        for (const key in this.bestCombination)
        {
            if(key !=="dist")
            {

                for (let i = 0; i < this.bestCombination[key]["order"].length; i++)
                {
                    let color = this.orderColors[this.bestCombination[key]["order"][i]];
                    let order = "Order " + this.bestCombination[key]["order"][i];
                    block.innerHTML += '<div class="badge text-wrap" id="' + order + '" style="width: 4rem; color: #1a1e21; background:' + color + ';' + this.bestCombination[key]["order"][i] + '">' + order + ' </div>';
                }
                block.innerHTML += '<div class="badge bg" style="width: 1rem;"> <div>';
            }
            else
            {
                let dist = this.bestCombination[key];
                block.innerHTML += '<div class="badge bg" style="width: 2rem;"> <div>';
                block.innerHTML += '<div class="badge text-wrap" style="width: 5rem; color: #1a1e21; background: gold;">' + dist + ' </div>';

            }
        }
    }



}
