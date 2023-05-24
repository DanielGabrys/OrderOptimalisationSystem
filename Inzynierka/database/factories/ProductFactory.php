<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

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
                'name' => $this->faker->word(),
                'user_id' => function () {return User::factory()->create()->id;},
                'product_id' => $this->faker->unique()->numberBetween(1,200),
                'size_X' => $this->faker->randomFloat(1,2,20),
                'size_Y' => $this->faker->randomFloat(1,2,20),
                'size_Z' => $this->faker->randomFloat(1,2,20),
                'created_at' => $this->faker->dateTime(),
                'updated_at' => $this->faker->dateTime(),
        ];
    }


}
