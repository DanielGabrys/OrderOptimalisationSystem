<?php

namespace App\Imports;

use App\Models\Grid;
use App\Models\Order;
use App\Models\OrderProducts;
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
        /*
        $grid =  Grid::where('isActive',1)->value("id");

        return new Order([
            'id' => $row['id'],
            'primary' => $row['primary'],
            'grid_id' => $grid
        ]);
        */

        $counter =0;
        $grid =  Grid::where('isActive',1)->value("id");
        $test =[];

        foreach ($rows as $row)
        {
            if($counter!=0)
            {
                $order_count = Order::where('user_id',Auth::id())->where('order_id',$row['order_id']);
                $order_id = 0;

                if($order_count->count()==0)
                {

                    $order = new Order();
                    $order->order_id = $row['order_id'];
                    $order->primary = 0;
                    $order->grid_id = $grid;
                    $order->user_id = Auth::id();

                    $order->save();
                    $order_id = $order->id;
                    array_push($test,$order_id);
                }
                else
                {
                    $order_id = $order_count->first()->id;

                }



                OrderProducts::create([
                    'order_id' => $order_id,
                    'product_id' => $row['product_id'],
                    'amount' => $row['amount'],
                ]);



            }
            $counter++;
        }

      //  dd($test);


    }
}
