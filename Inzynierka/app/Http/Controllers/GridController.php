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
        $grids =Grid::all();
        return view('grid.showGrids',['grids'=>$grids]);
    }

    public function GridOverlook()
    {
        $grids =Grid::all();
        return view('grid.showGrids',['grids'=>$grids]);
    }

    public function deleteGrid($id)
    {
        $grid = Grid::find($id)->delete();
        return Redirect()->back()->with('success','Pomyślnie usunięto siatkę');
    }

    public function editGrid($id)
    {
        $grid = Grid::find($id);
        return view('grid.gridEdit',['grid'=>$grid]);

    }

    public function editGridCellProducts($id,$id2)
    {

        $grid=Grid::find($id);
        $products = $grid->grid()->get();

        $array=json_encode($products);

        //dd($products);
        //dd( $array);
        return view('grid.gridEditSingleCellProducts',['gridProducts'=> $products,'grid'=>$grid,'products_array'=>$array]);

    }

    public function editGridProducts($id)
    {

        $grid=Grid::find($id);
        $products = $grid->grid()->get();

        $array=json_encode($products);

        //dd($products);
        //dd( $array);
        return view('grid.gridEditProducts',['gridProducts'=> $products,'grid'=>$grid,'products_array'=>$array]);

    }

    public function deleteGridProduct($id)
    {
        $grid = Grid_Product::find($id)->delete();
        return Redirect()->back()->with('success','Pomyślnie usunięto siatkę');
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

    public function editGridSubmitProducts(Request $request,$id)
    {
        if($this->ValidateGrid($request))
        {
            $grid=grid::find($id);

            $this->createGridData($grid,$request);
            return Redirect()->route('showGrids')->with('success','Zaktualizowano pomyślnie siatkę');
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

}
