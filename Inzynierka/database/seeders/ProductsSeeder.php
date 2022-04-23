<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Faker\Factory as Faker;

class ProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {

        $n=20;

        $faker = Faker::create('pl_PL');

        foreach(range(1,$n) as $index)
        {
            DB::table('product')->insert([
                'name' => $faker->unique()->word  ,
                'price' => $faker->randomFloat(1,2,1000),
                'size_X' => $faker->randomFloat(1,2,20),
                'size_Y' => $faker->randomFloat(1,2,20),
                'size_Z' => $faker->randomFloat(1,2,20),
                'description' => $faker->sentence,
                'amount' => $faker->numberBetween(1,10),
                'created_at' => $faker->dateTime(),
                'updated_at' => $faker->dateTime(),
            ]);
        }


    }
}
