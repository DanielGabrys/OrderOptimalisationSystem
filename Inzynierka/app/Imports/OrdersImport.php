<?php

namespace App\Imports;

use App\Models\Grid;
use App\Models\Order;
use App\Models\OrderProducts;
use App\Models\Product;
use Illuminate\Support\Facades\Auth;
use Maatwebsite\Excel\Concerns\ToCollection;
use Maatwebsite\Excel\Concerns\WithHeadingRow;
use Illuminate\Support\Collection;


class OrdersImport implements ToCollection, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */

    public function collection(Collection $rows)
    {

        $grid =  Grid::where('isActive',1)->value("id");
        $existed_orders =[];

        foreach ($rows as $row)
        {

                $order_count = Order::where('grid_id',$grid)->where('order_id',$row['order_id']);
                $order_id = 0;

                if($order_count->count()==0)
                {

                    $order = new Order();
                    $order->order_id = $row['order_id'];
                    $order->primary = 0;
                    $order->grid_id = $grid;

                    $order->save();
                    $order_id = $order->id;
                    array_push($existed_orders,$order_id);
                }
                else
                {
                    $order_id = $order_count->first()->id;
                }

                OrderProducts::create([
                    'order_id' => $order_id,
                    'product_id' => Product::where('user_id',Auth::id())->where('product_id',$row['product_id'])->first()->id,
                    'amount' => $row['amount'],
                ]);
        }


    }
}
