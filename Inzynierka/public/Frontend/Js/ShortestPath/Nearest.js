class Nearest extends RectangleDivision
{
    constructor()
    {
        super();
    }

    getFinalDistanceArr(r)
    {
        let dist = 0;
        for (let i = 0; i < r.length - 1; i++) {
            dist += this.getNodesDistance(r[i], r[i + 1]);
        }
        console.log(dist)
        return dist;
    }

    NearestNeightbour(path_matrix,final_path,entry)
    {

        this.path_matrix = JSON.parse(JSON.stringify(path_matrix))

        this.route= [entry].concat(final_path)
        let base = [this.route[0]];
        let left = this.route.slice(1, this.route.length)


        for (let i = 0; i < this.route.length; i++)
        {
            this.findNearest(base, left)
        }
        base.push(entry)
        this.final_path=base
        // this.doTwoOpt()

        this.getFinalDistanceArr(base)
        return base;
    }


    findNearest(base, left) {

        if (left.length === 0)
            return -1;

        let min = Infinity;
        let min_id = -1;
        let min_index = -1;

        for (let i = 0; i < base.length; i++)
        {
            for (let j = 0; j < left.length; j++)
            {
               // console.log(this.getNodesDistance(base[i], left[j]), min)
                if (this.getNodesDistance(base[i], left[j]) < min)
                {
                    min = this.getNodesDistance(base[i], left[j])
                    min_id = left[j]
                    min_index = j;
                }
            }
        }

        base.push(left[min_index]) // add new
        left.splice(min_index, 1) // remove from lefts
    }

}




