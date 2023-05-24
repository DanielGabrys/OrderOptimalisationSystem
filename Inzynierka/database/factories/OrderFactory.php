<?php

namespace Database\Factories;

use App\Models\Grid;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Order>
 */
class OrderFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {


        return
            [
                'order_id' => $this->faker->numberBetween(1,1000),
                'primary' => $this->faker->boolean(),
                'created_at' => $this->faker->dateTime(),
                'updated_at' => $this->faker->dateTime(),

            ];
    }
}
