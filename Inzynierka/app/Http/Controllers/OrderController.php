<?php

namespace App\Http\Controllers;

use App\Imports\Orders;
use App\Imports\OrdersImport;
use App\Imports\OrdersProductsImport;
use App\Imports\UsersImport;
use App\Models\Order;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Maatwebsite\Excel\Facades\Excel;

class OrderController extends Controller
{
    public function showOrders()
    {
        $orders = Order::paginate(6);
        return view('orders.addOrders',['orders'=>$orders]);
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

                Excel::import(new OrdersImport(), $request->file('file')->store('temp'));
                Excel::import(new OrdersProductsImport(), $request->file('file2')->store('temp'));

                DB::commit();
                return Redirect()->back()->with('success', 'Pomyślnie wczytano zamówienia');
            }
            catch (\Exception $e)
            {
               // var_dump($e);
                DB::rollBack();
                return Redirect()->back()->with('failure', 'Upps coś poszło nie tak');
            }
        }
    }

    public function ValidateProduct(Request $request)
    {

        $rules= [
            'file' => ['required','mimes:csv'],
            'file2' => ['required','mimes:csv']
        ];

        $messages= [
            'mimes' => 'File must be csv file',
        ];

        return $request->validate($rules,$messages);
    }
}
