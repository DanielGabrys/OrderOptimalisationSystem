<?php

namespace Database\Seeders;

use App\Models\Grid;
use App\Models\Order;
use App\Models\OrderProducts;
use App\Models\User;
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

        $user_id = User::select("id")->orderBy(DB::raw('RAND()'))->first()->id;
        $grid_id = Grid::select("id")->where('user_id',$user_id)->orderBy(DB::raw('RAND()'))->first()->id;

        $grid = Grid::where('isActive',1)->value("id");
        Order::where('grid_id',$grid)->delete();

        Order::factory(50)->create();
        OrderProducts::factory(300)->make(['order_id']);
    }
}
