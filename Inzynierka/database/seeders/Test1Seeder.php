<?php

namespace Database\Seeders;

use App\Models\Grid;
use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class Test1Seeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
       $id= $this->createGrid();
       $this->activateGrid($id);
       Product::factory(1000)->create();

    }

    public function createGrid()
    {
        $grid = new Grid();
        $grid->width = 16;
        $grid->height = 14;
        $grid->entry = 97;
        $grid->shelfs = '[[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1],[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],[-1,0,-1,-1,0,-1,-1,0,-1,-1,0,-1,-1,-1,0,-1],[-1,0,-1,-1,0,-1,-1,0,-1,-1,0,-1,-1,-1,0,-1],[-1,0,-1,-1,0,-1,-1,0,-1,-1,0,0,0,0,0,-1],[-1,0,-1,-1,0,-1,-1,0,-1,-1,0,0,-1,-1,0,-1],[1,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,-1],[0,0,0,0,0,0,0,0,0,0,0,0,-1,-1,0,-1],[-1,0,-1,-1,0,-1,-1,0,-1,-1,0,0,-1,-1,0,-1],[-1,0,-1,-1,0,-1,-1,0,-1,-1,0,0,0,0,0,-1],[-1,0,-1,-1,0,-1,-1,0,-1,-1,0,-1,-1,-1,0,-1],[-1,0,-1,-1,0,-1,-1,0,-1,-1,0,-1,-1,-1,0,-1],[-1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,-1],[-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1,-1]]';
        $grid->save();

        return $grid->id;
    }

    public function activateGrid($id)
    {
        Grid::query()->update(['isActive'=>0]);
        Grid::find($id)->update(['isActive'=>1]);
    }

    public function addGridProducts($id)
    {
        Grid::query()->update(['isActive'=>0]);
        Grid::find($id)->update(['isActive'=>1]);
    }
}
