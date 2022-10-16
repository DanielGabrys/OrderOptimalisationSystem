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

        $n=1000;

        $faker = Faker::create('pl_PL');
        $counter=1;

        foreach(range(1,$n) as $index)
        {
            $name ="P".$counter;
            DB::table('products')->insert([
                'name' => $name,
                'price' => $faker->randomFloat(1,2,1000),
                'size_X' => $faker->randomFloat(1,2,20),
                'size_Y' => $faker->randomFloat(1,2,20),
                'size_Z' => $faker->randomFloat(1,2,20),
                'description' => $faker->sentence,
                'amount' => $faker->numberBetween(1,10),
                'created_at' => $faker->dateTime(),
                'updated_at' => $faker->dateTime(),
            ]);

            $counter++;
        }


    }
}
