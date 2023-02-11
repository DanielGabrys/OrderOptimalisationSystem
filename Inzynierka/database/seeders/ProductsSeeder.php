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

        $n=5000;

        $faker = Faker::create('pl_PL');
        $counter=1;

        foreach(range(1,$n) as $index)
        {
            $name ="P".$counter;
            DB::table('products')->insert([
                'name' => $name,
                'size_X' => $faker->randomFloat(1,2,20),
                'size_Y' => $faker->randomFloat(1,2,20),
                'size_Z' => $faker->randomFloat(1,2,20),
                'created_at' => $faker->dateTime(),
                'updated_at' => $faker->dateTime(),
            ]);

            $counter++;
        }


    }
}
