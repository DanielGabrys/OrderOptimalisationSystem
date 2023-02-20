<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Product>
 */
class ProductFactory extends Factory
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
                'name' => $this->faker->name,
                'size_X' => $this->faker->randomFloat(1,2,20),
                'size_Y' => $this->faker->randomFloat(1,2,20),
                'size_Z' => $this->faker->randomFloat(1,2,20),
                'created_at' => $this->faker->dateTime(),
                'updated_at' => $this->faker->dateTime(),
        ];
    }
}
