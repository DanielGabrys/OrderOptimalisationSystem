<?php

namespace Database\Seeders;

use App\Models\Grid;
use App\Models\Grid_Product;
use App\Models\Order;
use App\Models\OrderProducts;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Factories\Factory;
use Carbon\Carbon;

class OrderProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        OrderProducts::factory(800)->create();



    }
}
