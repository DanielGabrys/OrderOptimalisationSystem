<?php

namespace App\Http\Controllers;

use App\Models\Containers;
use App\Models\Grid;
use App\Models\Grid_Product;
use App\Models\GridProducts;
use App\Models\Order;
use App\Models\OrderOptimisationResults;
use App\Models\OrderProducts;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\Rule;
use Ramsey\Uuid\Type\Integer;

class GridController extends Controller
{

    public function __construct()
    {
        $this->middleware('existAnyGrid',['except' =>
            ['index','createGridSubmit','addBFSPathsSubmit','addBFSPathsGet','editBFSPathsSubmit']
        ]);
        $this->middleware('isAnyGridActive',['except' =>
            ['index','createGridSubmit','showGrids','activateGrid','deleteGrid','addBFSPathsSubmit','addBFSPathsGet','editBFSPathsSubmit']]);
    }


    public function index()
    {
        return view('grid.addGrid');
    }

    public function showGrids()
    {
        $grids_products=Grid::with('products')->get();
        $grids = Grid::where("user_id",Auth::id())->get();

        $grids_array=json_encode($grids_products);
        //dd($grids_array);

        return view('grid.showGrids',['grids'=>$grids,'grids_array'=>$grids_array]);
    }

    public function activateGrid($id)
    {
        Grid::query()->update(['isActive'=>0]);
        Grid::find($id)->update(['isActive'=>1]);
        return Redirect()->back()->with('success','Aktywowano siatkę');
    }


    public function deleteGrid($id)
    {
        $grid = Grid::find($id)->delete();
        return Redirect()->back()->with('success','Pomyślnie usunięto siatkę');
    }

    public function editGrid($id)
    {
        $grid = Grid::find($id);
        $products = $grid->products()->orderByRaw('position ASC')->get();

        $array=json_encode($products);
        return view('grid.gridEdit',['gridProducts'=> $products,'grid'=>$grid,'products_array'=>$array]);

    }

    public function ValidateGrid(Request $request)
    {
        $grid_size=$request->grid_size;
        $sizeX= $request->grid_size_x;
        $sizeY= $request->grid_size_y;

        $maxTotalSize = $sizeX*$sizeY;
        $max_size="max:".$grid_size;

        $rules= [
              'entry' => ['required','integer','min:1',$max_size],
                'grid' => ['required'],
                'grid_size_x' => ['required','integer','min:1','max:50'],
                'grid_size_y' => ['required','integer','min:1','max:50'],
                'grid_size' => ['required','integer','min:1'],
                'entry_ok' => ['required','integer','min:1','max:1'],

        ];

        $messages= [
                'required' => 'Pole jest wymagane',
                'min' => 'Numer z poza zakresu',
                'max' => 'Numer spoza zakresu',
                'grid.required' => 'Siatka jest pusta',
                'entry_ok.*' => 'Wejscie w danym miejscu jest niemożliwe'
            ];

        return $request->validate($rules,$messages);
    }

    public function createGridData($grid,$request)
    {
        $shelfts=$this->gridToArray($request);


        $grid->width = $request->grid_size_y;
        $grid->height = $request->grid_size_x;
        $grid->entry = $request->entry;
        $grid->shelfs = $shelfts;
        $grid->user_id = Auth::id();

        //$grid->save();
    }

    public function createGridSubmit(Request $request)
    {

        if($this->ValidateGrid($request))
        {
            $grid= new Grid;
            $this->createGridData($grid,$request);

            $request->session()->put('grid', $grid);
          //  return view('grid.BFS_paths',['grid'=>$grid]);
            return Redirect()->route('gridSubmitGet');


        }

    }

    public function addBFSPathsGet(Request $request)
    {
        if(empty($request->session()->get('grid')))
        {
            return Redirect()->route('addGrid');
        }
        else
        {
            $grid = $request->session()->get('grid');
            return view('grid.BFS_paths',['grid'=>$grid]);


        }
    }


    public function addBFSPathsSubmit(Request $request)
    {
            $rules =
                [
                    'name' => ['required', 'string', 'min:3', 'max:255',
                        Rule::unique("grid")->where(function ($query) use ($request) {
                            $query->where('user_id', Auth::id())->where('name', $request->name);
                        })
                    ],
                ];

        $messages= [
            'required' => 'Pole jest wymagane',
            'min' => 'Nazwa jest za krótka',
            'max' => 'Nazwa jest za długa',
            'string' => 'Niewłaściwa nazwa',
            'unique' => 'Nazwa już istnieje'
        ];



        $request->validate($rules,$messages);


        $grid = $request->session()->get('grid');
        $grid->nodes_shortest_paths = $request->paths_to_save;
        $grid->name = $request->name;
        $grid->nodesPathsIds = $request->nodes_array;
        $grid->save();

        $request->session()->forget('grid');

        return Redirect()->route('showGrids')->with('success','Pomyślnie');
    }

