<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function showProducts()
    {
        $products = Product::paginate(6);
        return view('grid.addProducts',['products'=>$products]);
    }

    public function addProduct(Request $request)
    {
        if($this->ValidateProduct($request))
        {
            $Product= new Product();
            $Product->name = $request->name;
            $Product->size_X = $request->size_x;
            $Product->size_Y = $request->size_y;
            $Product->size_Z = $request->size_z;

            $Product->save();

            return Redirect()->route('showProducts')->with('success','Wczytano pomyślnie siatkę');
        }
    }

    public function deleteProduct($id)
    {
        $product= Product::find($id)->delete();
        return Redirect()->back()->with('success','Pomyślnie usunięto produkt');
    }


    public function ValidateProduct(Request $request)
    {

        $rules= [
            'name' => ['required','string','min:1',"max:255"],
            'size_x' => ['required','numeric','min:0.01'],
            'size_y' => ['required','numeric','min:0.01'],
            'size_z' => ['required','numeric','min:0.01'],


        ];

        $messages= [
            'required' => 'Field is required',

        ];

        return $request->validate($rules,$messages);
    }

}
