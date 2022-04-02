<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Ramsey\Uuid\Type\Integer;

class GridController extends Controller
{
    public function index()
    {
        return view('grid');
    }

    public function ValidateGrid(Request $request)
    {
        $grid_size=$request->grid_size;
        $max_size="max:".$grid_size;
        $integer_grid= array_map('intval', explode(',', $request->grid));


        $ok=1;
        $counter=1;

        $validatedData=$request->validate([
            'entry' => ['required','integer','min:1',$max_size],
            'grid' => ['required'],
            'grid_size_x' => ['required','integer','min:1'],
            'grid_size_y' => ['required','integer','min:1'],
            'grid_size' => ['required','integer','min:1'],
        ],
            [
                'required' => 'Pole jest wymagane',
                'min' => 'Numer z poza zakresu',
                'max' => 'Numer z poza zakresu',
                'grid.required' => 'Siatka jest pusta'
            ]);

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

        dump($ok);
        if($ok==0)
        {
            return Redirect()->back()->with('fail', 'Dodano pomyślnie markę');
        }

        return $validatedData;
    }

    public function SubmitGrid(Request $request)
    {
        if($this->ValidateGrid($request))
        {
            dump($request->grid);
            dump($request->grid_size);


            //return view('grid')->with('success' ,'Dodano pomyślnie markę');
        }


    }
}
