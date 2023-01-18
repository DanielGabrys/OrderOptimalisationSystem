class FarthestNeighbor extends RectangleDivision
{

    adjency_matrix = []

    constructor(route, path_matrix)
    {
        super();
        this.route = route;
        this.path_matrix = path_matrix

        console.log(this.route)

        for (let i = 0; i < this.route.length - 1; i++) {
            this.adjency_matrix[i] = new Array(this.route.length - 1).fill(0);
        }

        for (let i = 0; i < this.route.length - 1; i++) {
            for (let j = i + 1; j < this.route.length - 1; j++) {
                this.adjency_matrix[i][j] = this.getNodesDistance(route[i], route[j])
                this.adjency_matrix[j][i] = this.adjency_matrix[i][j]
            }
        }

        console.log(this.adjency_matrix)
        this.bestroute = this.route

        this.farthestInsertion();
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

    farthestInsertion()
    {
        this.divideGrid();
        let base = [this.route[0],this.route[0]];
        let left = this.route.slice(1, this.route.length - 1)

        //console.log(base,left)

        for (let i = 0; i < this.route.length - 2; i++)
        {
            let node = this.findFarthest(base, left)
            this.putFarthest(base, node)
        }
        this.final_path=base
        this.doTwoOpt()

        this.getFinalDistanceArr(base)
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