    public function editBFSPathsSubmit(Request $request)
    {

        $edited = $request->session()->get('grid')->id;
        $existed = Grid::find($edited)->name;
        $rules =
            [
                'name' => ['required', 'string', 'min:3', 'max:255',
                    Rule::unique("grid")->where(function ($query) use ($request,$existed) {
                        $query->where('user_id', Auth::id())->where('name', $request->name)->where('name','!=',$existed);
                    })
                ],
            ];

        $messages= [
            'required' => 'Pole jest wymagane',
            'min' => 'Nazwa jest za krótka',
            'max' => 'Nazwa jest za długa',
            'string' => 'Niewłaściwa nazwa',
            'unique' => 'Nazwa już istnieje'
        ];



        $request->validate($rules,$messages);


        $grid = $request->session()->get('grid');
        $grid->nodes_shortest_paths = $request->paths_to_save;
        $grid->name = $request->name;
        $grid->nodesPathsIds = $request->nodes_array;
        $grid->save();

        $request->session()->forget('grid');

        return Redirect()->route('showGrids')->with('success','Pomyślnie');

    }


    public function editGridSubmit(Request $request,$id)
    {


        if($this->ValidateGrid($request))
        {
            $grid=grid::find($id);
            $products = $grid->products()->orderByRaw('position ASC')->get();
            $this->createGridData($grid,$request);
            $request->session()->put('grid', $grid);
            return Redirect()->route('gridSubmitGet');

        }

    }

    public function customValidation(Request $request)
    {
        $ok=1;
        $counter=1;

        $integer_grid= array_map('intval', explode(',', $request->grid));

        if (in_array((Int) $request->entry, $integer_grid))
        {
            $ok=0;
        }

        for($i=0;$i<(Int) $request->grid_size_x;$i++)
        {
            for ($j = 0; $j <(Int) $request->grid_size_y; $j++)
            {
                if($i>0 && $i<(Int) ($request->grid_size_x)-1 && $j>0 && $j<(Int) ($request->grid_size_y)-1 )
                {

                    if((Int) $request->entry==$counter) {
                        $ok = 0;
                    }
                }
                $counter++;
            }
        }

       return $ok;

    }

    public function gridToArray(Request $request)
    {
        $integer_grid = array_map('intval', explode(',', $request->grid));
        for ($i = 0; $i < count($integer_grid);$i++)
        {
            $integer_grid[$i]-=1;
        }
        //var_dump($integer_grid);

        $grid_array=array();
        //set zeros
        for ($i = 0; $i < $request->grid_size_x;$i++)
        {
            for ($j = 0; $j < $request->grid_size_y;$j++)
            {
                $grid_array[$i][$j]=0;
            }
        }

            for ($i = 0; $i < count($integer_grid);$i++)
            {

                    $y = intval($integer_grid[$i]) / intval($request->grid_size_y) ;
                    $x = intval($integer_grid[$i]) % intval($request->grid_size_y);
                    $grid_array[$y][$x] = -1;

            }

            $y = (intval($request->entry)-1 ) / $request->grid_size_y ;
            $x = (intval($request->entry)-1 )  % $request->grid_size_y;
            $grid_array[$y][$x] = 1;

        //dd($grid_array);

            return json_encode($grid_array);







    }




   //dikstra part

    public function addBFSPaths($grid)
    {
        return view('grid.BFS_paths',['grid'=>$grid]);
    }

    public function Paths($id)
    {

        $grid=grid::find($id);
        $products = $grid->products()->orderByRaw('position ASC')->get();

        $array=json_encode($products);

        return view('dikstra.dikstra',['gridProducts'=> $products,'grid'=>$grid,'products_array'=>$array]);

    }

    public function uploadNodesPaths(Request $request,$id)
    {
        $grid= Grid::find($id);
        $grid->update(['nodes_shortest_paths'=>$request->paths_to_save]);

         return Redirect()->back()->with('success','Pomyślnie');
    }

    public function calculateNaiveSubmit(Request $request)
    {

        $grid=Grid::all()->where('isActive','=',1)->where('user_id',Auth::id())->first();
        $matrix = $request->json_matrix;
        $number = $request->number;

        $name = "permutation_".$number.'.json';
        $path = "naive_combinations/";



        Storage::disk('public')->put($path.$name, $matrix);
        return Redirect()->back()->with('success','Pomyślnie');

    }


