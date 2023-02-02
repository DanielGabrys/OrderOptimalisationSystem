class FarthestNeighbor extends RectangleDivision
{

    getFarhestFinalDistanceArr(r)
    {
        let dist = 0;
        for (let i = 0; i < r.length - 1; i++) {
            dist += this.getNodesDistance(r[i], r[i + 1]);
        }
       // console.log(dist)
        return dist;
    }

    farthestInsertion(path_matrix,final_path,entry)
    {

        this.path_matrix = JSON.parse(JSON.stringify(path_matrix))

        this.route= [entry].concat(final_path,[entry])
       // console.log(this.route)
        let base = [this.route[0],this.route[0]];
        let left = this.route.slice(1, this.route.length - 1)

       // console.log(base,left,path_matrix)

        for (let i = 0; i < this.route.length - 2; i++)
        {
            //console.log(base,left)
            let node = this.findFarthest(base, left)
            this.putFarthest(base, node)
        }
        this.final_path=base

        this.getFarhestFinalDistanceArr(base)
        return base;
    }


    findFarthest(base, left) {

        if (left.length === 0)
            return 0;

        let max = -1;
        let max_id = -1;
        let max_index = -1;
        for (let i = 0; i < base.length-1; i++) {
            for (let j = 0; j < left.length; j++) {
                if (this.getNodesDistance(base[i], left[j]) > max) {
                    max = this.getNodesDistance(base[i], left[j])
                    max_id = left[j]
                    max_index = j;
                }
            }
        }

        // base.push(max_id)
        left.splice(max_index, 1)

        //console.log(base, left)
        return max_id;
    }

    putFarthest(base, node)
    {

        if (base.length === 1)
        {
            base.splice(1, 0, node)
        }
        else
        {

            let min = Infinity
            let min_index = -1;
            for (let i = 0; i < base.length - 1; i++) {
                let dist = this.getNodesDistance(base[i], node) + this.getNodesDistance(node, base[i + 1]) - this.getNodesDistance(base[i], base[i + 1])
                if (dist < min) {
                    min_index = i
                    min = dist
                }
            }
            base.splice(min_index + 1, 0, node)
        }
        //  console.log(base, node)


    }
}




