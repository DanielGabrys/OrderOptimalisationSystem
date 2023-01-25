<?php

namespace App\Imports;

use App\Models\Grid;
use App\Models\Order;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class OrdersImport implements ToModel, WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {
        $grid =  Grid::where('isActive',1)->value("id");

        return new Order([
            'id' => $row['id'],
            'primary' => $row['primary'],
            'grid_id' => $grid
        ]);
    }
}
