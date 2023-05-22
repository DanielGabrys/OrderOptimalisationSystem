<?php

namespace Database\Seeders;

use App\Models\Grid;
use App\Models\Product;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory(1)->
        has(Product::factory()->count(rand(5,20)),'products')->
            has(Grid::factory(3),'grids')
            ->create();
    }
}
