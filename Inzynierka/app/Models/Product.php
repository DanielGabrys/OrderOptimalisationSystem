<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';


    public function gridProduct()
    {
       return $this->belongsTo(Grid_Product::class,'id');
    }

}
