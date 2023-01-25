<?php

namespace Database\Factories;

use App\Models\Grid;
use Illuminate\Database\Eloquent\Factories\Factory;
use Faker\Factory as Faker;

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
                'primary' => $this->faker->boolean(),
                'created_at' => $this->faker->dateTime(),
                'updated_at' => $this->faker->dateTime(),
                'grid_id' => Grid::where('isActive',1)->value("id")

            ];
    }
}
