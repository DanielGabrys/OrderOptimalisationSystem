<?php

namespace Database\Factories;

use App\Models\Grid;
use App\Models\Grid_Product;
use App\Models\Order;
use App\Models\OrderProducts;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use voku\helper\ASCII;

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


                return [

                    'order_id' => function () {return Order::factory()->create()->id;},
                    'product_id' => Grid_Product::
                        orderBy(DB::raw('RAND()'))
                        ->first()->product_id,
                    'amount' => rand(1, 6),
                    'created_at' => $this->faker->dateTime(),
                    'updated_at' => $this->faker->dateTime(),
                ];

    }
}
