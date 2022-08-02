<?php

namespace App\Http\Controllers;

use App\Models\Grid;
use App\Models\Grid_Product;
use App\Models\GridProducts;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Ramsey\Uuid\Type\Integer;

class GridController extends Controller
{
    public function index()
    {
        return view('grid.grid');
    }

    public function showGrids()
    {
        $grids_products=Grid::with('products')->get();
        $grids = Grid::all();

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

    public function editGridCellProducts($id,$id2)
    {

        $grid=Grid::find($id);
        $products = $grid->products()-> where('position','=',$id2)->get();
        $array=json_encode($grid->products()->get());

        // ids of products on the cell
        $products_id = $grid->products()->get()->pluck('id');

        // products which are not on list
        $accessable_products = Product::select('products.id','name')->whereNotIn('id', $products_id)->get();

        $fields=$this->calculateDesiredPosition($id,$id2);
        $neibours = $this->neiboursDesiredPosition($id,$id2);
        $size=$this->neiboursDesiredSize($neibours);

        /*
        Select id from products where id not in (select grid_product.product_id from `products` inner join `grid_product` on `products`.`id` = `grid_product`.`product_id` where `grid_product`.`grid_id` = 15);
        */

        return view('grid.gridEditSingleCellProducts',['CellProducts'=> $products,
            'grid'=>$grid,
            'accessable_products'=>$accessable_products,
            'cell_id'=>$id2,
            'products_array'=>$array,
            'neibours'=>$neibours,
            'fields'=>json_encode($fields),
            'field_size'=>$size]);

    }

    public function editGridProducts($id)
    {

        $grid=Grid::find($id);
        $products = $grid->products()->orderByRaw('position ASC')->get();

        $array=json_encode($products);

        //dd($products);
        //dd( $array);
        return view('grid.gridEditProducts',['gridProducts'=> $products,'grid'=>$grid,'products_array'=>$array]);

    }

    public function deleteGridProduct($id)
    {
        $grid_product = Grid_Product::find($id)->delete();
        return Redirect()->back()->with('success','Pomyślnie usunięto product z komórki siatki');
    }

    public function ValidateGrid(Request $request)
    {
        $grid_size=$request->grid_size;
        $max_size="max:".$grid_size;

        $rules= [
              'entry' => ['required','integer','min:1',$max_size],
                'grid' => ['required'],
                'grid_size_x' => ['required','integer','min:1'],
                'grid_size_y' => ['required','integer','min:1'],
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

        $grid->save();
    }

    public function createGridSubmit(Request $request)
    {

        if($this->ValidateGrid($request))
        {
            $grid= new Grid;
            $this->createGridData($grid,$request);
            return Redirect()->route('showGrids')->with('success','Wczytano pomyślnie siatkę');
        }


    }

    public function editGridSubmit(Request $request,$id)
    {
        if($this->ValidateGrid($request))
        {
            $grid=grid::find($id);

            $this->createGridData($grid,$request);
            return Redirect()->route('showGrids')->with('success','Zaktualizowano pomyślnie siatkę');
        }
    }

    public function addGridCellProduct(Request $request)
    {
           // $product=Product::find($product_id);

        $rules= [
            'product_id' => ['required','integer'],
            'desired_position' => ['required','integer'],
        ];

        $messages= [
            'required' => 'Pole jest wymagane',
            'desired_position.required' => 'Nie można dodać produktu, produkt odizolowany'
        ];

        $request->validate($rules,$messages);

            $grid_product = new Grid_Product;
            $grid_product->grid_id= $request->grid_id;
            $grid_product->product_id= $request->product_id;
            $grid_product->position= $request->cell_id;
            $grid_product->desired_position= $request->desired_position;

            $grid_product->save();

            //return Redirect()->back()->with('success','Dodano pomyślnie produkt do pola siatki');
             return Redirect()->route('editGridProducts',$grid_product->grid_id)->with('success','Dodano pomyślnie produkt do pola siatki');
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
        var_dump($integer_grid);

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

    public function  calculateDesiredPosition($grid_id,$cell_id)
    {
        $grid=grid::find($grid_id);
        $grid_X= $grid->height;
        $grid_Y= $grid->width;
        $cell= $cell_id - 1;

        $shelfs=($grid->shelfs);
        $shelfs=substr($shelfs,2);
        $shelfs=substr($shelfs,0,-2);


        $arr = array_map(function($iter){ return explode(',',$iter);},explode('],[',$shelfs));
        //dd($arr);

        $x=intval($cell/$grid_Y);
        $y=$cell%$grid_Y;

        $field=array();

        //moving left condition
        if($y>0 && $arr[($x)][$y-1]==0)
        {
            array_push($field, $cell);
        }

        //moving right condition
        if($y<$grid_Y-1 && $arr[($x)][$y+1]==0)
        {
            array_push($field, $cell+2);
        }

        //moving down condition
        if($x<$grid_X-1 && $arr[$x+1][$y]==0)
        {
            array_push($field, $cell+$grid_Y+1);
        }

        //moving up condition
        if($x>0 && $arr[$x-1][$y]==0)
        {
            array_push($field, $cell-$grid_Y+1);
        }

        //dd($field);
        return $field;

    }

    public function  neiboursDesiredPosition($grid_id,$cell_id)
    {
        $grid=grid::find($grid_id);
        $grid_X= $grid->height;
        $grid_Y= $grid->width;
        $cell= $cell_id - 1;

        $shelfs=($grid->shelfs);
        $shelfs=substr($shelfs,2);
        $shelfs=substr($shelfs,0,-2);


        $arr = array_map(function($iter){ return explode(',',$iter);},explode('],[',$shelfs));
        //dd($arr);

        $x=intval($cell/$grid_Y);
        $y=$cell%$grid_Y;

        $left=false;
        $right=false;
        $up=false;
        $down=false;

        $field=array();

        array_push($field, $cell+1);

        //moving left condition
        if($y>0)
        {
            array_push($field, $cell);
            $left=true;
        }

        //moving right condition
        if($y<$grid_Y-1)
        {
            array_push($field, $cell+2);
            $right=true;
        }

        //moving down condition
        if($x<$grid_X-1)
        {
            array_push($field, $cell+$grid_Y+1);
            $down=true;
        }

        //moving up condition
        if($x>0)
        {
            array_push($field, $cell-$grid_Y+1);
            $up=true;
        }

        if($left && $up)
        {
            array_push($field, $cell-$grid_Y);
        }

        if($left && $down)
        {
            array_push($field, $cell+$grid_Y);
        }

        if($right && $down)
        {
            array_push($field, $cell+$grid_Y+2);
        }

        if($right && $up)
        {
            array_push($field, $cell-$grid_Y+2);
        }

        sort($field);
        //dd($field);


        return $field;

    }

    public function neiboursDesiredSize($array)
    {
        $size=array();
        $y_counter=0;
        $x_counter=1;
        for($i=1;$i<count($array)?? 0; $i++)
        {
            $y_counter++;
            if($array[$i]-$array[$i-1]!=1)
            {
                if(empty($size))
                {
                    array_push($size, $y_counter);
                }
                $x_counter++;
            }
        }

        array_push($size, $x_counter);

       // dd($size);

        return $size;
    }


   //dikstra part

    public function calculateDikstra()
    {

        $grid=Grid::all()->where('isActive','=',1)->first();
        $products = $grid->products()->orderByRaw('position ASC')->get();

        $array=json_encode($products);

        //dd($products);
        //dd( $array);
        return view('dikstra.dikstra',['gridProducts'=> $products,'grid'=>$grid,'products_array'=>$array]);

    }


   //native algorithm

    public function nativeAlgorithm()
    {

    }


}
