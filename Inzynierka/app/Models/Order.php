<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;


    protected $table = 'order';

    protected $fillable = [
        'id',
        'primary',
        'grid_id'

    ];

    public function products()
    {
        return $this->belongsToMany(Product::class)->withPivot('amount');
    }

    public function orderProducts()
    {
        return $this->hasMany(OrderProducts::class);
    }





}
