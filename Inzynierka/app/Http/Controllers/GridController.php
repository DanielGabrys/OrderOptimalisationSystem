<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
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

    public function SubmitGrid(Request $request)
    {
        if(!$this->ValidateGrid($request))
        {

        }

             dump($request->grid);
            //dump($request->grid_size);



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


}
