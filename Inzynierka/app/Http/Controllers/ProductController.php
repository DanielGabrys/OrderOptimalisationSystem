<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\Rule;

class ProductController extends Controller
{

    public function showProducts()
    {
        $products = Product::where('user_id',Auth::id())->orderByRaw('created_at ASC') -> paginate(6);
        return view('products.addProducts',['products'=>$products]);
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
            $Product->user_id = Auth::id();
            $Product->product_id = $request->product_id;

            $Product->save();

            return Redirect()->route('showProducts')->with('success','Wczytano pomyślnie siatkę');
        }
    }

    public function deleteProduct($id)
    {
        $product =Product:: findOrFail($id);

        if ($product)
        {
            $product->delete();

            return Redirect()->back()->with('success','Pomyślnie usunięto produkt');
        }

        abort(404, 'Nie znaleziono');


    }


    public function ValidateProduct(Request $request)
    {

        $rules= [
            'name' => ['required','string','min:1',"max:255"],
            'size_x' => ['required','numeric','min:0.01'],
            'size_y' => ['required','numeric','min:0.01'],
            'size_z' => ['required','numeric','min:0.01'],
            'product_id' => ['required','numeric',
                Rule::unique("product")->where(function($query) use ($request)
                {
                    $query->where('user_id',Auth::id())->where('product_id',$request->product_id);
                })
            ],


        ];

        $messages= [
            'required' => 'Field is required',

        ];

        return $request->validate($rules,$messages);
    }

}
