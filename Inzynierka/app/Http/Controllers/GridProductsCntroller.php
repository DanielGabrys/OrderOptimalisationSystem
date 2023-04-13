<?php

namespace App\Http\Controllers;

use App\Models\Grid;
use App\Models\Grid_Product;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class GridProductsCntroller extends Controller
{

    public function __construct()
    {
        $this->middleware(['existAnyGrid']);
    }




    public function editGridCellProducts($id,$id2)
    {

        $grid=Grid::find($id);
        $products = $grid->products()->where('position','=',$id2)->get();
        $array=json_encode($grid->products()->get());

        // ids of products on the cell
        $products_id = $grid->products()->get()->pluck('id');

        // products which are not on list
        $accessable_products = Product::select('product.id','name')->whereNotIn('id', $products_id)->where('user_id',Auth::id())->get();

        $fields=$this->calculateDesiredPosition($id,$id2);
        $neibours = $this->neiboursDesiredPosition($id,$id2);
        $size=$this->neiboursDesiredSize($neibours);


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
        $products = $grid->products()->where("user_id",Auth::id())->orderByRaw('name ASC')->get();

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

}