    //rectangle division
    public function rectangleDivision()
    {

        return $this->getGridDataForPath('shortestPath.rectangle_division');

    }

    public function geneticAlgo()
    {

        return $this->getGridDataForPath('shortestPath.geneticAlgo');

    }

    public function orderOptimalisation()
    {
        return $this->getGridDataForPath('OrderOptimalisation.OrderOptimalisation');

    }

    public function orderOptimalisationContainers()
    {
        return $this->getGridDataForPath('OrderOptimalisation.OrderOptimalisationContainers');
    }

    public function orderOptResultsSubmit(Request $request)
    {
        $grid=Grid::all()->where('isActive','=',1)->where('user_id',Auth::id())->first();
        $result2 = json_decode( $request->results,true);

        OrderOptimisationResults::where('grid_id',$grid->id)->delete();

        foreach($result2 as $i => $collection)
        {
            $orderOpt = new OrderOptimisationResults();
            if($i=="dist")
                break;

            $orderOpt -> batch_id = $i+1;
            $orderOpt -> grid_id = $grid->id;
            $orderOpt -> orders = json_encode($result2[$i]["order"]);
            $orderOpt -> products_id = json_encode($result2[$i]["products_id_map"]);
            $orderOpt -> distance = $result2[$i]["distance"];
            $orderOpt -> path = json_encode($result2[$i]["path"]);
            $orderOpt -> detailed_path = json_encode($result2[$i]["detailed_path"]);
            $orderOpt -> containers = json_encode($result2[$i]["containers"]);

            $orderOpt->save();
        }

        return Redirect()->route('orderOptResult')->with('success','Dodano pomyślnie produkt do pola siatki');
    }


    public function orderOptResults()
    {
        $grid=Grid::where('isActive','=',1)->where('user_id',Auth::id())->first();

        $result = OrderOptimisationResults::where('grid_id','=',$grid->id)->paginate(5);
        $result2 =json_encode($result);
        $orders=Order::with('products')->where('user_id',Auth::id())->get();


        return view('OrderOptimalisation.OrderOptResults',["products"=>$result, "result"=>$result2,'orders'=>$orders]);
    }


    public function getGridDataForPath($view)
    {


        $grid=Grid::all()->where('isActive','=',1)->where('user_id',Auth::id())->first();
        $active = $grid->id;
        $orders=Order::with('products')->where('grid_id',$grid->id)->get();

        /*
        //$orders_sizes = OrderProducts::select("order_id",DB::raw("sum(amount) as capability"))->groupBy(DB::raw("order_id"))->orderBy('capability')->get();
        $orders_sizes = Order::where('grid_id',$grid->id)->with(["orderProducts" => function ($query)
            {
                $query->select('order_id',DB::raw("sum(amount) as capability"));
                $query->groupBy('order_id');
            }])->get();

       */

        $orders_sizes = DB::table('order_product')
            ->select('order.order_id', DB::raw('sum(order_product.amount) as capability'))
            ->join('order', 'order.id', '=', 'order_product.order_id')
            ->where('grid_id',$grid->id)
            ->groupBy('order.order_id')->get();

        //dd($orders_sizes);
        /*
         * SELECT order_product.order_id, sum(order_product.amount) as SUM from orders inner join order_product on order_product.order_id = orders.id where orders.grid_id =22 group by order_product.order_id;
         */


        $products = $grid->products()->orderByRaw('position ASC')->get();

        $array=json_encode($products);
        $path_matrix = $grid->nodes_shortest_paths;
        $paths = json_decode($path_matrix, true);
        $nodes = json_decode($grid->nodesPathsIds, true);
        $path_matrix = $this->normalizePaths($paths,$nodes);


        return view($view,[
                'gridProducts'=> $products,
                'grid'=>$grid,
                'products_array'=>$array,
                'path_matrix'=>$path_matrix,
                'orders' =>$orders,
                'order_sizes' =>$orders_sizes,
            ]
        );

    }

    public function normalizePaths($paths,$base)
    {
        $array = array();


        $start = 1;
        foreach($paths as $path)
        {
             //dd(count($paths)-1);
            $size = count($paths) ?? 0;
            for($i=0;$i<$size; $i++)
            {

                if(count($base)>$i+$start)
                {
                    $key = $base[$start - 1];
                    $key .= "->" . $base[$i + $start];
                     $array+= array($key=>$path[$i]);
                }
                else
                   break;


            }
            $start++;
           // var_dump($array);
        }

       return json_encode($array);


    }

    public function getUserProducts($grid)
    {
       return $grid->products()->where('user_id',Auth::id())->orderByRaw('position ASC')->get();

    }



}
