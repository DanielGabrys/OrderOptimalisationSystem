class ImportCSV
{

    pivot(arr)
    {
        var mp = new Map();

        function setValue(a, path, val)
        {
            if (Object(val) !== val) { // primitive value
                var pathStr = path.join('.');
                var i = (mp.has(pathStr) ? mp : mp.set(pathStr, mp.size)).get(pathStr);
                a[i] = val;
            } else {
                for (var key in val) {
                    setValue(a, key == '0' ? path : path.concat(key), val[key]);
                }
            }
            return a;
        }

        var result = arr.map( obj => setValue([], [], obj) );
        return [[...mp.keys()], ...result];
    }

    toCsv(arr)
    {
        return arr.map( row =>
            row.map ( val => isNaN(val) ? JSON.stringify(val) : +val ).join(',')
        ).join('\n');
    }

}

// Sample data
var arr = [
    {"name": "1", "children": [{"name": "1.1", "children":"1.2"}]},
    {"id": "2", "thing": [{"name": "2.1", "children":"2.2"}]},
    {"name": "3", "stuff": [{"name": "3.1", "children":"3.2"}]},
];

// Conversion to 2D array and then to CSV:
console.log(toCsv(pivot(arr)));
