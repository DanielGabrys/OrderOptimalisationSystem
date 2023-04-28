<?php

namespace App\Http\Controllers;

use App\Imports\Orders;
use App\Imports\OrdersImport;
use App\Imports\OrdersProductsImport;
use App\Imports\UsersImport;
use App\Models\Grid;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class OrderController extends Controller
{

    public function __construct()
    {
        $this->middleware('existAnyGrid');
         $this->middleware('isAnyGridActive');
    }

    public function showOrders()
    {

        $grid = Grid::where('isActive',1)->first();
        //dd($grid->id);
        $orders = $grid->orders()->paginate(5);
        return view('orders.addOrders',['orders'=>$orders,'grid'=>$grid->id]);
    }

    public function addOrder(Request $request)
    {
        ;
    }

    public function deleteOrder($id)
    {
        $order=Order ::find($id)->delete();
        return Redirect()->back()->with('success','Pomyślnie usunięto zamówienie');
    }

    public function uploadOrders(Request $request)
    {

        if($this->ValidateProduct($request))
        {

            DB::beginTransaction();

            try
            {


                $grid = Grid::where('isActive',1)->first();
                $grid->orders()->whereIn('grid_id', $grid)->delete();

                Excel::import(new OrdersImport(), $request->file('file')->store('temp'));

                DB::commit();
                return Redirect()->back()->with('success', 'Pomyślnie wczytano zamówienia');
            }
            catch (\Exception $e)
            {
               dd($e);
                DB::rollBack();
                return Redirect()->back()->with('failure', 'Upps coś poszło nie tak');
            }
        }
    }


    public function ValidateProduct(Request $request)
    {

        $rules= [
            'file' => ['required','mimes:csv'],
        ];

        $messages= [
            'mimes' => 'Wymagany format csv',
        ];

        return $request->validate($rules,$messages);
    }
}
