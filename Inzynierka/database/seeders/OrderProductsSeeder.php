<?php

namespace Database\Seeders;

use App\Models\OrderProducts;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class OrderProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        OrderProducts::query()->delete();
        OrderProducts::factory(150)->create();
    }
}
