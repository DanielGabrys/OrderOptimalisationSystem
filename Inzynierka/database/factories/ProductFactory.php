<?php

namespace Database\Factories;

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
                'name' => $this->faker->name,
                'user_id' => User::select("id")->orderBy(DB::raw('RAND()'))->first()->id,
                'size_X' => $this->faker->randomFloat(1,2,20),
                'size_Y' => $this->faker->randomFloat(1,2,20),
                'size_Z' => $this->faker->randomFloat(1,2,20),
                'created_at' => $this->faker->dateTime(),
                'updated_at' => $this->faker->dateTime(),
        ];
    }
}
