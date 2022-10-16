class Combinations extends Naive
{

    result={};
    main_counter =0;

    nextOrder(size)
    {
        let result = {};
        let arr =[];

        let counter=0;

        for(let i=0;i<size;i++)
        {
            arr[i]=i;
        }

        while(size>0)
        {

            let index = arr[0];

            if (index === arr.length-1)
            {
                console.log('finished');
                break;
            }

            this.main_counter ++;
            if(arr[0]<arr[arr.length-1])
            {
                counter++;
                result[counter] = [];

                for(let i=0;i<arr.length;i++)
                {
                    result[counter][i] = arr[i];
                }
            }


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

            //console.log(arr);

        }

        this.result=result;
        console.log(this.result);

    }

    setJSONMatrix()
    {
        let dictstring = JSON.stringify(this.result);
        document.getElementById("json_matrix").setAttribute('value',dictstring);
    }
}
