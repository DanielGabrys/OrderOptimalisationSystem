<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Grid extends Model
{
    use HasFactory;

    protected $table = 'grid';

    public function product()
    {
        return $this->belongsToMany(Product::class);
    }
}
