<?php

namespace Database\Seeders;

use App\Models\Grid;
use App\Models\Grid_Product;
use App\Models\Order;
use App\Models\OrderProducts;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class OrderProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {


        $n=300;

        $arr = array();

        $grid_id=(Grid::all()->where('isActive','=',1)->first())->id;

        foreach(range(1, $n) as $index)
        {


            $order_id = (Order::select("id")->orderBy(DB::raw('RAND()'))->first())->id;
            $product_id = Grid_Product::where("grid_id", $grid_id)->orderBy(DB::raw('RAND()'))->first()->product_id;

            $val = $product_id."-".$order_id;


           // var_dump($arr,$val);
            if (!in_array($val, $arr))
            {
                array_push($arr, $val);
                DB::table('order_product')->insert([

                    "order_id" => $order_id,
                    'product_id' => $product_id,
                    'amount' => rand(1, 6),
                    'created_at' => Carbon::now(),
                    'updated_at' => Carbon::now(),
                ]);
            }
        }



    }
}
