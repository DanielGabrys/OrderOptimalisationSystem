<?php

namespace App\Imports;

use App\Models\OrderProducts;
use Maatwebsite\Excel\Concerns\ToModel;
use Maatwebsite\Excel\Concerns\WithHeadingRow;

class OrdersProductsImport implements ToModel,WithHeadingRow
{
    /**
    * @param array $row
    *
    * @return \Illuminate\Database\Eloquent\Model|null
    */
    public function model(array $row)
    {

        return new OrderProducts([
            'order_id' => $row['order_id'],
            'product_id' => $row['product_id'],
            'amount' => $row['amount'],
        ]);
    }
}
