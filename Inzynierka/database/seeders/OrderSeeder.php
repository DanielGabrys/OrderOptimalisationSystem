<?php

namespace Database\Seeders;

use App\Models\Grid;
use App\Models\Order;
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
        $grid = Grid::where('isActive',1)->value("id");
        Order::where('grid_id',$grid)->delete();

        Order::factory(50)->create();
    }
}
