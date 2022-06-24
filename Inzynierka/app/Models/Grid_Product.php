<?php

namespace App\Models;

use App\Product;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grid_Product extends Model
{
    use HasFactory;

    protected $table = 'grid_product';

    public function product()
    {
        return $this->belongsTo(Product::class);
    }
}

