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

        $user_id = User::select("id")->orderBy(DB::raw('RAND()'))->first()->id;
        $grid_id = Grid::where('isActive',1)->where('user_id',$user_id)->first();

        var_dump("elo");

        if($grid_id == null)
        {

            return [];
        }

        return
            [
                'primary' => $this->faker->boolean(),
                'created_at' => $this->faker->dateTime(),
                'updated_at' => $this->faker->dateTime(),
                'grid_id' => $grid_id->id,
                'user_id' => $user_id,
                'order_id' => $this->faker->numberBetween(1,1000)


            ];
    }
}
