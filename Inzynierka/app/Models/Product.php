<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $table = 'products';


    public function grids()
    {
       return $this->belongsToMany(Grid::class)->withPivot('position','id','desired_position');
    }

    public function orders()
    {
        return $this->belongsToMany(Order::class)->withPivot('amount');
    }

}
