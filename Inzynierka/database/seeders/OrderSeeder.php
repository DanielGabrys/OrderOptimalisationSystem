<?php

namespace Database\Seeders;

use App\Models\Grid;
use App\Models\Grid_Product;
use App\Models\Order;
use App\Models\OrderProducts;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Sequence;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        Order::getQuery()->delete();
        $user_id = User::select("id")->orderBy(DB::raw('RAND()'))->first()->id;
        //$grid_id = Grid::select("id")->where('user_id',$user_id)->where('isActive',true)->first()->id;
       // var_dump($user_id,$grid_id);

        $grid_id=12;

        Order::where('grid_id',$grid_id)->delete();

        Order::factory(100)
            ->state(new Sequence(
                ['grid_id' => $grid_id]
            ))


            ->has(OrderProducts::factory(rand(1,15))

                ->state(new Sequence(
                    fn (Sequence $sequence) =>
                    [
                        'product_id' =>  Grid_Product::
                        where("grid_id",$grid_id)
                            ->orderBy(DB::raw('RAND()'))
                            ->first()->product_id,
                    ]
                )))


            ->create();
    }
}
