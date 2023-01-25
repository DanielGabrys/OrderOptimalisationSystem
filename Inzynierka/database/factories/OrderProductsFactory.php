<?php

namespace Database\Factories;

use App\Models\Grid;
use App\Models\Grid_Product;
use App\Models\Order;
use App\Models\OrderProducts;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\OrderProducts>
 */
class OrderProductsFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $i=0;
        $grid_id=(Grid::all()->where('isActive','=',1)->first())->id;

            $i++;
            var_dump($i);
            $order_id = (Order::select("id")->orderBy(DB::raw('RAND()'))->first())->id;
            $product_id = Grid_Product::where("grid_id",$grid_id)->orderBy(DB::raw('RAND()'))->first()->product_id;

                return [

                    'order_id' => $order_id,
                    'product_id' => $product_id,
                    'amount' => rand(1, 6),
                    'created_at' => $this->faker->dateTime(),
                    'updated_at' => $this->faker->dateTime(),
                ];

    }
}
